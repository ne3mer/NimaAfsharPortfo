import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/downloads/AfsharTOR_Masters.pdf", request.url),
    307
  );
}
