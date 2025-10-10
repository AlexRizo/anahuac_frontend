import { LecturaProfesorPrepa } from "./LecturaProfesorPrepa";
import { LecturaProfesorSecundaria } from "./LecturaProfesorSecundaria";

export const LecturaProfesor = ({ exam }) => {
  return exam === "PREPARATORIA" ? (
    <LecturaProfesorPrepa />
  ) : (
    <LecturaProfesorSecundaria />
  );
};
