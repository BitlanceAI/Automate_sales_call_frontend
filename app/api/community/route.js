export async function GET() {
  const members = [
    {
      id: 1,
      name: "John Doe",
      bio: "Blockchain developer and Bitlance contributor.",
      image: "https://ui-avatars.com/api/?name=John+Doe&format=png"
    },
    {
      id: 2,
      name: "Jane Smith",
      bio: "Marketing strategist and community builder.",
      image: "https://ui-avatars.com/api/?name=Jane+Smith&format=png"
    },
    {
      id: 3,
      name: "Michael Lee",
      bio: "Web3 enthusiast and frontend developer.",
      image: "https://ui-avatars.com/api/?name=Michael+Lee&format=png"
    }
  ];

  return new Response(JSON.stringify(members), {
    headers: { "Content-Type": "application/json" }
  });
}
