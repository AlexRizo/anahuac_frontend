import { SECUNDARIA_CUTOFFS, getSecundariaResult } from "./admission.js";
import { ORIGIN_TYPES } from "./schools.js";

// ? Textos de las constancias de secundaria (1º de secundaria): resultado (sobresaliente/satisfactorio, aún no satisfactorio,
// insuficiente) × procedencia (Anáhuac / externos). Ya no hay variantes por grado: el colegio confirmó que todos son de primer grado.
// Marcado: **negritas**; marcadores {resultado}, {fecha}, {candidato} (candidato/candidata).
// Fuente: nuevas-constancias/HOJAS de resultados EXHA_actualización 19_10.pdf y el correo del colegio (rutas de admisión).
// Cada párrafo es un párrafo real; sin saltos manuales.

// ! Datos de esta aplicación (ciclo 2027–2028). Cambian cada ciclo: se editan solo aquí.
export const ADMISSIONS_CYCLE = {
  minAverage: { [ORIGIN_TYPES.ANAHUAC]: "8", [ORIGIN_TYPES.EXTERNO]: "8.5" },
  enrollmentStart: {
    [ORIGIN_TYPES.ANAHUAC]: "lunes 30 de noviembre",
    [ORIGIN_TYPES.EXTERNO]: "lunes 07 de diciembre",
  },
  enrollmentDeadline: "18 de enero de 2027",
};

export const LETTER_VARIANTS = {
  SATISFACTORIO: "satisfactorio",
  AUN_NO: "aunNo",
};

const LETTERS = {
  [LETTER_VARIANTS.SATISFACTORIO]: [
    "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el **{fecha}** es **{resultado}**, lo cual te hace {candidato} a ser parte de la **Secundaria Anáhuac.** Estamos conscientes que las habilidades que demostraste son producto de tu esfuerzo y la dedicación de tus padres.",
    "Estás por concluir la **Primaria**, una etapa de muchos aprendizajes y logros que te permitirán iniciar la **Secundaria**, un periodo de gran trascendencia para tu futuro personal y profesional.",
    "En **Secundaria Anáhuac**, estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
    "¡Nos vemos pronto!",
  ],
  [LETTER_VARIANTS.AUN_NO]: [
    "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el **{fecha}** es **{resultado}**; sin embargo, estamos conscientes que las habilidades que demostraste, las cuales son producto de tu esfuerzo, y en el periodo que falta para concluir tu primaria, puedes **fortalecer y consolidar los aprendizajes que necesitas** para ser **{candidato}** a ser parte de la **Secundaria Anáhuac.**",
    "Estás por concluir la **Primaria**, una etapa de muchos aprendizajes y logros, no obstante, antes de pasar al siguiente nivel educativo, requieres comprometerte a reforzar algunas áreas, lo que facilitará tu adaptación a la **Secundaria**.",
    "En **Secundaria Anáhuac**, estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
    "¡Nos vemos pronto!",
  ],
};

// ? Insuficiente (menos de 500): sin carta ni pasos, solo la hoja de resultados con este texto formato.
// El PDF del colegio dice "Secundaria Anáhuac" en la serie de Anáhuac y "Secundaria Anáhuac Colima" en la de externos.
const getInsufficientText = (originType) => [
  `Agradecemos tu interés en formar parte de la comunidad educativa de Secundaria Anáhuac${
    originType === ORIGIN_TYPES.EXTERNO ? " Colima" : ""
  }. Después de evaluar los resultados obtenidos en el examen de admisión, identificamos que, por el momento, el nivel de dominio de los aprendizajes y habilidades evaluados no cumple con los requisitos académicos establecidos para ingresar a nuestra institución.`,
  "Reconocemos el esfuerzo realizado durante este proceso y te invitamos a continuar fortaleciendo tus conocimientos y habilidades académicas, con la finalidad de favorecer tu desarrollo y desempeño escolar futuro.",
];

const getEnrollmentDocuments = (average) => [
  "Certificado de Primaria.",
  `Boleta de calificaciones oficial de 6º. **Promedio mínimo de ${average}**.`,
  "Acta de nacimiento.",
  "CURP.",
  "4 fotografías tamaño infantil.",
  "INE de mamá o papá.",
];

