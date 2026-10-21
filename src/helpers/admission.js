// ? Umbrales de puntaje (suma de los 3 bloques) y nivel del resultado. Única fuente: Word, PDF y el ícono de admisión leen de aquí.

export const SECUNDARIA_CUTOFFS = {
  sobresaliente: 800,
  satisfactorio: 600,
  aunNoSatisfactorio: 500,
};

export const PREPARATORIA_CUTOFFS = {
  sobresaliente: 1000,
  muySatisfactorio: 780,
  satisfactorio: 650,
};

export const getTotalScore = (lectura, matematicas, pensamiento) =>
  (lectura || 0) + (matematicas || 0) + (pensamiento || 0);

export const getSecundariaResult = (totalScore) => {
  if (totalScore >= SECUNDARIA_CUTOFFS.sobresaliente) return "sobresaliente";
  if (totalScore >= SECUNDARIA_CUTOFFS.satisfactorio) return "satisfactorio";
  if (totalScore >= SECUNDARIA_CUTOFFS.aunNoSatisfactorio)
    return "aún no satisfactorio";
  return "insuficiente";
};

export const getPrepaResult = (totalScore) => {
  if (totalScore >= PREPARATORIA_CUTOFFS.sobresaliente) return "sobresaliente";
  if (totalScore >= PREPARATORIA_CUTOFFS.muySatisfactorio)
    return "muy satisfactorio";
  if (totalScore >= PREPARATORIA_CUTOFFS.satisfactorio) return "satisfactorio";
  return "aún no satisfactorio";
};

// ? Admisión directa: secundaria desde "aún no satisfactorio" (entra con plan de trabajo), preparatoria desde "satisfactorio".
export const isAdmitted = (level, totalScore) =>
  level === "PREPARATORIA"
    ? totalScore >= PREPARATORIA_CUTOFFS.satisfactorio
    : totalScore >= SECUNDARIA_CUTOFFS.aunNoSatisfactorio;
