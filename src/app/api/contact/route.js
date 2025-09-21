import sendEmail from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!phone || !phoneRegex.test(phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed.", errors },
        { status: 400 }
      );
    }

    await sendEmail({
      email: process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      message: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
    });

    await sendEmail({
      email,
      subject: "Thanks for Your Message!",
      message: `
            <h3>Hi ${name},</h3>
            <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br/>The Support Team</p>
        `,
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API POST error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method not supported for this route." },
    { status: 405 }
  );
}
