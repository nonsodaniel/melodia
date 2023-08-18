import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

//middleare to  avoid errors when  users access our songs for authenticated/non-auth users

export const middleWare = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });
  await supabase.auth.getSession();
  return res;
};
