import { Card } from "@/components/ui";
import PropTypes from "prop-types";

export const GeneralEvaluationCard = ({
  title,
  description,
  percentage,
  icon: Icon,
  color = "black",
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold">{title}</h2>
        <Icon color={color} strokeWidth={1.5} />
      </div>
      <p className="text-2xl font-bold" style={{ color }}>
        {percentage}
      </p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};

GeneralEvaluationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
};
