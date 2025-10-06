import { ArrowLeft, ArrowRight, CheckSquare, Save } from "lucide-react";
import {
  BlockProgress,
  CustomAlertDialog,
  LoadingImage,
  LoadingQuestionPage,
  MathematicAnswers,
} from "../components";
import { Button, Label } from "@/components/ui";
import { Anahuac } from "@/auth/components";
import { useExamStore } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

export const MatematicasPage = () => {
  const {
    activeQuestion,
    answeredQuestions,
    questions,
    total,
    totalResponded,
    isLoading,
    startLoadingActiveQuestion,
    startSavingExam,
    startSavingExamAndNextLevel,
    startSaveLocalAnswer,
    startLoadingAllBlockQuestions,
    startLoadingLocaleExam,
  } = useExamStore();

  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([]);
  const [totalComplete, setTotalComplete] = useState(0);
  const [recentSaved, setRecentSaved] = useState(false);

  const [isLoadingImages, setIsLoadingImages] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  const handleLoadImage = (index) => {
    setIsLoadingImages((prev) => {
      const newImages = [...prev];
      newImages[index] = false;
      return newImages;
    });
  };

  const isLoadingData = useMemo(() => isLoading === "loading", [isLoading]);

  useEffect(() => {
    startLoadingAllBlockQuestions("matematicas");
    startLoadingLocaleExam();
  }, []);

  useEffect(() => {
    if (isLoadingImages.some((image) => image === false)) {
      setIsLoadingImages([true, true, true, true, true]);
    }

    if (questions.length > 0) {
      startLoadingActiveQuestion(questions[index]);
    }
  }, [questions, index]);

  useEffect(() => {
    if (!activeQuestion) return;

    const savedResponse =
      answeredQuestions.find((answer) => answer.id === activeQuestion.id)
        ?.response || [];

    if (savedResponse.length) {
      setResponse(savedResponse);
    } else {
      setResponse([]);
    }

    setTotalComplete(answeredQuestions.length);
  }, [activeQuestion, answeredQuestions]);

  useEffect(() => {
    if (!activeQuestion) return;

    const isDifferent =
      answeredQuestions.find((answer) => answer.id === activeQuestion.id)
        ?.response !== response;

    if (isDifferent && response.length) {
      startSaveLocalAnswer({ id: activeQuestion.id, response });
    }
  }, [response]);

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSave = () => {
    setRecentSaved(true);
    startSavingExam("matematicas");

    setTimeout(() => {
      setRecentSaved(false);
    }, 15000);
  };

  if (isLoadingData) {
    return <LoadingQuestionPage />;
  }

  return (
    <main className="w-full grid min-h-dvh grid-rows-[auto_1fr_auto] py-5">
      <div className="flex flex-col items-center">
        <div className="px-24 h-full flex flex-col w-full">
          <div className="mb-12 flex justify-between w-full">
            <div>
              <p className="text-sm font-semibold">Bloque:</p>
              <h1 className="text-2xl 2xl:text-3xl font-bold">
                Habilidades Lógico - Matemáticas
              </h1>
            </div>
            <div className="flex items-center justify-end gap-4">
              <BlockProgress total={total} done={totalComplete} />
              <Button
                className="bg-blue-600 hover:bg-blue-700 gap-1"
                onClick={handleSave}
                disabled={recentSaved}
              >
                Guardar
                <Save strokeWidth={1.5} />
              </Button>

              <CustomAlertDialog
                title="Confirmar finalización del bloque"
                content={
                  <>
                    Antes de finalizar, asegúrate de haber respondido todas las
                    preguntas. <br />
                    <br />
                    Tu progreso se guardará y no podrás regresar.
                  </>
                }
                onConfirm={startSavingExamAndNextLevel}
              >
                <Button
                  className={`gap-1 ${
                    totalResponded === questions.length
                      ? "animated-border-button bg-green-700 hover:bg-green-800"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                  disabled={totalResponded !== questions.length}
                >
                  Terminar bloque
                  <CheckSquare strokeWidth={1.5} />
                </Button>
              </CustomAlertDialog>
            </div>
          </div>
        </div>
        <div className="w-full px-24 flex justify-evenly items-center">
          {activeQuestion.attachment && (
            <div className="pr-5 h-[400px] 2xl:h-[550px] flex items-center justify-center w-full relative">
              {isLoadingImages[0] && (
                <LoadingImage className="size-[400px] 2xl:size-[550px] absolute" />
              )}
              <img
                src={`${activeQuestion.attachment}`}
                className="w-[390px] 2xl:w-[540px]"
                onLoad={() => handleLoadImage(0)}
              />
            </div>
          )}
          <div
            className={`${
              activeQuestion.attachment ? "w-full" : "w-1/2 mt-10"
            }`}
          >
            <p
              className="text-base 2xl:text-lg font-medium mb-4 font-roboto-serif"
              dangerouslySetInnerHTML={{
                __html:
                  questions.indexOf(activeQuestion) +
                  1 +
                  ". " +
                  activeQuestion.question,
              }}
            ></p>
            <div>
              <MathematicAnswers
                answers={activeQuestion.answers}
                value={response}
                onChange={setResponse}
                type={activeQuestion.type}
                isLoadingImages={isLoadingImages}
                setIsLoadingImages={handleLoadImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-24 gap-28 mt-auto mb-20">
        <div className="flex items-center justify-center my-auto gap-4 w-full mt-1">
          <Button
            variant="ghost"
            className="bg-gray-100 hover:bg-slate-50 gap-1"
            onClick={handlePrev}
            disabled={index === 0}
          >
            <ArrowLeft strokeWidth={1.5} />
            Anterior
          </Button>
          <Label>Reactivos de Matemáticas</Label>
          <Button
            variant="ghost"
            className="bg-gray-100 hover:bg-slate-50 gap-1"
            onClick={handleNext}
            disabled={index === questions.length - 1}
          >
            Siguiente
            <ArrowRight strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-end px-8">
        <Anahuac fill="#2B3844" />
        <p className="text-gray-500">
          © 2025 Colegio Anáhuac Colima. Todos los derechos Reservados.
        </p>
      </div>
    </main>
  );
};
