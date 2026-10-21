import { toast } from "@/hooks/use-toast";

// ! Se muestra cuando una carta de secundaria necesita el grado y el aspirante no lo tiene
export const notifyMissingGrade = () =>
  toast({
    title: "Falta el grado del aspirante",
    description:
      "La carta depende del grado (1°, 2° o 3°) al que solicita ingreso. Captúralo en la edición del aspirante y vuelve a generar el documento.",
    variant: "destructive",
  });
