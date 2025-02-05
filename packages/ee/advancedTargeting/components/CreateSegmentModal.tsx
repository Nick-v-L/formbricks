"use client";

import { UserGroupIcon } from "@heroicons/react/20/solid";
import { FilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@formbricks/lib/cn";
import { TActionClass } from "@formbricks/types/actionClasses";
import { TAttributeClass } from "@formbricks/types/attributeClasses";
import { TBaseFilter, TSegment } from "@formbricks/types/segment";
import { Button } from "@formbricks/ui/Button";
import { Input } from "@formbricks/ui/Input";
import { Modal } from "@formbricks/ui/Modal";

import { createSegmentAction } from "../lib/actions";
import AddFilterModal from "./AddFilterModal";
import SegmentFilters from "./SegmentEditor";

type TCreateSegmentModalProps = {
  environmentId: string;
  segments: TSegment[];
  attributeClasses: TAttributeClass[];
  actionClasses: TActionClass[];
};
const CreateSegmentModal = ({
  environmentId,
  actionClasses,
  attributeClasses,
  segments,
}: TCreateSegmentModalProps) => {
  const router = useRouter();
  const initialSegmentState = {
    title: "",
    description: "",
    isPrivate: false,
    filters: [],
    environmentId,
    id: "",
    surveys: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [open, setOpen] = useState(false);
  const [addFilterModalOpen, setAddFilterModalOpen] = useState(false);
  const [segment, setSegment] = useState<TSegment>(initialSegmentState);
  const [isCreatingSegment, setIsCreatingSegment] = useState(false);

  const [titleError, setTitleError] = useState("");

  const handleResetState = () => {
    setSegment(initialSegmentState);
    setTitleError("");
    setOpen(false);
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

  const handleCreateSegment = async () => {
    if (!segment.title) {
      setTitleError("Title is required");
      return;
    }

    try {
      setIsCreatingSegment(true);
      await createSegmentAction({
        title: segment.title,
        description: segment.description ?? "",
        isPrivate: segment.isPrivate,
        filters: segment.filters,
        environmentId,
        surveyId: "",
      });

      setIsCreatingSegment(false);
      toast.success("Segment created successfully!");
    } catch (err: any) {
      toast.error(`${err.message}`);
      setIsCreatingSegment(false);
      return;
    }

    handleResetState();
    setIsCreatingSegment(false);
    router.refresh();
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button variant="darkCTA" onClick={() => setOpen(true)}>
          Create Segment
        </Button>
      </div>

      <Modal
        open={open}
        setOpen={() => {
          handleResetState();
        }}
        noPadding
        closeOnOutsideClick={false}
        className="md:w-full"
        size="lg">
        <div className="rounded-lg bg-slate-50">
          <div className="rounded-t-lg bg-slate-100">
            <div className="flex w-full items-center gap-4 p-6">
              <div className="flex items-center space-x-2">
                <div className="mr-1.5 h-6 w-6 text-slate-500">
                  <UserGroupIcon />
                </div>
                <div>
                  <h3 className="text-base font-medium">Create Segment</h3>
                  <p className="text-sm text-slate-600">
                    Segments help you target the users with the same characteristics easily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-auto rounded-lg bg-white p-6">
            <div className="flex w-full items-center gap-4">
              <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium text-slate-900">Title</label>
                <div className="relative flex flex-col gap-1">
                  <Input
                    placeholder="Ex. Power Users"
                    onChange={(e) => {
                      setSegment((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }}
                    className={cn(titleError && "border border-red-500 focus:border-red-500")}
                  />

                  {titleError && (
                    <p className="absolute right-1 bg-white text-xs text-red-500" style={{ top: "-8px" }}>
                      {titleError}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium text-slate-900">Description</label>
                <Input
                  placeholder="Ex. Fully activated recurring users"
                  onChange={(e) => {
                    setSegment((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <label className="my-4 text-sm font-medium text-slate-900">Targeting</label>
            <div className="filter-scrollbar flex w-full flex-col gap-4 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
              {segment?.filters?.length === 0 && (
                <div className="-mb-2 flex items-center gap-1">
                  <FilterIcon className="h-5 w-5 text-slate-700" />
                  <h3 className="text-sm font-medium text-slate-700">Add your first filter to get started</h3>
                </div>
              )}

              <SegmentFilters
                environmentId={environmentId}
                segment={segment}
                setSegment={setSegment}
                group={segment.filters}
                actionClasses={actionClasses}
                attributeClasses={attributeClasses}
                segments={segments}
              />

              <Button
                className="w-fit"
                variant="secondary"
                size="sm"
                onClick={() => setAddFilterModalOpen(true)}>
                Add Filter
              </Button>

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

            <div className="flex justify-end pt-4">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="minimal"
                  onClick={() => {
                    handleResetState();
                  }}>
                  Cancel
                </Button>
                <Button
                  variant="darkCTA"
                  type="submit"
                  loading={isCreatingSegment}
                  onClick={() => {
                    handleCreateSegment();
                  }}>
                  Create Segment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateSegmentModal;
