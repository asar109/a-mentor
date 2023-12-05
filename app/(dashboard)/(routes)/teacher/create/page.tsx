"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required",
  }),
});

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const handelSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", data);
      console.log(response);

      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created successfully");
    } catch (error) {
      toast.error("Something went wrong" , {duration: 1000});
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl">Name your coures</h1>
      <p className="text-sm text-slate-600">
        What would you like to name your course? Don't worry, you can change
        this later.
      </p>
      <Form {...form}>
        <form
          className="space-y-8 mt-8"
          onSubmit={form.handleSubmit(handelSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advance web development' "
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Link href="/">
              <Button type="button" variant="ghost" className="mr-4">
                Cancel
              </Button>
            </Link>
            <Button disabled={!isValid || isSubmitting} type="submit">
              continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
