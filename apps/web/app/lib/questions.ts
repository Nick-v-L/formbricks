import {
  ArrowUpTrayIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  CursorArrowRippleIcon,
  ListBulletIcon,
  PhoneIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { createId } from "@paralleldrive/cuid2";

import { TSurveyQuestionType as QuestionId } from "@formbricks/types/surveys";

import { replaceQuestionPresetPlaceholders } from "./templates";

export type TSurveyQuestionType = {
  id: string;
  label: string;
  description: string;
  icon: any;
  preset: any;
};

export const questionTypes: TSurveyQuestionType[] = [
  {
    id: QuestionId.OpenText,
    label: "Free text",
    description: "Ask for a text-based answer",
    icon: ChatBubbleBottomCenterTextIcon,
    preset: {
      headline: { en: "Who let the dogs out?" },
      subheader: { en: "Who? Who? Who?" },
      placeholder: { en: "Type your answer here..." },
      longAnswer: true,
    },
  },
  {
    id: QuestionId.MultipleChoiceSingle,
    label: "Single-Select",
    description: "A single choice from a list of options (radio buttons)",
    icon: QueueListIcon,
    preset: {
      headline: { en: "What do you do?" },
      subheader: { en: "Can't do both." },
      choices: [
        { id: createId(), label: { en: "Eat the cake 🍰" } },
        { id: createId(), label: { en: "Have the cake 🎂" } },
      ],
      shuffleOption: "none",
    },
  },
  {
    id: QuestionId.MultipleChoiceMulti,
    label: "Multi-Select",
    description: "Number of choices from a list of options (checkboxes)",
    icon: ListBulletIcon,
    preset: {
      headline: { en: "What's important on vacay?" },
      choices: [
        { id: createId(), label: { en: "Sun ☀️" } },
        { id: createId(), label: { en: "Ocean 🌊" } },
        { id: createId(), label: { en: "Palms 🌴" } },
      ],
      shuffleOption: "none",
    },
  },
  {
    id: QuestionId.PictureSelection,
    label: "Picture Selection",
    description: "Ask respondents to select one or more pictures",
    icon: PhotoIcon,
    preset: {
      headline: { en: "Which is the cutest puppy?" },
      subheader: { en: "You can also pick both." },
      allowMulti: true,
      choices: [
        {
          id: createId(),
          imageUrl: "https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-1-small.jpg",
        },
        {
          id: createId(),
          imageUrl: "https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-2-small.jpg",
        },
      ],
    },
  },
  {
    id: QuestionId.Rating,
    label: "Rating",
    description: "Ask respondents for a rating",
    icon: StarIcon,
    preset: {
      headline: { en: "How would you rate {{productName}}" },
      subheader: { en: "Don't worry, be honest." },
      scale: "star",
      range: 5,
      lowerLabel: { en: "Not good" },
      upperLabel: { en: "Very good" },
    },
  },
  {
    id: QuestionId.NPS,
    label: "Net Promoter Score (NPS)",
    description: "Rate satisfaction on a 0-10 scale",
    icon: PresentationChartBarIcon,
    preset: {
      headline: { en: "How likely are you to recommend {{productName}} to a friend or colleague?" },
      lowerLabel: { en: "Not at all likely" },
      upperLabel: { en: "Extremely likely" },
    },
  },
  {
    id: QuestionId.CTA,
    label: "Call-to-Action",
    description: "Prompt respondents to perform an action",
    icon: CursorArrowRippleIcon,
    preset: {
      headline: { en: "You are one of our power users!" },
      html: { en: "" },
      buttonLabel: { en: "Book interview" },
      buttonExternal: false,
      dismissButtonLabel: "Skip",
    },
  },
  {
    id: QuestionId.Consent,
    label: "Consent",
    description: "Ask respondents for consent",
    icon: CheckIcon,
    preset: {
      headline: { en: "Terms and Conditions" },
      html: { en: "" },
      label: { en: "I agree to the terms and conditions" },
      dismissButtonLabel: "Skip",
    },
  },
  {
    id: QuestionId.Date,
    label: "Date",
    description: "Ask your users to select a date",
    icon: CalendarDaysIcon,
    preset: {
      headline: { en: "When is your birthday?" },
      format: "M-d-y",
    },
  },
  {
    id: QuestionId.FileUpload,
    label: "File Upload",
    description: "Allow respondents to upload a file",
    icon: ArrowUpTrayIcon,
    preset: {
      headline: { en: "File Upload" },
      allowMultipleFiles: false,
    },
  },
  {
    id: QuestionId.Cal,
    label: "Schedule a meeting",
    description: "Allow respondents to schedule a meet",
    icon: PhoneIcon,
    preset: {
      headline: { en: "Schedule a call with me" },
      buttonLabel: { en: "Skip" },
      calUserName: "rick/get-rick-rolled",
    },
  },
];

export const universalQuestionPresets = {
  required: true,
};

export const getQuestionDefaults = (id: string, product: any) => {
  const questionType = questionTypes.find((questionType) => questionType.id === id);
  return replaceQuestionPresetPlaceholders(questionType?.preset, product);
};

export const getTSurveyQuestionTypeName = (id: string) => {
  const questionType = questionTypes.find((questionType) => questionType.id === id);
  return questionType?.label;
};
