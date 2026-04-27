import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropTypes from "prop-types";

export const SelectLevel = ({ level, setLevel }) => {
  return (
    <Tabs defaultValue={level} onValueChange={setLevel} className="w-[400px]">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="6712e526aa2479c2a9e3d3b4">
          Secundaria
        </TabsTrigger>
        <TabsTrigger className="w-full" value="671949c4856bda078dd03686">
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
