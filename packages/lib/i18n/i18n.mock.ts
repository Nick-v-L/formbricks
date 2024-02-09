import {
  TSurvey,
  TSurveyCTAQuestion,
  TSurveyCalQuestion,
  TSurveyConsentQuestion,
  TSurveyDateQuestion,
  TSurveyFileUploadQuestion,
  TSurveyMultipleChoiceMultiQuestion,
  TSurveyMultipleChoiceSingleQuestion,
  TSurveyNPSQuestion,
  TSurveyOpenTextQuestion,
  TSurveyPictureSelectionQuestion,
  TSurveyQuestionType,
  TSurveyRatingQuestion,
  TSurveyThankYouCard,
  TSurveyWelcomeCard,
} from "@formbricks/types/surveys";

export const mockWelcomeCard: TSurveyWelcomeCard = {
  html: {
    en: '<p class="fb-editor-paragraph"><br></p><p class="fb-editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Thanks for providing your feedback - let\'s go!</span></p>',
  },
  enabled: true,
  headline: {
    en: "Welcome!",
  },
  timeToFinish: false,
  showResponseCount: false,
} as unknown as TSurveyWelcomeCard;

export const mockOpenTextQuestion: TSurveyOpenTextQuestion = {
  id: "lqht9sj5s6andjkmr9k1n54q",
  type: TSurveyQuestionType.OpenText,
  headline: {
    en: "What would you like to know?",
  },

  required: true,
  inputType: "text",
  subheader: {
    en: "This is an example survey.",
  },
  placeholder: {
    en: "Type your answer here...",
  },
};

export const mockSingleSelectQuestion: TSurveyMultipleChoiceSingleQuestion = {
  id: "mvqx8t90np6isb6oel9eamzc",
  type: TSurveyQuestionType.MultipleChoiceSingle,
  choices: [
    {
      id: "r52sul8ag19upaicit0fyqzo",
      label: {
        en: "Eat the cake 🍰",
      },
    },
    {
      id: "es0gc12hrpk12x13rlqm59rg",
      label: {
        en: "Have the cake 🎂",
      },
    },
  ],
  isDraft: true,
  headline: {
    en: "What do you do?",
  },
  required: true,
  subheader: {
    en: "Can't do both.",
  },
  shuffleOption: "none",
};

export const mockMultiSelectQuestion: TSurveyMultipleChoiceMultiQuestion = {
  required: true,
  headline: {
    en: "What's important on vacay?",
  },
  choices: [
    {
      id: "mgjk3i967ject4mezs4cjadj",
      label: {
        en: "Sun ☀️",
      },
    },
    {
      id: "m1wmzagcle4bzmkmgru4ol0w",
      label: {
        en: "Ocean 🌊",
      },
    },
    {
      id: "h12xs1v3w7s579p4upb5vnzp",
      label: {
        en: "Palms 🌴",
      },
    },
  ],
  shuffleOption: "none",
  id: "cpydxgsmjg8q9iwfa8wj4ida",
  type: TSurveyQuestionType.MultipleChoiceMulti,
  isDraft: true,
};

export const mockPictureSelectQuestion: TSurveyPictureSelectionQuestion = {
  required: true,
  headline: {
    en: "Which is the cutest puppy?",
  },
  subheader: {
    en: "You can also pick both.",
  },
  allowMulti: true,
  choices: [
    {
      id: "bdz471uu4ut7ox38b5aprzkq",
      imageUrl: "https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-1-small.jpg",
    },
    {
      id: "t10v5rkqw32si3orlkt9mrdw",
      imageUrl: "https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-2-small.jpg",
    },
  ],
  id: "a8monbe8hq0mivh3irfhd3i5",
  type: TSurveyQuestionType.PictureSelection,
  isDraft: true,
};

export const mockRatingQuestion: TSurveyRatingQuestion = {
  required: true,
  headline: {
    en: "How would you rate My Product",
  },
  subheader: {
    en: "Don't worry, be honest.",
  },
  scale: "star",
  range: 5,
  lowerLabel: {
    en: "Not good",
  },
  upperLabel: {
    en: "Very good",
  },
  id: "waldsboahjtgqhg5p18d1awz",
  type: TSurveyQuestionType.Rating,
  isDraft: true,
};

