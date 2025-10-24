import { Button } from "@/components/ui";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { FileText } from "lucide-react";
import PropTypes from "prop-types";
import { getPrepaCert } from "./certs/prepa";

export const Docx = ({
  aspirant,
  lecturaScore,
  matematicasScore,
  pensamientoScore,
  level,
  date,
  sex,
}) => {
  const printDoc = async () => {
    let doc;

    const isMale = sex === "MASCULINO";

    const totalScore =
      (lecturaScore || 0) + (matematicasScore || 0) + (pensamientoScore || 0);

    let examIs = "";

    if (level === "PREPARATORIA") {
      examIs =
        totalScore >= 1000
          ? "sobresaliente"
          : totalScore <= 999 && totalScore >= 780
          ? "muy satisfactorio"
          : totalScore <= 779 && totalScore >= 650
          ? "satisfactorio"
          : "aún no satisfactorio";

      doc = await getPrepaCert(
        aspirant,
        lecturaScore,
        matematicasScore,
        pensamientoScore,
        totalScore,
        isMale,
        date,
        examIs
      );
    } else if (level === "SECUNDARIA") {
      alert("Certificado de secundaria no disponible aún");
      return;
    }

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${aspirant.trim().replace(" ", "_")}.docx`);
  };

  return (
    <Button variant="ghost" onClick={printDoc} size="icon">
      <FileText size={20} strokeWidth={1.5} absoluteStrokeWidth className="text-blue-700" />
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
};
