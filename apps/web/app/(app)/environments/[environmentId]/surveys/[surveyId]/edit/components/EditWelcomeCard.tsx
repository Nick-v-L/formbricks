"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocalizedEditor } from "@formbricks/ee/multiLanguage/components/LocalizedEditor";
import LocalizedInput from "@formbricks/ee/multiLanguage/components/LocalizedInput";
import { cn } from "@formbricks/lib/cn";
import { TLanguage } from "@formbricks/types/product";
import { TSurvey } from "@formbricks/types/surveys";
import FileInput from "@formbricks/ui/FileInput";
import { Label } from "@formbricks/ui/Label";
import { Switch } from "@formbricks/ui/Switch";

interface EditWelcomeCardProps {
  localSurvey: TSurvey;
  setLocalSurvey: (survey: TSurvey) => void;
  setActiveQuestionId: (id: string | null) => void;
  activeQuestionId: string | null;
  isInvalid: boolean;
  selectedLanguageId: string;
  setSelectedLanguageId: (languageId: string) => void;
  surveyLanguages: TLanguage[];
  defaultLanguageId: string;
}

export default function EditWelcomeCard({
  localSurvey,
  setLocalSurvey,
  setActiveQuestionId,
  activeQuestionId,
  isInvalid,
  selectedLanguageId,
  setSelectedLanguageId,
  surveyLanguages,
  defaultLanguageId,
}: EditWelcomeCardProps) {
  const [firstRender, setFirstRender] = useState(true);
  const path = usePathname();
  const environmentId = path?.split("/environments/")[1]?.split("/")[0];
  // const [open, setOpen] = useState(false);
  let open = activeQuestionId == "start";
  const setOpen = (e) => {
    if (e) {
      setActiveQuestionId("start");
    } else {
      setActiveQuestionId(null);
    }
  };

  const updateSurvey = (data) => {
    setLocalSurvey({
      ...localSurvey,
      welcomeCard: {
        ...localSurvey.welcomeCard,
        ...data,
      },
    });
  };
  useEffect(() => {
    setFirstRender(true);
  }, [localSurvey.thankYouCard]);

  return (
    <div
      className={cn(
        open ? "scale-100 shadow-lg " : "scale-97 shadow-md",
        "group flex flex-row rounded-lg bg-white transition-transform duration-300 ease-in-out"
      )}>
      <div
        className={cn(
          open ? "bg-slate-50" : "",
          "flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none",
          isInvalid ? "bg-red-400" : "bg-white group-hover:bg-slate-50"
        )}>
        <p>✋</p>
      </div>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="flex-1 rounded-r-lg border border-slate-200 transition-all duration-300 ease-in-out">
        <Collapsible.CollapsibleTrigger
          asChild
          className="flex cursor-pointer justify-between p-4 hover:bg-slate-50">
          <div>
            <div className="inline-flex">
              <div>
                <p className="text-sm font-semibold">Welcome Card</p>
                {!open && (
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {localSurvey?.welcomeCard?.enabled ? "Shown" : "Hidden"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="welcome-toggle">Enabled</Label>

              <Switch
                id="welcome-toggle"
                checked={localSurvey?.welcomeCard?.enabled}
                onClick={(e) => {
                  e.stopPropagation();
                  updateSurvey({ enabled: !localSurvey.welcomeCard?.enabled });
                }}
              />
            </div>
          </div>
        </Collapsible.CollapsibleTrigger>
        <Collapsible.CollapsibleContent className="px-4 pb-6">
          <form>
            <div className="mt-2">
              <Label htmlFor="companyLogo">Company Logo</Label>
            </div>
            <div className="mt-3 flex w-full items-center justify-center">
              <FileInput
                id="welcome-card-image"
                allowedFileExtensions={["png", "jpeg", "jpg"]}
                environmentId={environmentId}
                onFileUpload={(url: string[]) => {
                  updateSurvey({ fileUrl: url[0] });
                }}
                fileUrl={localSurvey?.welcomeCard?.fileUrl}
              />
            </div>
            <div className="mt-3">
              <LocalizedInput
                id="headline"
                name="headline"
                value={localSurvey.welcomeCard.headline}
                label="Headline"
                localSurvey={localSurvey}
                questionIdx={-1}
                surveyLanguages={surveyLanguages}
                isInvalid={isInvalid}
                updateSurvey={updateSurvey}
                selectedLanguageId={selectedLanguageId}
                setSelectedLanguageId={setSelectedLanguageId}
                defaultLanguageId={defaultLanguageId}
              />
            </div>
            <div className="mt-3">
              <Label htmlFor="subheader">Welcome Message</Label>
              <div className="mt-2">
                <LocalizedEditor
                  id="html"
                  value={localSurvey.welcomeCard.html}
                  localSurvey={localSurvey}
                  surveyLanguages={surveyLanguages}
                  isInvalid={isInvalid}
                  updateQuestion={updateSurvey}
                  selectedLanguageId={selectedLanguageId}
                  setSelectedLanguageId={setSelectedLanguageId}
                  firstRender={firstRender}
                  setFirstRender={setFirstRender}
                  questionIdx={-1}
                  defaultLanguageId={defaultLanguageId}
                />
              </div>
            </div>

            <div className="mt-3 flex justify-between gap-8">
              <div className="flex w-full space-x-2">
                <div className="w-full">
                  <LocalizedInput
                    id="buttonLabel"
                    name="buttonLabel"
                    value={localSurvey.welcomeCard.buttonLabel}
                    localSurvey={localSurvey}
                    questionIdx={-1}
                    maxLength={48}
                    placeholder={"Next"}
                    surveyLanguages={surveyLanguages}
                    isInvalid={isInvalid}
                    updateSurvey={updateSurvey}
                    selectedLanguageId={selectedLanguageId}
                    setSelectedLanguageId={setSelectedLanguageId}
                    defaultLanguageId={defaultLanguageId}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center">
              <div className="mr-2">
                <Switch
                  id="timeToFinish"
                  name="timeToFinish"
                  checked={localSurvey?.welcomeCard?.timeToFinish}
                  onCheckedChange={() =>
                    updateSurvey({ timeToFinish: !localSurvey.welcomeCard.timeToFinish })
                  }
                />
              </div>
              <div className="flex-column">
                <Label htmlFor="timeToFinish" className="">
                  Time to Finish
                </Label>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Display an estimate of completion time for survey
                </div>
              </div>
            </div>
            {localSurvey?.type === "link" && (
              <div className="mt-6 flex items-center">
                <div className="mr-2">
                  <Switch
                    id="showResponseCount"
                    name="showResponseCount"
                    checked={localSurvey?.welcomeCard?.showResponseCount}
                    onCheckedChange={() =>
                      updateSurvey({ showResponseCount: !localSurvey.welcomeCard.showResponseCount })
                    }
                  />
                </div>
                <div className="flex-column">
                  <Label htmlFor="showResponseCount" className="">
                    Show Response Count
                  </Label>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Display number of responses for survey
                  </div>
                </div>
              </div>
            )}
          </form>
        </Collapsible.CollapsibleContent>
      </Collapsible.Root>
    </div>
  );
}
