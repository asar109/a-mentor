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
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { formatePrice } from "@/lib/formatePrice";

const schema = z.object({
  price: z.coerce.number()
});

interface PriceFormProps {
  intialData: Course;
  courseId: string;
}

export function PriceForm({ intialData, courseId }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: intialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter()
  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Price updated");
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
          <h1 className="text-base ">Course price</h1>
          <Button onClick={toggleEditing} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                <Pencil size={16} /> <span>Edit price </span>
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isEditing ? (
            <h2 className="text-sm text-slate-600 mt-2">{intialData.price ? formatePrice(intialData.price) : "No Price"}</h2>
          ) : (
            <div className="mt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isSubmitting}
                            step="0.01"
                            type="number"
                             
                            placeholder="Price"
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
