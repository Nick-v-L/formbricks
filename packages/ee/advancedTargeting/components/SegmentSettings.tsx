"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@formbricks/lib/cn";
import { TActionClass } from "@formbricks/types/actionClasses";
import { TAttributeClass } from "@formbricks/types/attributeClasses";
import { TBaseFilter, TSegment, TSegmentWithSurveyNames, ZSegmentFilters } from "@formbricks/types/segment";
import { Button } from "@formbricks/ui/Button";
import { Input } from "@formbricks/ui/Input";
import ConfirmDeleteSegmentModal from "@formbricks/ui/Targeting/ConfirmDeleteSegmentModal";

import { deleteSegmentAction, updateSegmentAction } from "../lib/actions";
import AddFilterModal from "./AddFilterModal";
import SegmentEditor from "./SegmentEditor";

type TSegmentSettingsTabProps = {
  environmentId: string;
  setOpen: (open: boolean) => void;
  initialSegment: TSegmentWithSurveyNames;
  segments: TSegment[];
  attributeClasses: TAttributeClass[];
  actionClasses: TActionClass[];
};

const SegmentSettings = ({
  environmentId,
  initialSegment,
  setOpen,
  actionClasses,
  attributeClasses,
  segments,
}: TSegmentSettingsTabProps) => {
  const router = useRouter();

  const [addFilterModalOpen, setAddFilterModalOpen] = useState(false);
  const [segment, setSegment] = useState<TSegment>(initialSegment);

  const [isUpdatingSegment, setIsUpdatingSegment] = useState(false);
  const [isDeletingSegment, setIsDeletingSegment] = useState(false);

  const [titleError, setTitleError] = useState("");

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [isDeleteSegmentModalOpen, setIsDeleteSegmentModalOpen] = useState(false);

  const handleResetState = () => {
    setSegment(initialSegment);
    setOpen(false);

    setTitleError("");
    router.refresh();
  };

  const handleAddFilterInGroup = (filter: TBaseFilter) => {
    const updatedSegment = structuredClone(segment);
    if (updatedSegment?.filters?.length === 0) {
      updatedSegment.filters.push({
        ...filter,
        connector: null,
      });
    } else {
      updatedSegment?.filters.push(filter);
    }

    setSegment(updatedSegment);
  };

  const handleUpdateSegment = async () => {
    if (!segment.title) {
      setTitleError("Title is required");
      return;
    }

    try {
      setIsUpdatingSegment(true);
      await updateSegmentAction(segment.environmentId, segment.id, {
        title: segment.title,
        description: segment.description ?? "",
        isPrivate: segment.isPrivate,
        filters: segment.filters,
      });

      setIsUpdatingSegment(false);
      toast.success("Segment updated successfully!");
    } catch (err: any) {
      toast.error(`${err.message}`);
      setIsUpdatingSegment(false);
      return;
    }

    setIsUpdatingSegment(false);
    handleResetState();
    router.refresh();
  };

  const handleDeleteSegment = async () => {
    try {
      setIsDeletingSegment(true);
      await deleteSegmentAction(segment.environmentId, segment.id);

      setIsDeletingSegment(false);
      toast.success("Segment deleted successfully!");
      handleResetState();
    } catch (err: any) {
      toast.error(`${err.message}`);
    }

    setIsDeletingSegment(false);
  };

  useEffect(() => {
    // parse the filters to check if they are valid
    const parsedFilters = ZSegmentFilters.safeParse(segment.filters);
    if (!parsedFilters.success) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [segment]);

  return (
    <>
      <div className="mb-4">
        <div className="rounded-lg bg-slate-50">
          <div className="flex flex-col overflow-auto rounded-lg bg-white">
            <div className="flex w-full items-center gap-4">
              <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium text-slate-900">Title</label>
                <div className="relative flex flex-col gap-1">
                  <Input
                    value={segment.title}
                    placeholder="Ex. Power Users"
                    onChange={(e) => {
                      setSegment((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));

                      if (e.target.value) {
                        setTitleError("");
                      }
                    }}
                    className={cn("w-auto", titleError && "border border-red-500 focus:border-red-500")}
                  />

                  {titleError && (
                    <p className="absolute -bottom-1.5 right-2 bg-white text-xs text-red-500">{titleError}</p>
                  )}
                </div>
              </div>

              <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium text-slate-900">Description</label>
                <div className="relative flex flex-col gap-1">
                  <Input
                    value={segment.description ?? ""}
                    placeholder="Ex. Power Users"
                    onChange={(e) => {
                      setSegment((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                    }}
                    className={cn("w-auto")}
                  />
                </div>
              </div>
            </div>

            <label className="my-4 text-sm font-medium text-slate-900">Targeting</label>
            <div className="filter-scrollbar flex max-h-96 w-full flex-col gap-4 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
              <SegmentEditor
                environmentId={environmentId}
                segment={segment}
                setSegment={setSegment}
                group={segment.filters}
                actionClasses={actionClasses}
                attributeClasses={attributeClasses}
                segments={segments}
              />

              <div>
                <Button variant="secondary" size="sm" onClick={() => setAddFilterModalOpen(true)}>
                  Add Filter
                </Button>
              </div>

              <AddFilterModal
                onAddFilter={(filter) => {
                  handleAddFilterInGroup(filter);
                }}
                open={addFilterModalOpen}
                setOpen={setAddFilterModalOpen}
                actionClasses={actionClasses}
                attributeClasses={attributeClasses}
                segments={segments}
              />
            </div>

            <div className="flex w-full items-center justify-between pt-4">
              <Button
                type="button"
                variant="warn"
                loading={isDeletingSegment}
                onClick={() => {
                  setIsDeleteSegmentModalOpen(true);
                }}
                EndIcon={Trash2}
                endIconClassName="p-0.5">
                Delete
              </Button>
              <Button
                variant="darkCTA"
                type="submit"
                loading={isUpdatingSegment}
                onClick={() => {
                  handleUpdateSegment();
                }}
                disabled={isSaveDisabled}>
                Save Changes
              </Button>

              {isDeleteSegmentModalOpen && (
                <ConfirmDeleteSegmentModal
                  onDelete={handleDeleteSegment}
                  open={isDeleteSegmentModalOpen}
                  segment={initialSegment}
                  setOpen={setIsDeleteSegmentModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SegmentSettings;
