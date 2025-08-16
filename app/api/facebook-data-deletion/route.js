export async function GET(req) {
  // Facebook may call this endpoint when a user requests data deletion
  // You can extract the signed_request if needed:
  const { searchParams } = new URL(req.url);
  const signedRequest = searchParams.get("signed_request");

  // TODO: if you store user data, delete it here using signedRequest / user_id
  // For now, just return a confirmation JSON

  return new Response(
    JSON.stringify({
      url: "https://automate-sales-call-frontend.vercel.app/data-deletion-success",
      confirmation_code: "user-data-deleted"
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200
    }
  );
}
