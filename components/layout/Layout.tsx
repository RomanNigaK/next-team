import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      kke;welfsdl;
    </>
  );
}

const Links = styled.div`
  display: flex;
  border-top: 1px solid black;
  height: 30px;
  align-items: center;
  & div {
    margin-right: 10px;
  }
`;

function Header() {
  return (
    <>
      <header>
        <div id="container">
          <nav>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
            <div>
              <h3>Next-team</h3>
              <Links>
                <div>
                  <a>
                    <Link href="/">Главная</Link>
                  </a>
                </div>
                <div>
                  <a>
                    <Link href="/msg/">Сообщения</Link>
                  </a>
                </div>
                <div>
                  <a>
                    <Link href="/number">Ввод чисел</Link>
                  </a>
                </div>
                <div>
                  <a>
                    <Link href="/">Git</Link>
                  </a>
                </div>
              </Links>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
