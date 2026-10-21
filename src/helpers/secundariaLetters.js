import { SECUNDARIA_CUTOFFS } from "./admission.js";

// ? Textos de las constancias de secundaria: 2 resultados (satisfactorio/sobresaliente y aún no satisfactorio) × 3 grados.
// Marcado: **negritas**; marcadores {resultado}, {fecha}, {candidato} (candidato/candidata).
// Fuente: nuevas-constancias/ (documento del colegio, 15/10). Cada párrafo es un párrafo real; sin saltos manuales.

export const LETTER_VARIANTS = {
  SATISFACTORIO: "satisfactorio",
  AUN_NO: "aunNo",
};

export class MissingGradeError extends Error {
  constructor() {
    super("El aspirante no tiene grado de secundaria registrado");
    this.name = "MissingGradeError";
  }
}

const LETTERS = {
  [LETTER_VARIANTS.SATISFACTORIO]: {
    1: [
      "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el **{fecha}** es **{resultado}**, lo cual te hace {candidato} a ser parte de la **Secundaria Anáhuac.** Estamos conscientes que las habilidades que demostraste son producto de tu esfuerzo y la dedicación de tus padres.",
      "Estás por concluir la **Primaria**, una etapa de muchos aprendizajes y logros que te permitirán iniciar la **Secundaria**, un periodo de gran trascendencia para tu futuro personal y profesional.",
      "En **Secundaria Anáhuac**, estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
      "¡Nos vemos pronto!",
    ],
    2: [
      "A través de estas líneas, queremos reconocer tu esfuerzo y felicitarte por el resultado **{resultado}** que obtuviste en el examen de admisión que presentaste el **{fecha}**. Este logro refleja tus conocimientos, habilidades y el compromiso que has demostrado en tu formación académica, así como el valioso acompañamiento de tu familia.",
      "Estás por comenzar una nueva etapa en tu trayectoria escolar, en la que tendrás la oportunidad de fortalecer lo que has aprendido, descubrir nuevas habilidades y enfrentar retos que contribuirán a tu crecimiento académico y personal. Segundo grado de secundaria será una oportunidad para continuar construyendo las bases que te permitirán alcanzar tus metas y desarrollar todo tu potencial.",
      "En **Secundaria Anáhuac**, nos entusiasma la posibilidad de darte la bienvenida a nuestra comunidad y queremos acompañarte en este camino, brindándote las herramientas y experiencias que te ayuden a ampliar tu visión del mundo, fortalecer tus valores y prepararte para aprovechar las oportunidades que se presenten en tu futuro. Estamos convencidos de que, trabajando juntos, lograremos que esta etapa esté llena de aprendizajes significativos, nuevas experiencias y grandes satisfacciones.",
      "**¡Te esperamos en Secundaria Anáhuac para seguir creciendo y aprendiendo juntos!**",
    ],
    3: [
      "A través de estas líneas, queremos reconocer tu esfuerzo y felicitarte por el resultado **{resultado}** que obtuviste en el examen de admisión que presentaste el **{fecha}**. Este resultado refleja tus conocimientos, capacidades y dedicación, cualidades que, junto con el apoyo de tu familia, te permitirán continuar avanzando hacia tus objetivos académicos y personales.",
      "Estás por comenzar una etapa especialmente significativa de tu formación: **tercer grado de secundaria**, un periodo de nuevos desafíos, decisiones importantes y preparación para los siguientes pasos de tu trayectoria educativa. Será una oportunidad para consolidar tus aprendizajes, fortalecer tus habilidades y reconocer el potencial que tienes para alcanzar grandes metas.",
      "En **Secundaria Anáhuac**, nos entusiasma la posibilidad de que formes parte de nuestra comunidad durante este año tan importante. Nuestro compromiso es acompañarte en este proceso, brindándote las herramientas necesarias para desarrollar tu autonomía, ampliar tu perspectiva del mundo y prepararte para continuar tu formación académica con confianza, responsabilidad y entusiasmo.",
      "Confiamos en que esta etapa te permitirá vivir experiencias enriquecedoras, superar nuevos retos y prepararte para iniciar con éxito el siguiente capítulo de tu vida escolar. Será un gusto acompañarte en este camino de crecimiento y aprendizaje.",
      "**¡Te esperamos en Secundaria Anáhuac para vivir juntos un año lleno de oportunidades y nuevos logros!**",
    ],
  },
  [LETTER_VARIANTS.AUN_NO]: {
    1: [
      "A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado en el examen de admisión que presentaste el **{fecha}** es **{resultado}**; sin embargo, estamos conscientes que las habilidades que demostraste, las cuales son producto de tu esfuerzo, y en el periodo que falta para concluir tu primaria, puedes **fortalecer y consolidar los aprendizajes que necesitas** para ser **{candidato}** a ser parte de la **Secundaria Anáhuac.**",
      "Estás por concluir la **Primaria**, una etapa de muchos aprendizajes y logros, no obstante, antes de pasar al siguiente nivel educativo, requieres comprometerte a reforzar algunas áreas, lo que facilitará tu adaptación a la **Secundaria**.",
      "En **Secundaria Anáhuac**, estamos muy contentos que formes parte de nuestra familia Anáhuac, trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán tener una mejor y más amplia visión del mundo que te rodea, además acceder a un futuro con mejores oportunidades.",
      "¡Nos vemos pronto!",
    ],
    2: [
      "A través de estas líneas, queremos reconocer tu esfuerzo y compartir contigo que el resultado obtenido en el examen de admisión que presentaste el **{fecha}** es **{resultado}**. Sin embargo, reconocemos tu dedicación y las habilidades que has demostrado durante este proceso. Estamos convencidos de que, con esfuerzo, constancia y el acompañamiento de tu familia, podrás fortalecer y consolidar los aprendizajes que necesitas para continuar avanzando en tu formación académica y tener la oportunidad de formar parte de **Secundaria Anáhuac**.",
      "Estás por continuar una etapa importante de tu trayectoria escolar. Para incorporarte a **segundo grado de secundaria**, es necesario que refuerces algunas áreas de aprendizaje que te permitirán afrontar con mayor seguridad los retos académicos de este nivel y favorecerán tu adaptación a nuestra comunidad educativa.",
      "En **Secundaria Anáhuac**, creemos en el potencial de cada estudiante y en la capacidad de superarse a través del compromiso y la perseverancia. Con el apoyo de tu familia y la disposición para seguir aprendiendo, podrás trabajar en las áreas de oportunidad identificadas y avanzar hacia tus metas académicas.",
      "Confiamos en que este resultado puede convertirse en una oportunidad para prepararte, crecer y demostrar todo lo que eres capaz de lograr.",
      "**¡Te animamos a seguir esforzándote para alcanzar tu meta de formar parte de la familia Anáhuac!**",
    ],
    3: [
      "A través de estas líneas, queremos reconocer tu esfuerzo y compartir contigo que el resultado obtenido en el examen de admisión que presentaste el **{fecha}** es **{resultado}**. No obstante, reconocemos la dedicación que has demostrado y consideramos que este resultado representa una oportunidad para identificar las áreas que necesitas fortalecer. Con esfuerzo, constancia y el acompañamiento de tu familia, podrás consolidar los aprendizajes necesarios para continuar con tu proceso de admisión a **Secundaria Anáhuac**.",
      "Estás por iniciar una etapa decisiva de tu formación académica: **tercer grado de secundaria**. Durante este período, será fundamental reforzar y consolidar los conocimientos y habilidades que te permitan responder a las exigencias académicas del grado, concluir satisfactoriamente tu educación secundaria y prepararte para continuar tus estudios de nivel medio superior.",
      "En **Secundaria Anáhuac**, valoramos el compromiso con el aprendizaje, la perseverancia y la disposición para superar nuevos desafíos. Por ello, te invitamos a asumir con responsabilidad este proceso de fortalecimiento académico, trabajando de manera conjunta con tu familia para atender las áreas de oportunidad identificadas y desarrollar las competencias que necesitas para alcanzar tus objetivos.",
      "Estamos convencidos de que cada reto representa una oportunidad para aprender y crecer. Con dedicación y compromiso, podrás avanzar en tu preparación y demostrar tu potencial.",
      "**¡Te invitamos a seguir trabajando con entusiasmo para alcanzar tu meta de formar parte de la familia Anáhuac!**",
    ],
  },
};

