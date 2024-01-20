import "./reset.css";
import MarketList from "./components/MarketList";
import { Header } from "./components/Header";
import style from "./style.module.css";

function App() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <h1 className={style.title}>Assets</h1>
        <p className={style.subtitle}>
          Buy Bitcoin, Ethereum, and 200 other digital assets instantly with
          Euros.
        </p>
      </div>
      <MarketList />
    </>
  );
}

export default App;
