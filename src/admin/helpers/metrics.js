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

// export const calculatePercentageByBlock = (results, totals) => {
//   const totalAlumnos = results.length;

//   // 1. Sumamos los aciertos de TODOS los alumnos
//   const aciertosLectura = results.reduce(
//     (acc, alumno) => acc + alumno.lectura,
//     0,
//   );
//   const aciertosMatematicas = results.reduce(
//     (acc, alumno) => acc + alumno.matematicas,
//     0,
//   );
//   const aciertosPensamiento = results.reduce(
//     (acc, alumno) => acc + alumno.pensamiento,
//     0,
//   );

//   // 2. Calculamos el porcentaje global real
//   const porcentajeGlobalLectura =
//     totalAlumnos > 0 && totals.lectura > 0
//       ? Number(
//           ((aciertosLectura / (totals.lectura * totalAlumnos)) * 100).toFixed(
//             2,
//           ),
//         )
//       : 0;

//   const porcentajeGlobalMatematicas =
//     totalAlumnos > 0 && totals.matematicas > 0
//       ? Number(
//           (
//             (aciertosMatematicas / (totals.matematicas * totalAlumnos)) *
//             100
//           ).toFixed(2),
//         )
//       : 0;

//   const porcentajeGlobalPensamiento =
//     totalAlumnos > 0 && totals.pensamiento > 0
//       ? Number(
//           (
//             (aciertosPensamiento / (totals.pensamiento * totalAlumnos)) *
//             100
//           ).toFixed(2),
//         )
//       : 0;

//   return {
//     blocks: {
//       lectura: porcentajeGlobalLectura,
//       matematicas: porcentajeGlobalMatematicas,
//       pensamiento: porcentajeGlobalPensamiento,
//     },
//   };
// };

export const calculatePercentageByBlock = (results, totals) => {
  const internos = results.filter(
    (a) =>
      a.origin?.toLowerCase().includes("anáhuac") ||
      a.origin?.toLowerCase().includes("anahuac"),
  );
  const externos = results.filter(
    (a) =>
      !a.origin?.toLowerCase().includes("anáhuac") &&
      !a.origin?.toLowerCase().includes("anahuac"),
  );

  const totalAlumnos = results.length;

  const desglosarBloque = (
    bloque = "LECTURA" | "MATEMATICAS" | "PENSAMIENTO",
  ) => {
    const totalPosibles = totals[bloque] * totalAlumnos;

    const aciertosInternos = internos.reduce(
      (acc, obj) => acc + obj[bloque],
      0,
    );
    const aciertosExternos = externos.reduce(
      (acc, obj) => acc + obj[bloque],
      0,
    );
    const aciertosTotales = aciertosInternos + aciertosExternos;

    return {
      // Porcentaje general de la prueba (ej. 65% del examen contestado correctamente)
      porcentajeGlobal:
        totalPosibles > 0
          ? Number(((aciertosTotales / totalPosibles) * 100).toFixed(2))
          : 0,

      // De ese 65%, quién aportó qué (la suma de estos dos dará 100%)
      distribucionInternos:
        aciertosTotales > 0
          ? Number(((aciertosInternos / aciertosTotales) * 100).toFixed(2))
          : 0,
      distribucionExternos:
        aciertosTotales > 0
          ? Number(((aciertosExternos / aciertosTotales) * 100).toFixed(2))
          : 0,
    };
  };

  return {
    lectura: desglosarBloque("lectura"),
    matematicas: desglosarBloque("matematicas"),
    pensamiento: desglosarBloque("pensamiento"),
  };
};
