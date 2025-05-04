import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await connectToDatabase();

    const body = await request.json();
    
    const newPassword = await generateHashPassword(body.password);

    try {
        const newUser = await User.updateOne({ user: body.user }, { password: newPassword });
        return Response.json(newUser, { status: 201 });
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message, errorBody: JSON.stringify(err) }, { status: 400 });
    }
}

function generateHashPassword(password) {
    return bcrypt.hash(password, 10);
}


