import { Anahuac } from "@/auth/components";
import { Button, Label } from "@/components/ui";
import { useExamStore } from "@/hooks";
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  LoaderCircle,
  Save,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ActualProgress,
  Answers,
  BlockProgress,
  CustomAlertDialog,
  LoadingQuestionPage,
  MultipleSelectionAnswer,
} from "../components";
import { Navigate } from "react-router-dom";
import { LecturaAnticienciaPrepa } from "@/components/lecturas/LecturaAnticienciaPrepa";
import { LecturaProfesorPrepa } from "@/components/lecturas/LecturaProfesorPrepa";
import { LecturaPrincipePrepa } from "@/components/lecturas/LecturaPrincipePrepa";

export const LecturaPage = () => {
  const {
    questions,
    activeQuestion,
    total,
    isLoading,
    specials,
    totalResponded,
    exam_level,
    startSavingExam,
    startLoadingAllBlockQuestions,
    startLoadingActiveQuestion,
    startSaveLocalAnswer,
    answeredQuestions,
    startLoadingLocaleExam,
    startSavingExamAndNextLevel,
  } = useExamStore();

  const isLoadingData = useMemo(() => isLoading === "loading", [isLoading]);
  const articleQuestionId = useMemo(
    () => activeQuestion?.relation,
    [activeQuestion]
  );

  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([]);
  const [totalComplete, setTotalComplete] = useState(0);
  const [recentSaved, setRecentSaved] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  // Cargar todas las preguntas solo al montar el componente
  useEffect(() => {
    startLoadingAllBlockQuestions("lectura");
    startLoadingLocaleExam();
  }, []);

  // Establecer activeQuestion cuando las preguntas o el índice cambien
  useEffect(() => {
    if (questions.length > 0) {
      startLoadingActiveQuestion(questions[index]);
    }
  }, [questions, index]);

  // Establecer el artículo actual basado en articleQuestionId
  useEffect(() => {
    if (!activeQuestion || !specials.length) return;

    const article = specials.find(
      (article) => article.id === articleQuestionId
    );

    if (article.id !== currentArticle.id) {
      setCurrentArticle(article);
    }
  }, [activeQuestion, specials]);

  // Establecer la respuesta guardada en el estado local
  useEffect(() => {
    if (!activeQuestion) return;

    const savedResponse =
      answeredQuestions.find((answer) => answer.id === activeQuestion?.id)
        ?.response || [];

    if (savedResponse.length) {
      setResponse(savedResponse); // O simplemente setResponse(savedResponse) si es una letra
    } else {
      setResponse([]); // Asegúrate de limpiar la respuesta si no hay respuesta guardada
    }

    setTotalComplete(answeredQuestions.length);
  }, [activeQuestion, answeredQuestions]);

  // Guardar la respuesta en el estado local
  useEffect(() => {
    if (!activeQuestion) return;

    const isDifferent =
      answeredQuestions.find((answer) => answer.id === activeQuestion.id)
        ?.response !== response || null;
    if (activeQuestion.type === "multiple" && isDifferent) {
      if (response.length > 0) {
        // Solo ejecuta si response tiene elementos
        startSaveLocalAnswer({ id: activeQuestion.id, response });
      }
      return;
    }

    if (response.length && isDifferent) {
      startSaveLocalAnswer({ id: activeQuestion.id, response });
    }
  }, [response]);

  const handlePrev = () => {
    if (index > 0) {
      setResponse([]);
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setResponse([]);
      setIndex(index + 1);
    }
  };

  const handleSave = () => {
    setRecentSaved(true);
    startSavingExam("lectura");

    setTimeout(() => {
      setRecentSaved(false);
    }, 15000);
  };

  if (isLoadingData) {
    return <LoadingQuestionPage />;
  }

  if (exam_level !== 1) {
    return <Navigate to={"/examen/exap-matematicas"} />;
  }

  return (
    <main className="w-full grid min-h-dvh grid-rows-[auto_1fr_auto] py-5">
      <div className="flex">
        <div className="w-1/2 px-24 h-full flex flex-col">
          <div className="mb-12">
            <p className="text-sm font-semibold">Bloque:</p>
            <h1 className="text-2xl 2xl:text-3xl font-bold">
              Comprensión lectora y escritura
            </h1>
          </div>
          <div className="max-h-[400px] 2xl:max-h-[550px] overflow-y-scroll custom-scrollbar pr-5">
            {!currentArticle && (
              <div className="flex items-center gap-2 h-[400px] 2xl:h-[550px] justify-center fade-in-animation">
                <LoaderCircle
                  size={32}
                  strokeWidth={1.5}
                  className="animate-spin"
                />
                <p className="">Cargando artículo...</p>
              </div>
            )}

            {currentArticle && currentArticle.number === 1 ? (
              <LecturaProfesorPrepa />
            ) : currentArticle && currentArticle.number === 2 ? (
              <LecturaAnticienciaPrepa />
            ) : (
              <LecturaPrincipePrepa />
            )}
          </div>
        </div>
        <div className="w-1/2 px-12 2xl:px-24 flex flex-col">
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
          <div className="mt-14 2xl:mt-36">
            <p
              className="text-base 2xl:text-lg font-medium mb-2 2xl:mb-4 font-roboto-serif"
              dangerouslySetInnerHTML={{
                __html:
                  questions.indexOf(activeQuestion) +
                  1 +
                  ". " +
                  activeQuestion.question,
              }}
            ></p>
            {activeQuestion.type === "multiple" && (
              <>
                <br />
                <br />
                <span className="text-gray-700 font-bold font-roboto-serif">
                  Selecciona dos de los siguientes incisos:
                </span>
              </>
            )}
            <div>
              {activeQuestion.type === "multiple" ? (
                <MultipleSelectionAnswer
                  answers={activeQuestion.answers}
                  value={response}
                  onChange={setResponse}
                />
              ) : (
                <Answers
                  answers={activeQuestion.answers}
                  value={response}
                  onChange={setResponse}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-24 gap-28 mt-auto mb-20">
        <div className="my-auto flex gap-4 items-center w-1/2">
          <ActualProgress actual={index} block={currentArticle.id} />
        </div>
        <div className="flex items-center justify-center gap-4 my-auto w-1/2 mt-1">
          <Button
            variant="ghost"
            className="bg-gray-100 hover:bg-slate-50 gap-1"
            onClick={handlePrev}
            disabled={index === 0}
          >
            <ArrowLeft strokeWidth={1.5} />
            Anterior
          </Button>
          <Label>Reactivos de Lectura</Label>
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
