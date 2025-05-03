import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400'],
});

export function Footer() {
    return (
        <footer className={`${roboto.className} bg-vermelho-icm text-white text-center p-4 font-roboto font-bold`}>
            desenvolvido por{' '}
            <a
                href="https://github.com/levigmartins"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white"
            >
                @levigmartins
            </a>
        </footer>
    );
}

