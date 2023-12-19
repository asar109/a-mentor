"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
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
import { Course } from "@prisma/client";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Course must be at least 3 characters long" }),
});

interface DescriptionFormProps {
  intialData: Course;
  courseId: string;
}

export function DescriptionForm({ intialData, courseId }: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: intialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter()
  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated");
      toggleEditing();
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="p-4 mt-4 bg-slate-100 border  rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-base ">Course Description</h1>
          <Button onClick={toggleEditing} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                <Pencil size={16} /> <span>Edit description </span>
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isEditing ? (
            <h2 className={cn('text-sm  text-slate-500 mt-2' , !intialData.description  && 'italic' )}>{intialData.description || 'No description'}</h2>
          ) : (
            <div className="mt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={isSubmitting}
                            placeholder="e.g. 'Course is about...' "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4">
                    <Button disabled={isSubmitting || !isValid} type="submit">
                      {isSubmitting ? "Saving..." : "Save"}
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
