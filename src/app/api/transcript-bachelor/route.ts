import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/downloads/Transcript_Bachelor.zip", request.url),
    307
  );
}
