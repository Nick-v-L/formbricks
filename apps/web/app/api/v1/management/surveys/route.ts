import { authenticateRequest } from "@/app/api/v1/auth";
import { responses } from "@/app/lib/api/response";
import { transformErrorToDetails } from "@/app/lib/api/validator";
import { NextResponse } from "next/server";

import { translateSurvey } from "@formbricks/lib/i18n/utils";
import { getProductByEnvironmentId } from "@formbricks/lib/product/service";
import { createSurvey, getSurveys } from "@formbricks/lib/survey/service";
import { DatabaseError } from "@formbricks/types/errors";
import { ZSurveyInput } from "@formbricks/types/surveys";

export async function GET(request: Request) {
  try {
    const authentication = await authenticateRequest(request);
    if (!authentication) return responses.notAuthenticatedResponse();
    const surveys = await getSurveys(authentication.environmentId!);
    return responses.successResponse(surveys);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return responses.badRequestResponse(error.message);
    }
    throw error;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const authentication = await authenticateRequest(request);
    if (!authentication) return responses.notAuthenticatedResponse();
    let surveyInput = await request.json();
    if (surveyInput?.questions && surveyInput.questions[0].headline) {
      const questionHeadline = surveyInput.questions[0].headline;
      if (typeof questionHeadline === "string") {
        // its a legacy survey
        const product = await getProductByEnvironmentId(authentication.environmentId);
        const defaultLanguage = product?.languages.find((language) => language.default === true) ?? {
          id: "en",
          default: true,
          alias: "English",
        };
        surveyInput = translateSurvey(surveyInput, [defaultLanguage], defaultLanguage?.id);
      }
    }
    const inputValidation = ZSurveyInput.safeParse(surveyInput);

    if (!inputValidation.success) {
      return responses.badRequestResponse(
        "Fields are missing or incorrectly formatted",
        transformErrorToDetails(inputValidation.error),
        true
      );
    }

    const environmentId = authentication.environmentId;
    const surveyData = { ...inputValidation.data, environmentId: undefined };

    const survey = await createSurvey(environmentId, surveyData);
    return responses.successResponse(survey);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return responses.badRequestResponse(error.message);
    }
    throw error;
  }
}
