import { format } from "date-fns";
import localCustom from "./localCustom";

// ? "12 de noviembre de 2025": mismo formato en las cartas Word y PDF
export const longDate = (date) =>
  format(date, "dd 'de' MMMM 'de' y", { locale: localCustom }).toLocaleLowerCase();
