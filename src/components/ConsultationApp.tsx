"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { NavigationButtons } from "@/components/layout/NavigationButtons";
import { LoadingScreen } from "@/components/screens/LoadingScreen";
import { PhotoUploadScreen } from "@/components/screens/PhotoUploadScreen";
import { QuestionnaireScreen } from "@/components/screens/QuestionnaireScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { questions } from "@/data/questions";
import { useLanguage } from "@/context/LanguageContext";
import { useConsultationFlow } from "@/hooks/useConsultationFlow";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function ConsultationApp() {
  const { language, t } = useLanguage();
  const flow = useConsultationFlow(language);

  const currentQuestion = questions[flow.questionIndex];
  const currentAnswer = currentQuestion
    ? flow.answers[currentQuestion.id]
    : null;

  const showNavFooter =
    flow.step === "questionnaire" || flow.step === "photo-upload";

  const handleBack = () => {
    if (flow.step === "questionnaire") {
      flow.goPrevious();
    } else if (flow.step === "photo-upload") {
      flow.goPrevious();
    }
  };

  const renderScreen = () => {
    switch (flow.step) {
      case "welcome":
        return <WelcomeScreen onStart={flow.startConsultation} />;
      case "questionnaire":
        return (
          <QuestionnaireScreen
            questionIndex={flow.questionIndex}
            answers={flow.answers}
            onSelect={flow.selectAnswer}
          />
        );
      case "photo-upload":
        return (
          <PhotoUploadScreen
            photoPreview={flow.photoPreview}
            onPhotoChange={flow.setPhoto}
          />
        );
      case "loading":
        return <LoadingScreen onComplete={flow.completeLoading} />;
      case "result":
        return flow.result ? (
          <ResultScreen
            result={flow.result}
            onRestart={flow.restart}
            onDownloadPdf={flow.downloadPdf}
          />
        ) : null;
      default:
        return null;
    }
  };

  const isDark = true;

  return (
    <AppShell
      variant={isDark ? "dark" : "light"}
      footer={
        showNavFooter ? (
          <NavigationButtons
            onPrevious={handleBack}
            onNext={flow.goNext}
            previousLabel={t.questionnaire.previous}
            nextLabel={t.questionnaire.next}
            showPrevious={
              flow.step === "questionnaire" || flow.step === "photo-upload"
            }
            nextDisabled={
              (flow.step === "questionnaire" && !currentAnswer) ||
              (flow.step === "photo-upload" && !flow.photoPreview)
            }
          />
        ) : undefined
      }
    >
      {flow.step !== "welcome" && (
        <Header
          showBack={
            flow.step === "questionnaire" || flow.step === "photo-upload"
          }
          onBack={handleBack}
          transparent={isDark}
          dark={isDark}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={flow.step + flow.questionIndex}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
