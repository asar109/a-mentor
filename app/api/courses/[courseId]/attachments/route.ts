import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    {
        params
    } : {
        params : {courseId : string}
    }
){
    try {
        const { userId } = auth();
        const { courseId } = params;
        const url = await req.json();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        
    } catch (error) {
        console.log(`Course_id_attachements`)

        return new NextResponse('Something went wrong' , {
            status  : 500
        })
        
    }

}