"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  url: z.string().min(1),
});

interface AttachmentFormProps {
  intialData: Course & { attachment: Attachment[] };
  courseId: string;
}

export function AttachmentForm({ intialData, courseId }: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteId , setDeleteId] = useState<string | null>(null);

  const toggleEditing = () => setIsEditing(!isEditing);

  const router = useRouter();
  const submitHandler = async (values: z.infer<typeof schema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  const deleteHandler = async (id : string)=> {
    try {
      setDeleteId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
      setDeleteId(null);
    } catch (error) {
      setDeleteId(null);
      console.log(error);
      toast.error("Something went wrong");
    }
  }



  return (
    <>
      <div className="p-4 mt-4 bg-slate-100 border  rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-base ">Course attachment</h1>
          <Button onClick={toggleEditing} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                {
                  <>
                    <Plus
                      className="h-4 w-4 rounded-full border border-black"
                      size={16}
                    />{" "}
                    Add a file
                  </>
                }
              </div>
            )}
          </Button>
        </div>

        <div>
          {!isEditing ? (
            <h2
              className={cn(
                "text-sm  text-slate-500 mt-2",
                !intialData.attachment && "italic"
              )}
            >
              {intialData.attachment.length === 0 ? (
                "No attachment added"
              ) : (
                <>
                  <div className="bg-sky-200 p-2">
                    {intialData.attachment.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center mb-1 gap-x-2"
                      >
                        <File className="h-4 w-4" />
                        <a
                          href={attachment.url}
                          className="text-sm line-clamp-1 text-sky-700 hover:underline "
                        >
                          {attachment.name}
                        </a>
                        {
                          deleteId === attachment.id ? (<>
                          
                          <Loader2 className="h-4 w-4  animate-spin " />
                          
                          </>): (<>
                          
                           <button onClick={()=>deleteHandler(attachment.id)} >
                           <div className="ml-auto m-1 ">
                        <X className="w-4 h-4 hover:cursor-pointer" />
                        </div>
                           </button>
                          </>)
                        }
                      </div>
                    ))}
                  </div>
                </>
              )}
            </h2>
          ) : (
            <>
              <div className="h-64  ">
                <FileUpload
                  endpoint="courseAttachment"
                  onChange={(url) => {
                    if (url) {
                      submitHandler({ url });
                    }
                  }}
                />
              </div>
              <p className="ml-2 text-xs text-muted-foreground">
                Add anything that will help students learn your course
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
