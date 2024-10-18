import { es } from "date-fns/locale";

// Crear una copia del locale español
const localCustom = {
  ...es,
  localize: {
    ...es.localize,
    month: (n, options) => {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return months[n];
    },
    day: (n, options) => {
      const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
      return days[n];
    },
  },
};

export default localCustom;