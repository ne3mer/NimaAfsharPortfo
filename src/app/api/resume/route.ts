import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/downloads/Mohammad_Afsharfar_CV.pdf", request.url),
    307
  );
}

