import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; attachmentId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachmentDelete = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    //  For deleting the file from database (Uploadthing)

    await utapi.deleteFiles([`${attachmentDelete.name}`]);

    return NextResponse.json(attachmentDelete);
  } catch (error) {
    console.log(`attachment_id`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
