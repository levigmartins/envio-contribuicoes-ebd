'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
});

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const hideHeader = pathname === '/login';

  if (hideHeader) return null;

  const handleLogout = async () => {
    const confirmLogout = confirm('Tem certeza que deseja sair?');
    if (!confirmLogout) return;

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      router.push('/login');
    } catch (err) {
      alert('Erro ao fazer logout');
    }
  };

  return (
    <header className={`${roboto.className} bg-vermelho-icm text-white flex items-center justify-between px-6 py-4`}>
      <h1 className="text-xl font-bold">Contribuição em Massa EBD</h1>
      <nav className="flex gap-4">
        <Link
          href="/enviar"
          className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Enviar Contribuição
        </Link>
        <Link
          href="/membros"
          className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Membros
        </Link>
        <button
          onClick={handleLogout}
          className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}