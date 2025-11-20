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
import { localCustom } from "@/admin/helpers";
import { format } from "date-fns";
import signatureImage from "../assets/firma-secundaria.jpg";
import checkImage from "../assets/check.png";

export const getSecundariaCert = async (
  aspirant = "",
  lecturaScore = 0,
  matematicasScore = 0,
  pensamientoScore = 0,
  totalScore = 0,
  isMale = true,
  date = "",
  examIs = ""
) => {
  const response = await fetch(signatureImage);
  const checkResponse = await fetch(checkImage);
  if (!response.ok) throw new Error("No se pudo cargar la imagen");

  const signatureBuffer = await response.arrayBuffer(); // ✅ directamente del respons
  const checkBuffer = await checkResponse.arrayBuffer();

  const CongratsFile = {
    properties: {
      verticalAlign: "center",
    },
    children: [
      // ? Saludo inicial
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: `${isMale ? "Estimado" : "Estimada"} `,
          }),
          new TextRun({
            text: `${aspirant.toUpperCase()}`,
            bold: true,
          }),
        ],
      }),
      // ? Primer párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el ",
          }),
          new TextRun({
            text: format(date, "dd 'de' MMMM 'del' y", {
              locale: localCustom,
            }),
            bold: true,
          }),
          new TextRun({
            text: " es ",
          }),
          new TextRun({
            text: examIs,
            bold: true,
          }),
          new TextRun({
            text: `, lo cual te hace ${
              isMale ? "candidato" : "candidata"
            } a ser parte de la `,
          }),
          new TextRun({
            text: "Secundaria Anáhuac. ",
            bold: true,
          }),
          new TextRun({
            text: "Estamos conscientes que las habilidades que demostraste son producto de tu esfuerzo y la dedicación de tus padres.",
          }),
        ],
      }),
      // ? Segundo párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "Estás por concluir la ",
          }),
          new TextRun({
            text: "Primaria",
            bold: true,
          }),
          new TextRun({
            text: ", una etapa de muchos aprendizajes y logros que te permitirán iniciar la ",
          }),
          new TextRun({
            text: "Secundaria",
            bold: true,
          }),
          new TextRun({
            text: ", un periodo de gran trascendencia para tu futuro personal y profesional.",
          }),
        ],
      }),
      // ? Tercer párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "En ",
          }),
          new TextRun({
            text: "Secundaria Anáhuac",
            bold: true,
          }),
          new TextRun({
            text: ", estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
          }),
        ],
      }),
      // ? Despedida
      new Paragraph({
        text: "¡Nos vemos pronto!",
      }),
      new Paragraph({
        spacing: { before: 400 },
        alignment: "center",
        text: `Colima, Col. a ${format(new Date(), "dd 'de' MMMM 'de' y", {
          locale: localCustom,
        })}`,
      }),
      new Paragraph({
        alignment: "center",
        text: "Atentamente",
      }),
      // ? Firma
      new Paragraph({
        alignment: "center",
        spacing: { before: 200, after: 200 },
        children: [
          new ImageRun({
            data: signatureBuffer,
            transformation: {
              width: 250,
              height: 89,
            },
          }), // Placeholder for signature image
        ],
      }),
      new Paragraph({
        alignment: "center",
        text: "Rosalba Rodríguez Barragán",
      }),
      new Paragraph({
        alignment: "center",
        text: "Directora Académica",
      }),
    ],
  };

  const NormalFile = {
    properties: {
      verticalAlign: "center",
    },
    children: [
      // ? Saludo inicial
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: `${isMale ? "Estimado" : "Estimada"} `,
          }),
          new TextRun({
            text: `${aspirant.toUpperCase()}`,
            bold: true,
          }),
        ],
      }),
      // ? Primer párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el ",
          }),
          new TextRun({
            text: format(date, "dd 'de' MMMM 'del' y", {
              locale: localCustom,
            }),
            bold: true,
          }),
          new TextRun({
            text: " es ",
          }),
          new TextRun({
            text: examIs,
            bold: true,
          }),
          new TextRun({
            text: "; sin embargo, estamos conscientes que las habilidades que demostraste, las cuales son producto de tu esfuerzo, y en el periodo que falta para concluir tu primaria, puedes ",
          }),
          new TextRun({
            text: "fortalecer y consolidar los aprendizajes que necesitas ",
            bold: true,
          }),
          new TextRun({
            text: "para ser ",
          }),
          new TextRun({
            text: `${isMale ? "candidato" : "candidata"}`,
            bold: true,
          }),
          new TextRun({
            text: " a ser parte de la ",
          }),
          new TextRun({
            text: "Secundaria Anáhuac. ",
            bold: true,
          }),
        ],
      }),
      // ? Segundo párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "Estás por concluir la ",
          }),
          new TextRun({
            text: "Primaria",
            bold: true,
          }),
          new TextRun({
            text: ", una etapa de muchos aprendizajes y logros, no obstante, antes de pasar al siguiente nivel educativo, requieres comprometerte a reforzar algunas áreas, lo que facilitará tu adaptación a la ",
          }),
          new TextRun({
            text: "Secundaria",
            bold: true,
          }),
        ],
      }),
      // ? Tercer párrafo
      new Paragraph({
        spacing: paragraphSpacing,
        children: [
          new TextRun({
            text: "En ",
          }),
          new TextRun({
            text: "Secundaria Anáhuac",
            bold: true,
          }),
          new TextRun({
            text: ", estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
          }),
        ],
      }),
      // ? Despedida
      new Paragraph({
        text: "¡Nos vemos pronto!",
      }),
      new Paragraph({
        spacing: { before: 400 },
        alignment: "center",
        text: `Colima, Col. a ${format(new Date(), "dd 'de' MMMM 'de' y", {
          locale: localCustom,
        })}`,
      }),
      new Paragraph({
        alignment: "center",
        text: "Atentamente",
      }),
      // ? Firma
      new Paragraph({
        alignment: "center",
        spacing: { before: 200, after: 200 },
        children: [
          new ImageRun({
            data: signatureBuffer,
            transformation: {
              width: 250,
              height: 89,
            },
          }), // Placeholder for signature image
        ],
      }),
      new Paragraph({
        alignment: "center",
        text: "Rosalba Rodríguez Barragán",
      }),
      new Paragraph({
        alignment: "center",
        text: "Directora Académica",
      }),
    ],
  };

  const sections = [];

  if (totalScore >= 780) {
    sections.push(CongratsFile);
  } else {
    sections.push(NormalFile);
  }

  if (totalScore >= 650) {
    sections.push({
      properties: {},
      children: [
        new Paragraph({
          alignment: "center",
          children: [
            new TextRun({
              text: "RESULTADOS DEL EXAMEN DE ADMISIÓN",

              bold: true,
            }),
          ],
          spacing: { after: 400, before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Nombre ${isMale ? "del alumno" : "de la alumna"}: `,
            }),
            new TextRun({
              text: aspirant,
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "Fecha de aplicación: ",
            }),
            new TextRun({
              text: format(date, "dd 'de' MMMM 'del' y", {
                locale: localCustom,
              }),
              bold: true,
            }),
          ],
        }),
        new Table({
          width: {
            size: 100,
            type: "pct",
          },
          layout: "fixed",
          borders: {
            top: { size: 0, color: "FFFFFF" },
            bottom: { style: "single", size: 5, color: "#E4E4E7" },
            left: { size: 0, color: "FFFFFF" },
            right: { size: 0, color: "FFFFFF" },
            insideHorizontal: {
              style: "single",
              size: 5,
              color: "#E4E4E7",
            },
            insideVertical: { size: 0, color: "FFFFFF" },
          },
          rows: [
            // ? Encabezado
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Comprensión lectora",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "y escritura",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Habilidades",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "lógico-matemáticas",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Habilidades del",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "pensamiento",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Total",
                          color: "#71717A",
                          size: 25,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // ? Resultados
            new TableRow({
              children: [
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${lecturaScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${matematicasScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${pensamientoScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${totalScore || 0}`,
                          color: "#103CCA",
                          size: 25,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 400, before: 400 },
          children: [
            new TextRun({
              text: "Ya llevas 2 de los 3 pasos para ser parte de la ",
            }),
            new TextRun({
              text: "Secundaria Anáhuac:",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Examen de admisión ",
            }),
            new ImageRun({
              data: checkBuffer,
              transformation: {
                width: 10,
                height: 10,
              },
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Entrega de resultados ",
            }),
            new ImageRun({
              data: checkBuffer,
              transformation: {
                width: 10,
                height: 10,
              },
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 400 },
          text: "Inscripción (previa cita)",
        }),
        new Paragraph({
          text: "Para la inscripción necesitamos:",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Llenado de ficha de inscripción.",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Recoger fichas del banco y realizar el pago",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Entregar documentación (original y dos copias):",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Certificado de Primaria.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Carta de buena conducta (no aplica para Colegio Anáhuac).",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Acta de nacimiento.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "CURP.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "4 fotografías tamaño infantil.",
        }),
        new Paragraph({
          text: "Posteriormente se realizará el Examen de Ubicación de Idiomas y la Sesión de Inducción.",
        }),
      ],
    });
  } else {
    // ! Certificado de pre-admisión para usuarios reprobados de secundaria
    sections.push({
      properties: {},
      children: [
        new Paragraph({
          alignment: "center",
          children: [
            new TextRun({
              text: "RESULTADOS DEL EXAMEN DE ADMISIÓN",

              bold: true,
            }),
          ],
          spacing: { after: 400, before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Nombre ${isMale ? "del alumno" : "de la alumna"}: `,
            }),
            new TextRun({
              text: aspirant,
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "Fecha de aplicación: ",
            }),
            new TextRun({
              text: format(date, "dd 'de' MMMM 'del' y", {
                locale: localCustom,
              }),
              bold: true,
            }),
          ],
        }),
        new Table({
          width: {
            size: 100,
            type: "pct",
          },
          layout: "fixed",
          borders: {
            top: { size: 0, color: "FFFFFF" },
            bottom: { style: "single", size: 5, color: "#E4E4E7" },
            left: { size: 0, color: "FFFFFF" },
            right: { size: 0, color: "FFFFFF" },
            insideHorizontal: {
              style: "single",
              size: 5,
              color: "#E4E4E7",
            },
            insideVertical: { size: 0, color: "FFFFFF" },
          },
          rows: [
            // ? Encabezado
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Comprensión lectora",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "y escritura",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Habilidades",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "lógico-matemáticas",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Habilidades del",
                          color: "#71717A",
                        }),
                        new TextRun({
                          text: "pensamiento",
                          color: "#71717A",
                          break: 1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: "Total",
                          color: "#71717A",
                          size: 25,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // ? Resultados
            new TableRow({
              children: [
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${lecturaScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${matematicasScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${pensamientoScore || 0}`,
                          color: "#103CCA",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      spacing: { after: 50, before: 50 },
                      alignment: "center",
                      children: [
                        new TextRun({
                          text: `${totalScore || 0}`,
                          color: "#103CCA",
                          size: 25,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 400, before: 400 },
          children: [
            new TextRun({
              text: "Ya llevas 2 de los 5 pasos para ser parte de la ",
            }),
            new TextRun({
              text: "Secundaria Anáhuac:",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Examen de admisión ",
            }),
            new ImageRun({
              data: checkBuffer,
              transformation: {
                width: 10,
                height: 10,
              },
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Entrega de resultados ",
            }),
            new ImageRun({
              data: checkBuffer,
              transformation: {
                width: 10,
                height: 10,
              },
            }),
          ],
        }),
        new Paragraph({
          text: "Entrevista con el Departamento Psicopedagógico (previa cita)",
        }),
        new Paragraph({
          text: "Plan de trabajo",
        }),
        new Paragraph({
          spacing: { after: 400 },
          text: "Inscripción (previa cita)",
        }),
        new Paragraph({
          text: "Para la inscripción necesitamos:",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Llenado de ficha de inscripción.",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Recoger fichas del banco y realizar el pago",
        }),
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: "Entregar documentación (original y dos copias):",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Certificado de Primaria.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Carta de buena conducta (no aplica para Colegio Anáhuac).",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "Acta de nacimiento.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "CURP.",
        }),
        new Paragraph({
          bullet: {
            level: 1,
          },
          text: "4 fotografías tamaño infantil.",
        }),
        new Paragraph({
          text: "Posteriormente se realizará el Examen de Ubicación de Idiomas y la Sesión de Inducción.",
        }),
      ],
    });
  }

  return new Document({
    styles: baseStyles,
    sections,
  });
};
