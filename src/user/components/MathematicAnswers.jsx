import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { LoadingImage } from ".";

export const MathematicAnswers = ({
  answers,
  value,
  type,
  onChange,
  isLoadingImages,
  setIsLoadingImages,
}) => {
  const handleChange = (checkVal) => {
    return onChange([checkVal]);
  };

  return (
    <RadioGroup
      value={value[0] || null}
      onValueChange={handleChange}
      className={`${type === "single-image" && "grid grid-cols-2 grid-rows-2"}`}
    >
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`flex items-center relative gap-3 border ${
            value[0] === answer.opt
              ? "bg-teal-200/60 border-teal-400 text-black"
              : "border-transparent text-gray-600"
          } rounded-xl px-2.5 2xl:px-5 py-1.5 2xl:py-3 transition font-roboto-serif`}
        >
          <RadioGroupItem value={answer.opt} id={answer.opt} />
          <Label className="uppercase" htmlFor={answer.opt}>
            {answer.opt})
          </Label>
          {type === "single-image" ? (
            <>
              <img
                className="size-24 2xl:size-28 object-contain cursor-pointer"
                src={answer.answer}
                onClick={() => handleChange(answer.opt)}
                onLoad={() => setIsLoadingImages(index + 1)}
              />
              {isLoadingImages[index + 1] && (
                <LoadingImage className="size-[92px] 2xl:size-[112px] absolute left-[4.35rem]" />
              )}
            </>
          ) : (
            <label
              className="cursor-pointer text-base 2xl:text-lg"
              htmlFor={answer.opt}
            >
              {answer.answer}
            </label>
          )}
        </div>
      ))}
    </RadioGroup>
  );
};
