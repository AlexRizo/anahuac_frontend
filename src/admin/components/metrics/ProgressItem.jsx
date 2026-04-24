import { Progress } from "@/components/ui";
import PropTypes from "prop-types";

export const ProgressItem = ({
  block,
  reactives,
  percentage,
  interns,
  externs,
}) => {
  return (
    <article className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="leading-none">
          <h2 className="font-medium text-lg">{block}</h2>
          <p className="text-sm text-muted-foreground">{reactives} reactivos</p>
        </div>
        <span className="px-2 py-0.5 bg-gray-100 rounded-md text-lg font-medium">
          {percentage}%
        </span>
      </div>
      <Progress
        value={percentage}
        className="h-2 mt-2"
        indicatorColor="bg-orange-600"
      />
      <div className="flex flex-row gap-4 mt-2">
        <p className="text-sm flex items-center">
          <span className="inline-flex size-4 rounded-full bg-orange-500 mr-1.5"></span>
          Internos: {interns}%
        </p>
        <p className="text-sm flex items-center">
          <span className="inline-flex size-4 rounded-full bg-blue-500 mr-1.5"></span>
          Externos: {externs}%
        </p>
      </div>
    </article>
  );
};

ProgressItem.propTypes = {
  block: PropTypes.string,
  reactives: PropTypes.number,
  percentage: PropTypes.number,
  interns: PropTypes.number,
  externs: PropTypes.number,
};
