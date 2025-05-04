import { NextResponse } from "next/server";

export function middleware(request) {
    const session = request.cookies.get('session');
    const logged = session?.value;

    const apiRoute = request.nextUrl.pathname.startsWith('/api');
    const publicRoute = 
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/api/auth') ||
        request.nextUrl.pathname.startsWith('/api/users/register');

    if (!logged && !publicRoute) {
        if (!apiRoute) return NextResponse.redirect(new URL('/login', request.url));

        return new Response(JSON.stringify({ error: 'Usuário não autorizado.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api/auth|login|_next|favicon.ico).*)'],
};