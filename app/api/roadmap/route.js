import { db1 } from "@/lib/firebase"; // adjust as needed
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET(request) {
  try {
    const roadmapRef = collection(db1, "roadmap");
    const q = query(roadmapRef, orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    const roadmap = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ roadmap }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch roadmap data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
