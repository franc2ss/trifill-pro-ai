"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getQuestionText } from "@/i18n/translations";
import { questions } from "@/data/questions";
import { OptionCard } from "@/components/ui/OptionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";
import type { QuestionnaireAnswers } from "@/types";

type QuestionnaireScreenProps = {
  questionIndex: number;
  answers: QuestionnaireAnswers;
  onSelect: (questionId: keyof QuestionnaireAnswers, optionId: string) => void;
};

export function QuestionnaireScreen({
  questionIndex,
  answers,
  onSelect,
}: QuestionnaireScreenProps) {
  const { language, t } = useLanguage();
  const question = questions[questionIndex];
  const questionText = getQuestionText(
    language,
    question.id as "q1" | "q2" | "q3"
  );
  const selectedAnswer = answers[question.id];
  const isGrid = questionIndex === 1;

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 sm:px-6">
      <div className="mb-11 pt-4">
        <ProgressBar
          current={questionIndex + 1}
          total={3}
          label={`${questionIndex + 1} / 3`}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
          className="flex flex-1 flex-col"
        >
          <div className="mb-8">
            <h2 className="max-w-md text-[25px] font-light leading-[1.35] tracking-[-.025em] text-[#f6f2ea]">
              {questionText}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{t.questionnaire.selectOne}</p>
          </div>

          <div
            className={
              isGrid
                ? "grid grid-cols-1 gap-3.5 min-[390px]:grid-cols-2"
                : "flex flex-col gap-3.5"
            }
          >
            {question.options.map((option, index) => (
              <OptionCard
                key={option.id}
                label={t.questionnaire.options[option.id]}
                icon={option.icon}
                selected={selectedAnswer === option.id}
                onClick={() => onSelect(question.id, option.id)}
                index={index}
                compact={isGrid}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
