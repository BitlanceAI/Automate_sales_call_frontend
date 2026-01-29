// app/api/start-call/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const res = await fetch('https://automate-sales-call-deploy.onrender.com/outbound-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }), // Assuming your backend expects this
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: "Failed to trigger call" }, { status: 500 });
  }
}