import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import stylelayout from "../../styles/layout.module.css";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div id="container">
        <nav>
          <Image src="/Logo.png" alt="Logo" width={100} height={100} priority />
          <div>
            <h3>Next-team</h3>
            <div className={stylelayout.links}>
              <div>
                <Link href="/">Главная</Link>
              </div>
              <div>
                <Link href="/msg/">Сообщения</Link>
              </div>
              <div>
                <Link href="/number">Ввод чисел</Link>
              </div>
              <div>
                <Link
                  href="https://github.com/RomanNigaK/next-team"
                  target="_blank"
                >
                  Git
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <Image src="/Logo.png" alt="Logo" width={50} height={50} priority />
        Next-team — команда специалистов области интернет-маркетинга.
      </div>
    </footer>
  );
}
