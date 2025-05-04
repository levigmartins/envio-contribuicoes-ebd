export async function POST() {
    const response = Response.json({ success: true });

    response.headers.set(
      'Set-Cookie',
      'session=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict'
    );

    return response;
}