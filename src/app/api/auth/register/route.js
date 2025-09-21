import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

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
      message: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .header h1 {
            color: #333333;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .code {
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            color: #d9534f;
            background-color: #f9f9f9;
            padding: 15px 25px;
            border-radius: 5px;
            border: 1px dashed #dddddd;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Verification</h1>
        </div>
        <div class="content">
            <p>Thank you for signing up. Please use the following 4-digit verification code to complete your registration:</p>
            <div class="code">${verificationCode}</div>
            <p>This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; Foodies Heaven. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
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
