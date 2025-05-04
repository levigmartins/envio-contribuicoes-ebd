import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await connectToDatabase();

    const body = await request.json();
    
    const userBody = {
        user: body.user,
        password: await generateHashPassword(body.password)
    };

    try {
        const newUser = await User.create(userBody);
        return Response.json(newUser, { status: 201 });
    } catch (err) {
        if (err.code === 11000) {
            return Response.json({ 
                code: err.code,
                message: `Usuário "${body.user}" já existe.`
            }, {
                status: 400 
            });
        }
        return Response.json({ error: err.message, code: err.code }, { status: 400 });
    }
}

function generateHashPassword(password) {
    return bcrypt.hash(password, 10);
}


