import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes : ['/test' , '/api/uploadthing']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 