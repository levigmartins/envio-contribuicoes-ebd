import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
});

export function Header() {
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
        <Link
          href="/logout"
          className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}
