import PropTypes from "prop-types";

export const GapByOriginBlock = ({ block, gap }) => {
  return (
    <div className="flex justify-between py-1.5">
      <p className="text-sm text-muted-foreground">{block}</p>
      <p className="text-orange-600 font-medium">{gap}% Puntos</p>
    </div>
  );
};

GapByOriginBlock.propTypes = {
  block: PropTypes.string.isRequired,
  gap: PropTypes.number.isRequired,
};
