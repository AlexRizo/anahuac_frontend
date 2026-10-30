import PropTypes from "prop-types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { OTHER_SCHOOL, SCHOOL_OPTIONS } from "@/helpers/schools";

// ? Campo "Escuela de procedencia" de los formularios de aspirante.
// Secundaria: lista cerrada y, solo con "Otro", un campo de texto obligatorio con el nombre. Preparatoria: texto libre como siempre.
export const SchoolOriginField = ({ control, errors, isSecundaria, schoolOption, messageClassName }) => {
  const showText = !isSecundaria || schoolOption === OTHER_SCHOOL;

  return (
    <>
      {isSecundaria && (
        <FormField
          control={control}
          name="school_option"
          render={({ field }) => (
            <FormItem data-testid="school-option">
              <FormLabel>Escuela de Procedencia</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="transition">
                    <SelectValue placeholder="Selecciona tu escuela de procedencia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SCHOOL_OPTIONS.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                  <SelectItem value={OTHER_SCHOOL}>OTRO</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className={messageClassName}>
                {errors.school_option && errors.school_option.message}
              </FormMessage>
            </FormItem>
          )}
        />
      )}
      {showText && (
        <FormField
          control={control}
          name="old_school"
          render={({ field }) => (
            <FormItem data-testid="school-name">
              <FormLabel>
                {isSecundaria ? "Nombre de la escuela" : "Escuela de Procedencia"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={isSecundaria ? "Escribe el nombre de tu escuela" : "Escuela de procedencia"}
                  {...field}
                  type="text"
                  className="transition"
                />
              </FormControl>
              <FormMessage className={messageClassName}>
                {errors.old_school && errors.old_school.message}
              </FormMessage>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

SchoolOriginField.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSecundaria: PropTypes.bool,
  schoolOption: PropTypes.string,
  messageClassName: PropTypes.string,
};
