"use client";

import AdvancedSettings from "@/app/(app)/environments/[environmentId]/surveys/[surveyId]/edit/components/AdvancedSettings";
import DateQuestionForm from "@/app/(app)/environments/[environmentId]/surveys/[surveyId]/edit/components/DateQuestionForm";
import PictureSelectionForm from "@/app/(app)/environments/[environmentId]/surveys/[surveyId]/edit/components/PictureSelectionForm";
import { getTSurveyQuestionTypeName } from "@/app/lib/questions";
import {
  ArrowUpTrayIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CursorArrowRippleIcon,
  ListBulletIcon,
  PhoneIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import LocalizedInput from "@formbricks/ee/multiLanguage/components/LocalizedInput";
import { cn } from "@formbricks/lib/cn";
import { getDefaultLanguage } from "@formbricks/lib/i18n/utils";
import { recallToHeadline } from "@formbricks/lib/utils/recall";
import { TLanguage, TProduct } from "@formbricks/types/product";
import { TI18nString, TSurvey, TSurveyQuestionType } from "@formbricks/types/surveys";
import { Label } from "@formbricks/ui/Label";
import { Switch } from "@formbricks/ui/Switch";

import CTAQuestionForm from "./CTAQuestionForm";
import CalQuestionForm from "./CalQuestionForm";
import ConsentQuestionForm from "./ConsentQuestionForm";
import FileUploadQuestionForm from "./FileUploadQuestionForm";
import MultipleChoiceMultiForm from "./MultipleChoiceMultiForm";
import MultipleChoiceSingleForm from "./MultipleChoiceSingleForm";
import NPSQuestionForm from "./NPSQuestionForm";
import OpenQuestionForm from "./OpenQuestionForm";
import QuestionDropdown from "./QuestionMenu";
import RatingQuestionForm from "./RatingQuestionForm";

interface QuestionCardProps {
  localSurvey: TSurvey;
  product: TProduct;
  questionIdx: number;
  moveQuestion: (questionIndex: number, up: boolean) => void;
  updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
  deleteQuestion: (questionIdx: number) => void;
  duplicateQuestion: (questionIdx: number) => void;
  activeQuestionId: string | null;
  setActiveQuestionId: (questionId: string | null) => void;
  lastQuestion: boolean;
  selectedLanguageId: string;
  setSelectedLanguageId: (languageId: string) => void;
  surveyLanguages: TLanguage[];
  isInvalid: boolean;
}

export default function QuestionCard({
  localSurvey,
  product,
  questionIdx,
  moveQuestion,
  updateQuestion,
  duplicateQuestion,
  deleteQuestion,
  activeQuestionId,
  setActiveQuestionId,
  lastQuestion,
  selectedLanguageId,
  setSelectedLanguageId,
  surveyLanguages,
  isInvalid,
}: QuestionCardProps) {
  const question = localSurvey.questions[questionIdx];
  const open = activeQuestionId === question.id;
  const [openAdvanced, setOpenAdvanced] = useState(question.logic && question.logic.length > 0);
  const defaultLanguageId = getDefaultLanguage(product.languages).id;

  // formats the text to highlight specific parts of the text with slashes
  const formatTextWithSlashes = (text) => {
    const regex = /\/(.*?)\\/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      // Check if the part was inside slashes
      if (index % 2 !== 0) {
        return (
          <span key={index} className="mx-1 rounded-md bg-slate-100 p-1 px-2 text-xs">
            {part}
          </span>
        );
      } else {
        return part;
      }
    });
  };

  const updateEmptyNextButtonLabels = (labelValue: TI18nString) => {
    localSurvey.questions.forEach((q, index) => {
      if (index === localSurvey.questions.length - 1) return;
      if (!q.buttonLabel || q.buttonLabel[selectedLanguageId]?.trim() === "") {
        updateQuestion(index, { buttonLabel: labelValue });
      }
    });
  };

  return (
    <Draggable draggableId={question.id} index={questionIdx}>
      {(provided) => (
        <div
          className={cn(
            open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
            "flex flex-row rounded-lg bg-white transition-all duration-300 ease-in-out"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div
            className={cn(
              open ? "bg-slate-700" : "bg-slate-400",
              "top-0 w-10 rounded-l-lg p-2 text-center text-sm text-white hover:cursor-grab hover:bg-slate-600",
              isInvalid && "bg-red-400  hover:bg-red-600"
            )}>
            {questionIdx + 1}
          </div>
          <Collapsible.Root
            open={open}
            onOpenChange={() => {
              if (activeQuestionId !== question.id) {
                setActiveQuestionId(question.id);
              } else {
                setActiveQuestionId(null);
              }
            }}
            className="flex-1 rounded-r-lg border border-slate-200">
            <Collapsible.CollapsibleTrigger
              asChild
              className={cn(open ? "" : "  ", "flex cursor-pointer justify-between p-4 hover:bg-slate-50")}>
              <div>
                <div className="inline-flex">
                  <div className="-ml-0.5 mr-3 h-6 min-w-[1.5rem] text-slate-400">
                    {question.type === TSurveyQuestionType.FileUpload ? (
                      <ArrowUpTrayIcon />
                    ) : question.type === TSurveyQuestionType.OpenText ? (
                      <ChatBubbleBottomCenterTextIcon />
                    ) : question.type === TSurveyQuestionType.MultipleChoiceSingle ? (
                      <QueueListIcon />
                    ) : question.type === TSurveyQuestionType.MultipleChoiceMulti ? (
                      <ListBulletIcon />
                    ) : question.type === TSurveyQuestionType.NPS ? (
                      <PresentationChartBarIcon />
                    ) : question.type === TSurveyQuestionType.CTA ? (
                      <CursorArrowRippleIcon />
                    ) : question.type === TSurveyQuestionType.Rating ? (
                      <StarIcon />
                    ) : question.type === TSurveyQuestionType.Consent ? (
                      <CheckIcon />
                    ) : question.type === TSurveyQuestionType.PictureSelection ? (
                      <PhotoIcon />
                    ) : question.type === TSurveyQuestionType.Date ? (
                      <CalendarDaysIcon />
                    ) : question.type === TSurveyQuestionType.Cal ? (
                      <PhoneIcon />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {recallToHeadline(question.headline, localSurvey, true, selectedLanguageId)[
                        selectedLanguageId
                      ]
                        ? formatTextWithSlashes(
                            recallToHeadline(question.headline, localSurvey, true, selectedLanguageId)[
                              selectedLanguageId
                            ] ?? ""
                          )
                        : getTSurveyQuestionTypeName(question.type)}
                    </p>
                    {!open && question?.required && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {question?.required && "Required"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <QuestionDropdown
                    questionIdx={questionIdx}
                    lastQuestion={lastQuestion}
                    duplicateQuestion={duplicateQuestion}
                    deleteQuestion={deleteQuestion}
                    moveQuestion={moveQuestion}
                  />
                </div>
              </div>
            </Collapsible.CollapsibleTrigger>
            <Collapsible.CollapsibleContent className="px-4 pb-4">
              {question.type === TSurveyQuestionType.OpenText ? (
                <OpenQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.MultipleChoiceSingle ? (
                <MultipleChoiceSingleForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.MultipleChoiceMulti ? (
                <MultipleChoiceMultiForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.NPS ? (
                <NPSQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.CTA ? (
                <CTAQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.Rating ? (
                <RatingQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.Consent ? (
                <ConsentQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.Date ? (
                <DateQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.PictureSelection ? (
                <PictureSelectionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.FileUpload ? (
                <FileUploadQuestionForm
                  localSurvey={localSurvey}
                  product={product}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : question.type === TSurveyQuestionType.Cal ? (
                <CalQuestionForm
                  localSurvey={localSurvey}
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  defaultLanguageId={defaultLanguageId}
                />
              ) : null}
              <div className="mt-4">
                <Collapsible.Root open={openAdvanced} onOpenChange={setOpenAdvanced} className="mt-5">
                  <Collapsible.CollapsibleTrigger className="flex items-center text-sm text-slate-700">
                    {openAdvanced ? (
                      <ChevronDownIcon className="mr-1 h-4 w-3" />
                    ) : (
                      <ChevronRightIcon className="mr-2 h-4 w-3" />
                    )}
                    {openAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
                  </Collapsible.CollapsibleTrigger>

                  <Collapsible.CollapsibleContent className="space-y-4">
                    {question.type !== TSurveyQuestionType.NPS &&
                    question.type !== TSurveyQuestionType.Rating &&
                    question.type !== TSurveyQuestionType.CTA ? (
                      <div className="mt-2 flex space-x-2">
                        <div className="w-full">
                          <LocalizedInput
                            id="buttonLabel"
                            name="buttonLabel"
                            value={question.buttonLabel}
                            localSurvey={localSurvey}
                            questionIdx={questionIdx}
                            maxLength={48}
                            placeholder={lastQuestion ? "Finish" : "Next"}
                            surveyLanguages={surveyLanguages}
                            isInvalid={isInvalid}
                            updateQuestion={updateQuestion}
                            selectedLanguageId={selectedLanguageId}
                            setSelectedLanguageId={setSelectedLanguageId}
                            defaultLanguageId={defaultLanguageId}
                            onBlur={(e) => {
                              if (!question.buttonLabel) return;
                              let translatedNextButtonLabel = {
                                ...question.buttonLabel,
                                [selectedLanguageId]: e.target.value,
                              };

                              if (questionIdx === localSurvey.questions.length - 1) return;
                              updateEmptyNextButtonLabels(translatedNextButtonLabel);
                            }}
                          />
                        </div>
                        {questionIdx !== 0 && (
                          <LocalizedInput
                            id="backButtonLabel"
                            name="backButtonLabel"
                            value={question.backButtonLabel}
                            localSurvey={localSurvey}
                            questionIdx={questionIdx}
                            maxLength={48}
                            placeholder={"Back"}
                            surveyLanguages={surveyLanguages}
                            isInvalid={isInvalid}
                            updateQuestion={updateQuestion}
                            selectedLanguageId={selectedLanguageId}
                            setSelectedLanguageId={setSelectedLanguageId}
                            defaultLanguageId={defaultLanguageId}
                          />
                        )}
                      </div>
                    ) : null}
                    {(question.type === TSurveyQuestionType.Rating ||
                      question.type === TSurveyQuestionType.NPS) &&
                      questionIdx !== 0 && (
                        <div className="mt-4">
                          <LocalizedInput
                            id="backButtonLabel"
                            name="backButtonLabel"
                            value={question.backButtonLabel}
                            localSurvey={localSurvey}
                            questionIdx={questionIdx}
                            maxLength={48}
                            placeholder={"Back"}
                            surveyLanguages={surveyLanguages}
                            isInvalid={isInvalid}
                            updateQuestion={updateQuestion}
                            selectedLanguageId={selectedLanguageId}
                            setSelectedLanguageId={setSelectedLanguageId}
                            defaultLanguageId={defaultLanguageId}
                          />
                        </div>
                      )}

                    <AdvancedSettings
                      question={question}
                      questionIdx={questionIdx}
                      localSurvey={localSurvey}
                      updateQuestion={updateQuestion}
                      defaultLanguageId={defaultLanguageId}
                    />
                  </Collapsible.CollapsibleContent>
                </Collapsible.Root>
              </div>
            </Collapsible.CollapsibleContent>

            {open && (
              <div className="mx-4 flex justify-end space-x-6 border-t border-slate-200">
                {question.type === "openText" && (
                  <div className="my-4 flex items-center justify-end space-x-2">
                    <Label htmlFor="longAnswer">Long Answer</Label>
                    <Switch
                      id="longAnswer"
                      checked={question.longAnswer !== false}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuestion(questionIdx, {
                          longAnswer:
                            typeof question.longAnswer === "undefined" ? false : !question.longAnswer,
                        });
                      }}
                    />
                  </div>
                )}
                {
                  <div className="my-4 flex items-center justify-end space-x-2">
                    <Label htmlFor="required-toggle">Required</Label>
                    <Switch
                      id="required-toggle"
                      checked={question.required}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuestion(questionIdx, { required: !question.required });
                      }}
                    />
                  </div>
                }
              </div>
            )}
          </Collapsible.Root>
        </div>
      )}
    </Draggable>
  );
}
