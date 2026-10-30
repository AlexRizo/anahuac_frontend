// ? Escuela de procedencia de los aspirantes de SECUNDARIA: lista cerrada + "OTRO" (con el nombre escrito).
// Los ids y nombres deben coincidir con anahuac_backend/helpers/schools.js (el servidor es quien clasifica).
// Todo lo que no sea Primaria Anáhuac es "externo": decide promedio mínimo, fechas y ruta de admisión de las hojas de resultados.

export const OTHER_SCHOOL = "OTRO";

export const ORIGIN_TYPES = { ANAHUAC: "ANAHUAC", EXTERNO: "EXTERNO" };

export const SCHOOL_OPTIONS = [
  { id: "PRIMARIA_ANAHUAC", name: "PRIMARIA ANÁHUAC", type: ORIGIN_TYPES.ANAHUAC },
  { id: "INSTITUTO_CULTURAL_COLIMA", name: "INSTITUTO CULTURAL DE COLIMA", type: ORIGIN_TYPES.EXTERNO },
  { id: "COLEGIO_ARBORE", name: "COLEGIO ARBORE", type: ORIGIN_TYPES.EXTERNO },
  { id: "COLEGIO_LICEO_LLANKAY", name: "COLEGIO LICEO LLANKAY", type: ORIGIN_TYPES.EXTERNO },
];

const normalize = (text = "") =>
  String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();

// * Clasificación de un aspirante. Los registrados desde la actualización traen `origin_type`;
// los anteriores no, y se clasifican como en las métricas: es interno si el nombre de su escuela contiene "anáhuac".
export const getOriginType = ({ origin_type, origin } = {}) => {
  if (origin_type === ORIGIN_TYPES.ANAHUAC || origin_type === ORIGIN_TYPES.EXTERNO) {
    return origin_type;
  }
  return normalize(origin).includes("anahuac")
    ? ORIGIN_TYPES.ANAHUAC
    : ORIGIN_TYPES.EXTERNO;
};

// ? Valores del formulario de edición a partir del aspirante guardado.
// Un aspirante anterior (texto libre) con "anáhuac" en el nombre se preselecciona como Primaria Anáhuac para no reclasificarlo al guardar.
export const getSchoolFormValues = (aspirant = {}) => {
  if (aspirant.app_origin !== "SECUNDARIA") {
    return { school_option: "", old_school: aspirant.origin || "" };
  }

  if (getOriginType(aspirant) === ORIGIN_TYPES.ANAHUAC) {
    return { school_option: "PRIMARIA_ANAHUAC", old_school: "" };
  }

  const match = SCHOOL_OPTIONS.find(
    ({ name }) => normalize(name) === normalize(aspirant.origin)
  );
  if (match) return { school_option: match.id, old_school: "" };

  return { school_option: OTHER_SCHOOL, old_school: aspirant.origin || "" };
};

// * Lo que se envía al servidor. Secundaria manda la opción elegida (y el nombre si es "OTRO"); preparatoria, solo el texto.
export const buildSchoolPayload = ({ school_option, old_school }, isSecundaria) => {
  if (!isSecundaria) return { old_school: old_school.trim() };

  if (school_option === OTHER_SCHOOL) {
    return { school_option, old_school: old_school.trim() };
  }

  const option = SCHOOL_OPTIONS.find(({ id }) => id === school_option);
  return { school_option, old_school: option?.name ?? "" };
};

// ? Reglas del formulario (zod superRefine): secundaria exige la lista y, con "OTRO", el nombre; preparatoria, el texto.
export const validateSchoolFields = (data, ctx, isSecundaria) => {
  if (isSecundaria) {
    if (!data.school_option) {
      ctx.addIssue({ code: "custom", path: ["school_option"], message: "* Selecciona tu escuela de procedencia." });
    } else if (data.school_option === OTHER_SCHOOL && !data.old_school?.trim()) {
      ctx.addIssue({ code: "custom", path: ["old_school"], message: "* Escribe el nombre de tu escuela de procedencia." });
    }
  } else if (!data.old_school?.trim()) {
    ctx.addIssue({ code: "custom", path: ["old_school"], message: "* Introduce tu escuela de procedencia." });
  }
};
