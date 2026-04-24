export const calculateGeneralPercentage = (data, totals) => {
  if (!data || !totals) return 0;

  const totalQuestions =
    totals?.lectura + totals?.matematicas + totals?.pensamiento;

  const sumPercentages = data.reduce((acc, aspirant) => {
    const totalAciertos =
      aspirant.lectura + aspirant.matematicas + aspirant.pensamiento;
    const porcentajeAlumno = (totalAciertos / totalQuestions) * 100;
    return acc + porcentajeAlumno;
  }, 0);

  const averagePercentage = sumPercentages / data.length;

  return Number(averagePercentage.toFixed(2)) || 0;
};

export const calculatePercentageByBlock = (results, totals) => {
  if (!results || !totals || results.length === 0) return null;

  const internos = results.filter(
    (a) =>
      a.origin?.toLowerCase().includes("anahuac") ||
      a.origin?.toLowerCase().includes("anáhuac"),
  );
  const externos = results.filter(
    (a) =>
      !a.origin?.toLowerCase().includes("anahuac") &&
      !a.origin?.toLowerCase().includes("anáhuac"),
  );

  const totalAlumnos = results.length;

  // 1. Calculamos totales globales de la prueba completa
  const totalPreguntasExamen =
    totals.lectura + totals.matematicas + totals.pensamiento;
  const totalPosiblesExamen = totalPreguntasExamen * totalAlumnos;

  const aciertosInternosGlobal = internos.reduce(
    (acc, obj) => acc + obj.lectura + obj.matematicas + obj.pensamiento,
    0,
  );
  const aciertosExternosGlobal = externos.reduce(
    (acc, obj) => acc + obj.lectura + obj.matematicas + obj.pensamiento,
    0,
  );

  const aciertosTotalesExamen = aciertosInternosGlobal + aciertosExternosGlobal;

  // 2. Función para bloques individuales (reutilizando la lógica anterior)
  const desglosarBloque = (
    bloque = "LECTURA" | "MATEMATICAS" | "PENSAMIENTO",
  ) => {
    const totalPosibles = totals[bloque] * totalAlumnos;
    const internosBlock = internos.reduce((acc, obj) => acc + obj[bloque], 0);
    const externosBlock = externos.reduce((acc, obj) => acc + obj[bloque], 0);
    const totalesBlock = internosBlock + externosBlock;

    return {
      porcentajeGlobal:
        totalPosibles > 0
          ? Number(((totalesBlock / totalPosibles) * 100).toFixed(2))
          : 0,
      distribucionInternos:
        totalesBlock > 0
          ? Number(((internosBlock / totalesBlock) * 100).toFixed(2))
          : 0,
      distribucionExternos:
        totalesBlock > 0
          ? Number(((externosBlock / totalesBlock) * 100).toFixed(2))
          : 0,
    };
  };

  return {
    lectura: desglosarBloque("lectura"),
    matematicas: desglosarBloque("matematicas"),
    pensamiento: desglosarBloque("pensamiento"),
    // 3. El gran total de la brecha
    global: {
      porcentajeGlobalExamen:
        totalPosiblesExamen > 0
          ? Number(
              ((aciertosTotalesExamen / totalPosiblesExamen) * 100).toFixed(2),
            )
          : 0,
      distribucionInternos:
        aciertosTotalesExamen > 0
          ? Number(
              ((aciertosInternosGlobal / aciertosTotalesExamen) * 100).toFixed(
                2,
              ),
            )
          : 0,
      distribucionExternos:
        aciertosTotalesExamen > 0
          ? Number(
              ((aciertosExternosGlobal / aciertosTotalesExamen) * 100).toFixed(
                2,
              ),
            )
          : 0,
    },
  };
};

export const getGap = (results = [], totals = {}) => {
  const internos = results.filter(
    (a) =>
      a.origin?.toLowerCase().includes("anahuac") ||
      a.origin?.toLowerCase().includes("anáhuac"),
  );
  const externos = results.filter(
    (a) =>
      !a.origin?.toLowerCase().includes("anahuac") &&
      !a.origin?.toLowerCase().includes("anáhuac"),
  );

  const calcularDiferencia = (bloque) => {
    const totalPreguntas =
      bloque === "global"
        ? totals.lectura + totals.matematicas + totals.pensamiento
        : totals[bloque];

    if (totalPreguntas === 0) return 0;

    // Rendimiento Internos (Aciertos logrados / Aciertos posibles del grupo)
    const aciertosInt = internos.reduce(
      (acc, obj) =>
        acc +
        (bloque === "global"
          ? obj.lectura + obj.matematicas + obj.pensamiento
          : obj[bloque]),
      0,
    );
    const rendimientoInt =
      internos.length > 0
        ? (aciertosInt / (totalPreguntas * internos.length)) * 100
        : 0;

    // Rendimiento Externos
    const aciertosExt = externos.reduce(
      (acc, obj) =>
        acc +
        (bloque === "global"
          ? obj.lectura + obj.matematicas + obj.pensamiento
          : obj[bloque]),
      0,
    );
    const rendimientoExt =
      externos.length > 0
        ? (aciertosExt / (totalPreguntas * externos.length)) * 100
        : 0;

    // La diferencia en puntos porcentuales (Internos - Externos)
    const diff = rendimientoInt - rendimientoExt;
    return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
  };

  return {
    lectura: calcularDiferencia("lectura"),
    matematicas: calcularDiferencia("matematicas"),
    pensamiento: calcularDiferencia("pensamiento"),
    general: calcularDiferencia("global"),
  };
};
