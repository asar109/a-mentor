import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes : ['/test']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 