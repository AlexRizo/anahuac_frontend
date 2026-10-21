import { Button } from "@/components/ui";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { FileText } from "lucide-react";
import PropTypes from "prop-types";
import { getPrepaCert } from "./certs/prepa";
import { getSecundariaCert } from "./certs/sec";
import {
  getPrepaResult,
  getSecundariaResult,
  getTotalScore,
} from "@/helpers/admission";
import { MissingGradeError } from "@/helpers/secundariaLetters";
import { notifyMissingGrade } from "@/admin/helpers";

export const Docx = ({
  aspirant,
  lecturaScore,
  matematicasScore,
  pensamientoScore,
  level,
  grade,
  date,
  sex,
}) => {
  const printDoc = async () => {
    let doc;

    const isMale = sex === "MASCULINO";

    const totalScore = getTotalScore(
      lecturaScore,
      matematicasScore,
      pensamientoScore
    );

    try {
      if (level === "PREPARATORIA") {
        doc = await getPrepaCert(
          aspirant,
          lecturaScore,
          matematicasScore,
          pensamientoScore,
          totalScore,
          isMale,
          date,
          getPrepaResult(totalScore)
        );
      } else if (level === "SECUNDARIA") {
        doc = await getSecundariaCert({
          aspirant,
          lecturaScore,
          matematicasScore,
          pensamientoScore,
          totalScore,
          grade,
          isMale,
          date,
          examIs: getSecundariaResult(totalScore),
        });
      }
    } catch (error) {
      if (error instanceof MissingGradeError) {
        notifyMissingGrade();
        return;
      }
      throw error;
    }

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${aspirant.trim().replaceAll(" ", "_")}.docx`);
  };

  return (
    <Button variant="ghost" onClick={printDoc} size="icon">
      <FileText
        size={20}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="text-blue-700"
      />
    </Button>
  );
};

Docx.propTypes = {
  aspirant: PropTypes.string.isRequired,
  lecturaScore: PropTypes.number,
  matematicasScore: PropTypes.number,
  pensamientoScore: PropTypes.number,
  date: PropTypes.string,
  sex: PropTypes.oneOf(["MASCULINO", "FEMENINO"]),
  level: PropTypes.oneOf(["PREPARATORIA", "SECUNDARIA"]),
  grade: PropTypes.number,
};