const ENROLLMENT_REQUIREMENTS = [
  "Llenado de ficha de inscripción y firma de contrato.",
  "Recoger fichas del banco y realizar el pago.",
];

const CLOSING =
  "Posteriormente, se agendará fecha para la realización del Examen de Ubicación de Idiomas y la Sesión de Inducción.";

// * Rutas de admisión (correo del colegio, 19/10):
// - Sobresaliente y satisfactorio, Anáhuac y externos: 3 pasos (solicitud de inscripción con la boleta del primer trimestre).
// - Aún no satisfactorio: 5 pasos (Anáhuac) o 6 pasos (externos, con plan de trabajo como paso aparte).
// Los dos primeros pasos (examen y entrega de resultados) siempre van cumplidos.
const getSteps = (variant, originType) => {
  const average = ADMISSIONS_CYCLE.minAverage[originType];
  const done = ["Examen de admisión", "Entrega de resultados"];
  const common = {
    enrollmentRequirements: ENROLLMENT_REQUIREMENTS,
    enrollmentDocuments: getEnrollmentDocuments(average),
    closing: CLOSING,
  };

  if (variant === LETTER_VARIANTS.SATISFACTORIO) {
    return {
      ...common,
      total: 3,
      numbered: false,
      done,
      pending: [
        `Solicitud de inscripción: entrega de boleta oficial de calificaciones del Trim. I de 6°, promedio mínimo de ${average} (previa cita en Admisiones)`,
      ],
      notice: `**Nota:** Las inscripciones inician el ${
        ADMISSIONS_CYCLE.enrollmentStart[originType]
      }. **La fecha límite de inscripción es el ${
        ADMISSIONS_CYCLE.enrollmentDeadline
      },** posterior a esta fecha no se garantiza un lugar.`,
    };
  }

  const interview = `Entrevista con el Departamento Psicopedagógico (previa cita) **y entrega de boleta oficial de calificaciones del trimestre I de 6°. Promedio mínimo de ${average}**`;

  return {
    ...common,
    numbered: true,
    done,
    notice: null,
    ...(originType === ORIGIN_TYPES.ANAHUAC
      ? {
          total: 5,
          pending: [
            interview,
            "Resolución de admisión",
            "Inscripción con plan de trabajo (previa cita en Admisiones)",
          ],
        }
      : {
          total: 6,
          pending: [
            interview,
            "Resolución de admisión",
            "Plan de trabajo",
            "Inscripción (previa cita en Admisiones)",
          ],
        }),
  };
};

export const getLetterVariant = (totalScore) => {
  if (totalScore >= SECUNDARIA_CUTOFFS.satisfactorio)
    return LETTER_VARIANTS.SATISFACTORIO;
  if (totalScore >= SECUNDARIA_CUTOFFS.aunNoSatisfactorio)
    return LETTER_VARIANTS.AUN_NO;
  return null;
};

// * Qué documentos salen según el puntaje y la procedencia ("ANAHUAC" o "EXTERNO", ver helpers/schools.js).
// Insuficiente (< 500): solo la hoja de resultados con `insufficientText`; sin carta, pasos ni nota.
export const getSecundariaPlan = ({ totalScore, originType }) => {
  if (
    originType !== ORIGIN_TYPES.ANAHUAC &&
    originType !== ORIGIN_TYPES.EXTERNO
  ) {
    throw new Error(`Procedencia no válida: ${originType}`);
  }

  const variant = getLetterVariant(totalScore);
  const result = getSecundariaResult(totalScore);

  if (!variant) {
    return {
      result,
      originType,
      variant: null,
      letter: null,
      steps: null,
      insufficientText: getInsufficientText(originType),
    };
  }

  return {
    result,
    originType,
    variant,
    letter: LETTERS[variant],
    steps: getSteps(variant, originType),
    insufficientText: null,
  };
};

// ? Convierte "texto **negrita** {marcador}" en [{ text, bold }] para armar TextRun.
export const parseMarkup = (text, values = {}) => {
  const filled = text.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? values[key] : match
  );
  return filled
    .split("**")
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((run) => run.text !== "");
};
