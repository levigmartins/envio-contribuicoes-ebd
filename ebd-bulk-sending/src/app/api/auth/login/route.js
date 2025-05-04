import { connectToDatabase } from "@/lib/mongodb";
import { compareSync } from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
    await connectToDatabase();

    const { user, password } = await request.json();

    try {
        const userData = await User.findOne({ user: user });

        if (!userData) return returnInvalidUserOrPassword();
        
        const passwordCompare = compareSync(password, userData.password);
        
        if (!passwordCompare) return returnInvalidUserOrPassword();

        const response = Response.json({ ok: true, id: userData._id });

        response.headers.set(
            'Set-Cookie',
            `session=${userData._id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
        );

        return response;
    } catch (err) {
        return Response.json({ error: err.message }, { status: 404 });
    }
}

function returnInvalidUserOrPassword() {
    return Response.json({ error: "Usuário e/ou Senha inválidos." }, { status: 401 });
}