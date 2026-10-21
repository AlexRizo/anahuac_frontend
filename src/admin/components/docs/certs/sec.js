import {
  Document,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { baseStyles, paragraphSpacing } from "../styles/doc.styles";
import { longDate } from "@/admin/helpers";
import {
  getSecundariaPlan,
  parseMarkup,
} from "@/helpers/secundariaLetters";
import signatureImage from "../assets/firma-secundaria.jpg";
import checkImage from "../assets/check.png";

const runs = (text, values) =>
  parseMarkup(text, values).map(
    ({ text, bold }) => new TextRun({ text, bold })
  );

const centered = (text) => new Paragraph({ alignment: "center", text });

const tableBorders = {
  top: { size: 0, color: "FFFFFF" },
  bottom: { style: "single", size: 5, color: "#E4E4E7" },
  left: { size: 0, color: "FFFFFF" },
  right: { size: 0, color: "FFFFFF" },
  insideHorizontal: { style: "single", size: 5, color: "#E4E4E7" },
  insideVertical: { size: 0, color: "FFFFFF" },
};

const headerCell = (lines, extra = {}) =>
  new TableCell({
    children: [
      new Paragraph({
        spacing: { after: 50, before: 50 },
        alignment: "center",
        children: lines.map(
          (text, i) =>
            new TextRun({
              text,
              color: "#71717A",
              break: i ? 1 : undefined,
              ...extra,
            })
        ),
      }),
    ],
  });

const valueCell = (value, extra = {}) =>
  new TableCell({
    verticalAlign: "center",
    children: [
      new Paragraph({
        spacing: { after: 50, before: 50 },
        alignment: "center",
        children: [
          new TextRun({
            text: `${value || 0}`,
            color: "#103CCA",
            bold: true,
            ...extra,
          }),
        ],
      }),
    ],
  });

const scoresTable = ({ lecturaScore, matematicasScore, pensamientoScore, totalScore }) =>
  new Table({
    width: { size: 100, type: "pct" },
    layout: "fixed",
    borders: tableBorders,
    rows: [
      new TableRow({
        children: [
          headerCell(["Comprensión lectora", "y escritura"]),
          headerCell(["Habilidades", "lógico-matemáticas"]),
          headerCell(["Habilidades del", "pensamiento"]),
          headerCell(["Total"], { size: 25, bold: true }),
        ],
      }),
      new TableRow({
        children: [
          valueCell(lecturaScore),
          valueCell(matematicasScore),
          valueCell(pensamientoScore),
          valueCell(totalScore, { size: 25 }),
        ],
      }),
    ],
  });

const letterSection = ({ plan, aspirant, isMale, date, examIs, signatureBuffer }) => {
  const values = {
    fecha: longDate(date),
    resultado: examIs,
    candidato: isMale ? "candidato" : "candidata",
  };

  return {
    properties: { verticalAlign: "center" },
    children: [
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({ text: `${isMale ? "Estimado" : "Estimada"} ` }),
          new TextRun({ text: aspirant.toUpperCase(), bold: true }),
        ],
      }),
      ...plan.letter.map(
        (text) =>
          new Paragraph({ spacing: paragraphSpacing, children: runs(text, values) })
      ),
      new Paragraph({
        spacing: { before: 400 },
        alignment: "center",
        text: `Colima, Col. a ${longDate(new Date())}`,
      }),
      centered("Atentamente"),
      new Paragraph({
        alignment: "center",
        spacing: { before: 200, after: 200 },
        children: [
          new ImageRun({
            data: signatureBuffer,
            transformation: { width: 250, height: 89 },
          }),
        ],
      }),
      centered("Rosalba Rodríguez Barragán"),
      centered("Directora Académica"),
    ],
  };
};

const resultsSection = ({ plan, aspirant, isMale, date, scores, checkBuffer }) => {
  const check = () =>
    new ImageRun({ data: checkBuffer, transformation: { width: 10, height: 10 } });

  const header = [
    new Paragraph({
      alignment: "center",
      children: [new TextRun({ text: "RESULTADOS DEL EXAMEN DE ADMISIÓN", bold: true })],
      spacing: { after: 400, before: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `Nombre ${isMale ? "del alumno" : "de la alumna"}: ` }),
        new TextRun({ text: aspirant, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { after: 400 },
      children: [
        new TextRun({ text: "Fecha de aplicación: " }),
        new TextRun({ text: longDate(date), bold: true }),
      ],
    }),
    scoresTable(scores),
  ];

  // ? Con menos de 500 no hay pasos de admisión: solo la hoja de resultados
  if (!plan.steps) return { properties: {}, children: header };

  const { steps } = plan;
  return {
    properties: {},
    children: [
      ...header,
      new Paragraph({
        spacing: { after: 400, before: 400 },
        children: [
          new TextRun({ text: `Ya llevas 2 de los ${steps.total} pasos para ser parte de la ` }),
          new TextRun({ text: "Secundaria Anáhuac:", bold: true }),
        ],
      }),
      new Paragraph({ children: [new TextRun({ text: "Examen de admisión " }), check()] }),
      new Paragraph({ children: [new TextRun({ text: "Entrega de resultados " }), check()] }),
      ...steps.pending.map((text) => new Paragraph({ text })),
      new Paragraph({
        spacing: { after: 400 },
        text: "Inscripción (previa cita en control escolar)",
      }),
      new Paragraph({ text: "Para la inscripción necesitamos:" }),
      new Paragraph({ bullet: { level: 0 }, text: "Llenado de ficha de inscripción." }),
      new Paragraph({
        bullet: { level: 0 },
        text: "Recoger fichas del banco y realizar el pago.",
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: "Entregar documentación (dos copias):",
      }),
      ...steps.enrollmentDocuments.map(
        (text) => new Paragraph({ bullet: { level: 1 }, text })
      ),
      new Paragraph({ spacing: { before: 200 }, text: steps.closing }),
    ],
  };
};

export const getSecundariaCert = async ({
  aspirant = "",
  lecturaScore = 0,
  matematicasScore = 0,
  pensamientoScore = 0,
  totalScore = 0,
  grade,
  isMale = true,
  date = "",
  examIs = "",
}) => {
  // ! Lanza MissingGradeError si hace falta el grado y no existe; antes de cargar imágenes
  const plan = getSecundariaPlan({ totalScore, grade });

  const response = await fetch(signatureImage);
  const checkResponse = await fetch(checkImage);
  if (!response.ok || !checkResponse.ok)
    throw new Error("No se pudo cargar la imagen");

  const signatureBuffer = await response.arrayBuffer();
  const checkBuffer = await checkResponse.arrayBuffer();

  const sections = [];

  if (plan.letter) {
    sections.push(
      letterSection({ plan, aspirant, isMale, date, examIs, signatureBuffer })
    );
  }

  sections.push(
    resultsSection({
      plan,
      aspirant,
      isMale,
      date,
      checkBuffer,
      scores: { lecturaScore, matematicasScore, pensamientoScore, totalScore },
    })
  );

  return new Document({ styles: baseStyles, sections });
};
