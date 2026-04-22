import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropTypes from "prop-types";

export const SelectLevel = ({ level, setLevel }) => {
  return (
    <Tabs defaultValue={level} onValueChange={setLevel} className="w-[400px]">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="secundaria">
          Secundaria
        </TabsTrigger>
        <TabsTrigger className="w-full" value="preparatoria">
          Preparatoria
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

SelectLevel.propTypes = {
  level: PropTypes.string.isRequired,
  setLevel: PropTypes.func.isRequired,
};
