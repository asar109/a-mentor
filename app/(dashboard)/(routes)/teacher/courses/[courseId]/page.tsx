import { IconBadge } from "@/components/icon_badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks, CircleDollarSign, File } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TitleForm } from "./_components/title_form";
import { DescriptionForm } from "./_components/description_form";
import { ImageForm } from "./_components/image_form";
import { CategoryForm } from "./_components/category_form";
import { PriceForm } from "./_components/price_form";
import { AttachmentForm } from "./_components/attachement_form";

interface ParamsType {
  courseId: string;
}

const page = async ({ params }: { params: ParamsType }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include : {
      attachment : {
        orderBy : {
          createdAt : "desc"
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm intialData={course} courseId={params.courseId} />
          <DescriptionForm intialData={course} courseId={params.courseId} />
          <ImageForm intialData={course} courseId={params.courseId} />
          <CategoryForm
            intialData={course}
            courseId={params.courseId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">Course Chapters</h2>
          </div>
          <div>
            <h1>Todo : chapters</h1>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Course Price</h2>
            </div>
            <PriceForm intialData={course} courseId={params.courseId} />
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & attachments</h2>
            </div>
            <AttachmentForm intialData={course} courseId={params.courseId} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
