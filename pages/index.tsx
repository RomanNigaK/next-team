import styleindex from "../styles/Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={styleindex.mainindex}>
        <div style={{ width: "1224px" }}>
          <div className={styleindex.gradient}>
            <h2>Сообщения</h2>
          </div>
          <div className={styleindex.gradient180}>
            <h2>Ввод чисел</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
