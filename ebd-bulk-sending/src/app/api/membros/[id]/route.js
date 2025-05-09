import { connectToDatabase } from "@/lib/mongodb";
import Membro from "@/models/Membro";


export async function PUT(request, { params }) {
    await connectToDatabase();

    const body = await request.json();
    const { id } = await params;

    try {
        const response = await Membro.updateOne({ _id: id }, body);
        return Response.json(response, { status: 200 });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await connectToDatabase();

    const { id } = await params;

    try {
        const response = await Membro.deleteOne({ _id: id });
        return Response.json(response, { status: 200 });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 400 });
    }
}