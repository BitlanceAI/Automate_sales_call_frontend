import { dbAdmin } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new Response(
        JSON.stringify({ message: "Invalid email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const newsletterRef = dbAdmin.ref("newsletterSubscribers");

    // Check for existing email
    const snapshot = await newsletterRef
      .orderByChild("email")
      .equalTo(normalizedEmail)
      .get();

    if (snapshot.exists()) {
      return new Response(
        JSON.stringify({ message: "This email is already subscribed." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add new email
    await newsletterRef.push({
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "You have subscribed to our newsletter!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
