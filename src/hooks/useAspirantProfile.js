import { useCallback, useEffect, useState } from "react";
import anahuacApi from "@/api/api";

// ? Perfil del propio aspirante (plantel y grado al que solicita ingreso). Lo usa la pantalla de bienvenida.
export const useAspirantProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const { data } = await anahuacApi.get("/aspirants/me");
        if (active) setProfile(data.profile);
      } catch (e) {
        console.error(e);
        if (active) setError(e);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  // ? Guarda el grado elegido; lanza el error de la API si no se pudo (p. ej. grado ya fijo)
  const saveGrade = useCallback(async (grade) => {
    const { data } = await anahuacApi.put("/aspirants/me/grade", { grade });
    setProfile((current) => ({ ...current, grade: data.grade }));
  }, []);

  return { profile, isLoading, error, saveGrade };
};
