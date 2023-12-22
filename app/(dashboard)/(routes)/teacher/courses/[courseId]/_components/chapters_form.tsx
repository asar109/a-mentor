"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "./chapters_list";

const schema = z.object({
  title: z.string().min(3),
});

interface ChaptersFormProps {
  intialData: Course & { chapters: Chapter[] };
  courseId: string;
}

export function ChaptersForm({ intialData, courseId }: ChaptersFormProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const toggleCreating = () => setIsCreating(!isCreating);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();
  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="p-4 mt-4 bg-slate-100 border  rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-base ">Course Chapters</h1>
          <Button onClick={toggleCreating} variant={"ghost"}>
            {isCreating ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                <PlusCircle size={16} /> <span>Add a chapter </span>
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isCreating ? (
            <h2
              className={cn(
                "text-sm  text-slate-500 mt-2",
                !intialData.chapters && "italic"
              )}
            >
              {!isCreating && <h3 className="text-base">No chapters</h3>}

              <ChaptersList
                items={intialData.chapters || []}
                onEdit={() => {}}
                onReorder={() => {}}
              />

              {!isCreating && (
                <>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Drag and drop to reorder chapters
                  </p>
                </>
              )}
            </h2>
          ) : (
            <div className="mt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isSubmitting}
                            placeholder="e.g. 'Introduction to the course...' "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4">
                    <Button disabled={isSubmitting || !isValid} type="submit">
                      {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
