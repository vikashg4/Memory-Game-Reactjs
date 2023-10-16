import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import ParticlesBg from "particles-bg";
import Confetti from "react-confetti";

function App() {
  const [width, setWidth] = useState(window?.innerWidth);
  const [height, setHeight] = useState(window?.innerHeight);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setHeight(newHeight);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  const [win, setWin] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const toggle = localStorage.getItem("win");
      setWin(toggle === "true" ? true : false);
    }, 1000);
  });

  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-50, 50],
    alpha: [0.6, 0],
    scale: [0.1, 0.9],
    // body: icon,
    position: "all",
    //color: ["random", "#ff0000"],
    cross: "dead",
    random: 10,
  };

  return (
    <>
      <ParticlesBg type="custom" config={config} bg={true} />
      <div className="App">
        <h1 style={{ color: "#fff" }}>Memory Game</h1>
        {win ? <Confetti /> : null}

        <Cards />
      </div>
    </>
  );
}

export default App;
