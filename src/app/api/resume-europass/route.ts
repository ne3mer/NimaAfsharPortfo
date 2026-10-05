import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/downloads/Mohammad_Afsharfar_cv_europass.pdf", request.url),
    307
  );
}
