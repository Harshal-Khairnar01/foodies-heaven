import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import sendEmail from "@/lib/sendMail";

export async function POST(request) {
  try {
    const { name, username, email, password } = await request.json();

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !username?.trim()
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "This email is already in use." },
          { status: 409 }
        );
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { message: "This username is already taken." },
          { status: 409 }
        );
      }
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedCode = await bcrypt.hash(verificationCode, 10);
    const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000);
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
        verificationToken: hashedCode,
        verificationExpiry: verificationExpiry,
      },
    });
    await sendEmail({
      email,
      subject: "Account Verification",
      message: `Your 4-digit verification code is: ${verificationCode}. It will expire in 15 minutes.`,
    });

    return NextResponse.json(
      { message: "A verification code has been sent to your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
