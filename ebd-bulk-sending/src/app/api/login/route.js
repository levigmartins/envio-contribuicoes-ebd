import { connectToDatabase } from "@/lib/mongodb";
import Membro from "@/models/Membro";

export async function GET() {
    await connectToDatabase();

    const membros = await Membro.find().sort({ createdAt: -1 });

    return Response.json(membros);
}

export async function POST(request) {
    await connectToDatabase();

    const body = request.json();

    try {
        const novoMembro = await Membro.create(body);
        return Response.json(novoMembro, { status: 201 });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 400 });
    }
}
