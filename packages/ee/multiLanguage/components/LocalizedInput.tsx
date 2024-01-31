import { recallToHeadline } from "@formbricks/lib/utils/recall";
import { TI18nString, TSurvey, TSurveyChoice, TSurveyQuestion } from "@formbricks/types/surveys";
import QuestionFormInput from "@formbricks/ui/QuestionFormInput";

import { extractLanguageSymbols, isLabelValidForAllLanguages } from "../utils/i18n";

interface LocalizedInputProps {
  id: string;
  name: string;
  value: TI18nString;
  isInvalid: boolean;
  localSurvey: TSurvey;
  placeholder?: string;
  selectedLanguage: string;
  updateQuestion?: (questionIdx: number, data: Partial<TSurveyQuestion>) => void;
  updateSurvey?: (data: Partial<TSurveyQuestion>) => void;
  updateChoice?: (choiceIdx: number, data: Partial<TSurveyChoice>) => void;
  questionIdx: number;
  setSelectedLanguage: (language: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  languages: string[][];
  maxLength?: number;
  defaultValue?: string;
}
const LocalizedInput = ({
  id,
  value,
  isInvalid,
  localSurvey,
  placeholder,
  selectedLanguage,
  updateQuestion,
  updateSurvey,
  updateChoice,
  questionIdx,
  setSelectedLanguage,
  onBlur,
  languages,
  maxLength,
}: LocalizedInputProps) => {
  const isThankYouCard = questionIdx === localSurvey.questions.length;
  const isWelcomeCard = questionIdx === -1;

  const questionId = () => {
    if (isThankYouCard) return "end";
    else if (isWelcomeCard) return "start";
    else return localSurvey.questions[questionIdx].id;
  };

  const isInComplete =
    id === "subheader" ||
    id === "lowerLabel" ||
    id === "upperLabel" ||
    id === "buttonLabel" ||
    id === "placeholder" ||
    id === "backButtonLabel"
      ? value.en?.trim() !== "" &&
        isInvalid &&
        !isLabelValidForAllLanguages(value, extractLanguageSymbols(languages)) &&
        selectedLanguage === "en"
      : isInvalid &&
        !isLabelValidForAllLanguages(value, extractLanguageSymbols(languages)) &&
        selectedLanguage === "en";
  return (
    <div className="relative w-full">
      <QuestionFormInput
        id={id}
        localSurvey={localSurvey}
        environmentId={localSurvey.environmentId}
        isInvalid={languages.length > 1 && isInComplete}
        questionId={questionId()}
        questionIdx={questionIdx}
        updateQuestion={updateQuestion}
        updateSurvey={updateSurvey}
        updateChoice={updateChoice}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
        maxLength={maxLength}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {selectedLanguage !== "en" && value.en && (
        <div className="mt-1 text-xs text-gray-500">
          <strong>Translate:</strong> {recallToHeadline(value, localSurvey, false, "en")["en"]}
        </div>
      )}
      {languages.length > 1 && isInComplete && (
        <div className="mt-1 text-xs text-red-400">Contains Incomplete translations</div>
      )}
    </div>
  );
};

export default LocalizedInput;