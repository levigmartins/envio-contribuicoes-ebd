'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
});

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ user: '', password: '' });
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');    

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    console.log("🚀 ~ handleSubmit ~ res:", res)

    if (!res.ok) {
      const data = await res.json();
      setErro(data.error || 'Erro ao fazer login');
    }

    router.push('/membros');
  };

  return (
    <main className={`flex flex-col justify-center items-center flex-grow px-4 bg-vermelho-icm ${roboto.className}`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <div>
          <label className="block text-sm font-medium">Usuário</label>
          <input
            type="text"
            required
            value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-vermelho-icm font-semibold border border-vermelho-icm py-2 rounded hover:bg-gray-100 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
