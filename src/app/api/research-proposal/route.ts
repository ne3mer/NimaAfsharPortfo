import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/downloads/Research_Proposal_Securing_the_Glass_House.pdf", request.url),
    307
  );
}
