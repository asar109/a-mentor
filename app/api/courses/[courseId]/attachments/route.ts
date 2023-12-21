import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const {url} = await req.json();

    


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const atttachment = await db.attachment.create({
      data: {
       url,
        name: url.split('/').pop(),
        courseId
      },
    });

    return NextResponse.json(atttachment);
  } catch (error) {
    console.log(`Course_id_attachements`);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