export const mockNpsQuestion: TSurveyNPSQuestion = {
  required: true,
  headline: {
    en: "How likely are you to recommend My Product to a friend or colleague?",
  },
  lowerLabel: {
    en: "Not at all likely",
  },
  upperLabel: {
    en: "Extremely likely",
  },
  id: "m9pemgdih2p4exvkmeeqq6jf",
  type: TSurveyQuestionType.NPS,
  isDraft: true,
};

export const mockCtaQuestion: TSurveyCTAQuestion = {
  required: true,
  headline: {
    en: "You are one of our power users!",
  },
  buttonLabel: {
    en: "Book interview",
  },
  buttonExternal: false,
  dismissButtonLabel: {
    en: "Skip",
  },
  id: "gwn15urom4ffnhfimwbz3vgc",
  type: TSurveyQuestionType.CTA,
  isDraft: true,
};

export const mockConsentQuestion: TSurveyConsentQuestion = {
  required: true,
  headline: {
    en: "Terms and Conditions",
  },
  label: {
    en: "I agree to the terms and conditions",
  },
  dismissButtonLabel: "Skip",
  id: "av561aoif3i2hjlsl6krnsfm",
  type: TSurveyQuestionType.Consent,
  isDraft: true,
};

export const mockDateQuestion: TSurveyDateQuestion = {
  required: true,
  headline: {
    en: "When is your birthday?",
  },
  format: "M-d-y",
  id: "ts2f6v2oo9jfmfli9kk6lki9",
  type: TSurveyQuestionType.Date,
  isDraft: true,
};

export const mockFileUploadQuestion: TSurveyFileUploadQuestion = {
  required: true,
  headline: {
    en: "File Upload",
  },
  allowMultipleFiles: false,
  id: "ozzxo2jj1s6mj56c79q8pbef",
  type: TSurveyQuestionType.FileUpload,
  isDraft: true,
};

export const mockCalQuestion: TSurveyCalQuestion = {
  required: true,
  headline: {
    en: "Schedule a call with me",
  },
  buttonLabel: {
    en: "Skip",
  },
  calUserName: "rick/get-rick-rolled",
  id: "o3bnux6p42u9ew9d02l14r26",
  type: TSurveyQuestionType.Cal,
  isDraft: true,
};

export const mockThankYouCard: TSurveyThankYouCard = {
  enabled: true,
  headline: {
    en: "Thank you!",
  },
  subheader: {
    en: "We appreciate your feedback.",
  },
  buttonLink: "https://formbricks.com/signup",
  buttonLabel: "Create your own Survey",
} as unknown as TSurveyThankYouCard;

export const mockSurvey: TSurvey = {
  id: "surveyId",
  createdAt: "2024-02-06T20:12:03.521Z",
  updatedAt: "2024-02-06T20:12:03.521Z",
  name: "New Survey",
  type: "link",
  environmentId: "envId",
  createdBy: "creatorId",
  status: "draft",
  welcomeCard: mockWelcomeCard,
  questions: [
    mockOpenTextQuestion,
    mockSingleSelectQuestion,
    mockMultiSelectQuestion,
    mockPictureSelectQuestion,
    mockRatingQuestion,
    mockNpsQuestion,
    mockCtaQuestion,
    mockConsentQuestion,
    mockDateQuestion,
    mockFileUploadQuestion,
    mockCalQuestion,
  ],
  thankYouCard: {
    enabled: true,
    headline: {
      en: "Thank you!",
    },
    subheader: {
      en: "We appreciate your feedback.",
    },
    buttonLink: "https://formbricks.com/signup",
    buttonLabel: "Create your own Survey",
  },
  hiddenFields: {
    enabled: true,
    fieldIds: [],
  },
  displayOption: "displayOnce",
  recontactDays: null,
  autoClose: null,
  closeOnDate: null,
  delay: 0,
  displayPercentage: null,
  autoComplete: null,
  verifyEmail: null,
  redirectUrl: null,
  productOverwrites: null,
  styling: null,
  surveyClosedMessage: null,
  singleUse: {
    enabled: false,
    isEncrypted: true,
  },
  pin: null,
  resultShareKey: null,
  triggers: [],
  attributeFilters: [],
} as unknown as TSurvey;

