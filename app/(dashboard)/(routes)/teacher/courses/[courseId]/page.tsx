import { IconBadge } from "@/components/icon_badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

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
                    <h2 className="text-xl">
                        Customize your course 
                    </h2>

                </div>
            </div>

        </div>
    </div>
  );
};

export default page;
