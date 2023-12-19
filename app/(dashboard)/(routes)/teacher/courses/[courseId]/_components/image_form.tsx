"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  imageUrl: z.string().min(3, { message: "Image is required" }),
});

interface ImageFormProps {
  intialData: Course;
  courseId: string;
}

export function ImageForm({ intialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);


  const router = useRouter();
  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Image updated");
      toggleEditing();
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
          <h1 className="text-base ">Course Image</h1>
          <Button onClick={toggleEditing} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                {intialData.imageUrl ? (
                  <>
                    <Pencil size={16} /> Edit image
                  </>
                ) : (
                  <>
                    <Plus
                      className="h-4 w-4 rounded-full border border-black"
                      size={16}
                    />{" "}
                    Add an image
                  </>
                )}
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isEditing ? (
            <h2
              className={cn(
                "text-sm  text-slate-500 mt-2",
                !intialData.imageUrl && "italic"
              )}
            >
              {intialData.imageUrl ? (
                <div className="relative aspect-video mt-2">
                  <Image
                  alt="course image"
                    src={intialData.imageUrl}
                    fill
                  
                    className="object-cover rounded-md"
                  />
                 
                </div>
              ) : (
                <div className="h-60 w-full rounded bg-slate-200 flex justify-center items-center">
                  <ImageIcon className="h-10 w-10 mx-auto" />
                </div>
              )}
            </h2>
          ) : (
            <>
              <div className="h-64 ">
                <FileUpload
                  endpoint="courseImage"
                  onChange={(url) => {
                    if (url) {
                      submitHandler({ imageUrl: url });
                    }
                  }}
                />
              </div>
              <p className="ml-2 text-xs text-muted-foreground">16:9 aspect ratio recommended</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
