import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, verificationCode } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.verificationToken) {
      return NextResponse.json(
        { message: "Invalid email or no verification pending." },
        { status: 404 }
      );
    }

    if (new Date() > user.verificationExpiry) {
      return NextResponse.json(
        { message: "Verification code has expired." },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      user.verificationToken
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid verification code." },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during verification." },
      { status: 500 }
    );
  }
}
