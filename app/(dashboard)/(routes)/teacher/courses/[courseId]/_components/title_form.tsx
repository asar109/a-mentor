"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
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

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
});

interface TitleFormProps {
  intialData: { title: string };
  courseId: string;
}



export function TitleForm({ intialData, courseId }: TitleFormProps) {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: intialData,
  });



  const { isSubmitting, isValid } = form.formState;



  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
     const {data} = await axios.patch(`/api/courses/${courseId}`,values )
     console.log(data)
      toast.success('Course title updated')
      toggleEditing()

    } catch (error) {
     toast.error('Something went wrong')
     
    }
   };




  return (
    <>
      <div className="p-4 mt-4 bg-slate-100 border  rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-base ">Course Title</h1>
          <Button onClick={toggleEditing} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                <Pencil size={16} /> <span>Edit Title </span>
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isEditing ? (
            <h2 className="text-sm text-slate-600 mt-2">{intialData.title}</h2>
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
                            placeholder="e.g. 'Advance web development' "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <div className="mt-4">
                 <Button disabled={isSubmitting} type="submit">
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
