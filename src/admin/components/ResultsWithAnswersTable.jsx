import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { evaluate } from "mathjs";

export const ResultsWithAnswersTable = ({
  children,
  aspirant,
  aspirantResults,
  isLoading = true,
}) => {
  const resolveMagicTriangle = (jsonString) => {
    const object = JSON.parse(jsonString);

    const { a1, a2, a3, b1, b2, b3, c1, c2, c3 } = Object.fromEntries(
      Object.entries(object).map(([key, value]) => [key, Number(value)])
    );

    let sumA, sumB, sumC;

    sumA = (a1 || 0) + (a2 || 0) + (a3 || 0) + (b1 || 0);
    sumB = (b1 || 0) + (b2 || 0) + (b3 || 0) + (c1 || 0);
    sumC = (c1 || 0) + (c2 || 0) + (c3 || 0) + (a1 || 0);

    return `${sumA}, ${sumB}, ${sumC}`; // ? A1 - B1 | B1 - C1 | C1 - A1
  };

  const resolveFourDigits = (array = [""]) => {
    array = [...array];

    if (array[array.length - 1] === "+") {
      array.pop();
    }

    const evaluation = evaluate(array.join(""));
    return evaluation;
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {isLoading || !aspirant || !aspirantResults ? (
            <>
              <SheetTitle>Loading...</SheetTitle>
              <SheetDescription></SheetDescription>
            </>
          ) : (
            <>
              <SheetTitle className="whitespace-pre-wrap break-words">
                <span className="font-normal">Resultados obtenidos por</span>
                <br />
              </SheetTitle>
              <SheetDescription className="text-base font-medium">
                {aspirant}
              </SheetDescription>
              <span className="grid grid-cols-2 mb-1">
                <span className="flex justify-evenly">
                  <span>Reactivo</span>
                  <span>Respuesta</span>
                </span>
                <span className="flex justify-evenly">
                  <span>Reactivo</span>
                  <span>Respuesta</span>
                </span>
              </span>
              <span className="h-[600px] 2xl:h-[800px] overflow-y-auto grid grid-cols-2 custom-scrollbar">
                {aspirantResults
                  .map((answer, index) => (
                    <span
                      key={index}
                      className="font-medium text-lg flex flex-row justify-evenly border"
                    >
                      <span>
                        <span className="">{answer.questionNumber}</span>
                      </span>
                      <span>
                        <span className="text-blue-600">
                          {answer.response.length === 2
                            ? answer.response.join(", ")
                            : answer.response[0].length > 1
                            ? resolveMagicTriangle(answer.response[0])
                            : answer.response.length > 2
                            ? resolveFourDigits(answer.response)
                            : answer.response[0]}
                        </span>
                      </span>
                    </span>
                  ))
                  .sort((a, b) => a.questionNumber - b.questionNumber)}
              </span>
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