export const mockTranslatedWelcomeCard = {
  html: {
    en: '<p class="fb-editor-paragraph"><br></p><p class="fb-editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Thanks for providing your feedback - let\'s go!</span></p>',
    de: "",
  },
  enabled: true,
  headline: { en: "Welcome!", de: "" },
  timeToFinish: false,
  showResponseCount: false,
};

export const mockLegacyWelcomeCard = {
  html: '<p class="fb-editor-paragraph"><br></p><p class="fb-editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">Thanks for providing your feedback - let\'s go!</span></p>',
  enabled: true,
  headline: "Welcome!",
  timeToFinish: false,
  showResponseCount: false,
};

export const mockTranslatedOpenTextQuestion = {
  ...mockOpenTextQuestion,
  headline: { en: "What would you like to know?", de: "" },
  subheader: { en: "This is an example survey.", de: "" },
  placeholder: { en: "Type your answer here...", de: "" },
};

export const mockLegacyOpenTextQuestion = {
  ...mockOpenTextQuestion,
  headline: "What would you like to know?",
  subheader: "This is an example survey.",
  placeholder: "Type your answer here...",
};

export const mockTranslatedSingleSelectQuestion = {
  ...mockSingleSelectQuestion,
  headline: { en: "What do you do?", de: "" },
  subheader: { en: "Can't do both.", de: "" },
  choices: mockSingleSelectQuestion.choices.map((choice) => ({
    ...choice,
    label: { en: choice.label.en, de: "" },
  })),
  otherOptionPlaceholder: undefined,
};

export const mockLegacySingleSelectQuestion = {
  ...mockSingleSelectQuestion,
  headline: "What do you do?",
  subheader: "Can't do both.",
  choices: mockSingleSelectQuestion.choices.map((choice) => ({
    ...choice,
    label: choice.label.en,
  })),
};

export const mockTranslatedMultiSelectQuestion = {
  ...mockMultiSelectQuestion,
  headline: { en: "What's important on vacay?", de: "" },
  choices: mockMultiSelectQuestion.choices.map((choice) => ({
    ...choice,
    label: { en: choice.label.en, de: "" },
  })),
  otherOptionPlaceholder: undefined,
};

export const mockLegacyMultiSelectQuestion = {
  ...mockMultiSelectQuestion,
  headline: "What's important on vacay?",
  choices: mockMultiSelectQuestion.choices.map((choice) => ({
    ...choice,
    label: choice.label.en,
  })),
};

export const mockTranslatedPictureSelectQuestion = {
  ...mockPictureSelectQuestion,
  headline: { en: "Which is the cutest puppy?", de: "" },
  subheader: { en: "You can also pick both.", de: "" },
};
export const mockLegacyPictureSelectQuestion = {
  ...mockPictureSelectQuestion,
  headline: "Which is the cutest puppy?",
  subheader: "You can also pick both.",
};

export const mockTranslatedRatingQuestion = {
  ...mockRatingQuestion,
  headline: { en: "How would you rate My Product", de: "" },
  subheader: { en: "Don't worry, be honest.", de: "" },
  lowerLabel: { en: "Not good", de: "" },
  upperLabel: { en: "Very good", de: "" },
};

export const mockLegacyRatingQuestion = {
  ...mockRatingQuestion,
  headline: "How would you rate My Product",
  subheader: "Don't worry, be honest.",
  lowerLabel: "Not good",
  upperLabel: "Very good",
};

export const mockTranslatedNpsQuestion = {
  ...mockNpsQuestion,
  headline: {
    en: "How likely are you to recommend My Product to a friend or colleague?",
    de: "",
  },
  lowerLabel: { en: "Not at all likely", de: "" },
  upperLabel: { en: "Extremely likely", de: "" },
};