const REPORT_CARD = {
  1: "Boleta de calificaciones de 6º.",
  2: "Boleta de calificaciones de 1º.",
  3: "Boleta de calificaciones de 1º y 2º.",
};

const getEnrollmentDocuments = (grade) => [
  "Certificado de Primaria.",
  grade === 1
    ? "Carta de buena conducta (no aplica para Colegio Anáhuac)."
    : "Carta de buena conducta.",
  REPORT_CARD[grade],
  "Acta de nacimiento.",
  "CURP.",
  "4 fotografías tamaño infantil.",
  "INE de mamá o papá.",
];

const SHEET_STEPS = {
  [LETTER_VARIANTS.SATISFACTORIO]: { total: 3, pending: [] },
  [LETTER_VARIANTS.AUN_NO]: {
    total: 5,
    pending: [
      "Entrevista con el Departamento Psicopedagógico (previa cita)",
      "Plan de trabajo",
    ],
  },
};

export const getLetterVariant = (totalScore) => {
  if (totalScore >= SECUNDARIA_CUTOFFS.satisfactorio)
    return LETTER_VARIANTS.SATISFACTORIO;
  if (totalScore >= SECUNDARIA_CUTOFFS.aunNoSatisfactorio)
    return LETTER_VARIANTS.AUN_NO;
  return null;
};

const toGrade = (grade) => {
  const n = Number(grade);
  return n === 1 || n === 2 || n === 3 ? n : null;
};

// * Qué documentos salen: con < 500 solo la hoja de resultados (sin carta ni pasos); desde 500 hace falta el grado.
export const getSecundariaPlan = ({ totalScore, grade }) => {
  const variant = getLetterVariant(totalScore);
  if (!variant) return { variant: null, letter: null, steps: null };

  const g = toGrade(grade);
  if (!g) throw new MissingGradeError();

  return {
    variant,
    grade: g,
    letter: LETTERS[variant][g],
    steps: {
      ...SHEET_STEPS[variant],
      enrollmentDocuments: getEnrollmentDocuments(g),
      closing:
        "Posteriormente, se agendará fecha para la realización del Examen de Ubicación de Idiomas y la Sesión de Inducción.",
    },
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
