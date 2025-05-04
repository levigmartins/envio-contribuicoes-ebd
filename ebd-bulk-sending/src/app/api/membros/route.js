import { connectToDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";
import Membro from "@/models/Membro";

export async function GET() {
    await connectToDatabase();

    const session = (await cookies()).get('session');
    const user_id = session?.value;

    if (!user_id) return Response.json({ error: "Usuário não autorizado." }, { status: 401 });

    const membros = await Membro.find({ user_id: user_id }).sort({ createdAt: -1 });

    return Response.json(membros);
}

export async function POST(request) {
    await connectToDatabase();
    
    const session = (await cookies()).get('session');
    const user_id = session?.value;

    if (!user_id) return Response.json({ error: "Usuário não autorizado." }, { status: 401 });

    const body = await request.json();

    try {
        const novoMembro = await Membro.create({...body, user_id });
        return Response.json(novoMembro, { status: 201 });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 400 });
    }
}