export const mockLegacyNpsQuestion = {
  ...mockNpsQuestion,
  headline: "How likely are you to recommend My Product to a friend or colleague?",
  lowerLabel: "Not at all likely",
  upperLabel: "Extremely likely",
};

export const mockTranslatedCtaQuestion = {
  ...mockCtaQuestion,
  headline: { en: "You are one of our power users!", de: "" },
  buttonLabel: { en: "Book interview", de: "" },
  dismissButtonLabel: { en: "Skip", de: "" },
};

export const mockLegacyCtaQuestion = {
  ...mockCtaQuestion,
  headline: "You are one of our power users!",
  buttonLabel: "Book interview",
  dismissButtonLabel: "Skip",
};

export const mockTranslatedConsentQuestion = {
  ...mockConsentQuestion,
  headline: { en: "Terms and Conditions", de: "" },
  label: { en: "I agree to the terms and conditions", de: "" },
  dismissButtonLabel: "Skip",
};

export const mockLegacyConsentQuestion = {
  ...mockConsentQuestion,
  headline: "Terms and Conditions",
  label: "I agree to the terms and conditions",
  dismissButtonLabel: "Skip",
};

export const mockTranslatedDateQuestion = {
  ...mockDateQuestion,
  headline: { en: "When is your birthday?", de: "" },
};

export const mockLegacyDateQuestion = {
  ...mockDateQuestion,
  headline: "When is your birthday?",
};

export const mockTranslatedFileUploadQuestion = {
  ...mockFileUploadQuestion,
  headline: { en: "File Upload", de: "" },
};

export const mockLegacyFileUploadQuestion = {
  ...mockFileUploadQuestion,
  headline: "File Upload",
};

export const mockTranslatedCalQuestion = {
  ...mockCalQuestion,
  headline: { en: "Schedule a call with me", de: "" },
  buttonLabel: { en: "Skip", de: "" },
};

export const mockLegacyCalQuestion = {
  ...mockCalQuestion,
  headline: "Schedule a call with me",
  buttonLabel: "Skip",
};

export const mockTranslatedThankYouCard = {
  ...mockThankYouCard,
  headline: { en: "Thank you!", de: "" },
  subheader: { en: "We appreciate your feedback.", de: "" },
  buttonLabel: "Create your own Survey",
};

export const mockLegacyThankYouCard = {
  ...mockThankYouCard,
  headline: "Thank you!",
  subheader: "We appreciate your feedback.",
  buttonLabel: "Create your own Survey",
};

export const mockTranslatedSurvey = {
  ...mockSurvey,
  questions: [
    mockTranslatedOpenTextQuestion,
    mockTranslatedSingleSelectQuestion,
    mockTranslatedMultiSelectQuestion,
    mockTranslatedPictureSelectQuestion,
    mockTranslatedRatingQuestion,
    mockTranslatedNpsQuestion,
    mockTranslatedCtaQuestion,
    mockTranslatedConsentQuestion,
    mockTranslatedDateQuestion,
    mockTranslatedFileUploadQuestion,
    mockTranslatedCalQuestion,
  ],
  welcomeCard: mockTranslatedWelcomeCard,
  thankYouCard: mockTranslatedThankYouCard,
};

export const mockLegacySurvey = {
  ...mockSurvey,
  createdAt: "2024-02-06T20:12:03.521Z",
  updatedAt: "2024-02-06T20:12:03.521Z",
  questions: [
    mockLegacyOpenTextQuestion,
    mockLegacySingleSelectQuestion,
    mockLegacyMultiSelectQuestion,
    mockLegacyPictureSelectQuestion,
    mockLegacyRatingQuestion,
    mockLegacyNpsQuestion,
    mockLegacyCtaQuestion,
    mockLegacyConsentQuestion,
    mockLegacyDateQuestion,
    mockLegacyFileUploadQuestion,
    mockLegacyCalQuestion,
  ],
  welcomeCard: mockLegacyWelcomeCard,
  thankYouCard: mockLegacyThankYouCard,
};
