import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes : ['/test' , '/api/courses']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 