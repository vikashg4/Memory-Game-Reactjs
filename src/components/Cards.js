import React, { useState, useEffect } from "react";
import Card from "./Card";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Cards() {
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [matches, setMatches] = useState(0);
  const [chances, setChances] = useState(2);
  const [itemClasses, setItemClasses] = useState("test");
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState("");

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds < 1) {
      setOpen(true);
      setMessage("Time Up!");
    }
  }, [seconds]);
  useEffect(() => {
    localStorage.setItem("chances", JSON.stringify(chances));
    localStorage.setItem("level", JSON.stringify(level));
  }, [chances, level]);

  const levelsData = [
    [
      { id: 15, img: "/img/html.png", stat: "" },
      { id: 15, img: "/img/html.png", stat: "" },
      { id: 16, img: "/img/css.png", stat: "" },
      { id: 16, img: "/img/css.png", stat: "" },
      { id: 17, img: "/img/js.png", stat: "" },
      { id: 17, img: "/img/js.png", stat: "" },
      { id: 18, img: "/img/scss.png", stat: "" },
      { id: 18, img: "/img/scss.png", stat: "" },
      { id: 19, img: "/img/react.png", stat: "" },
      { id: 19, img: "/img/react.png", stat: "" },
      { id: 20, img: "/img/vue.png", stat: "" },
      { id: 20, img: "/img/vue.png", stat: "" },
    ],
    [
      { id: 7, img: "/img/ben10.jpg", stat: "" },
      { id: 7, img: "/img/ben10.jpg", stat: "" },
      { id: 8, img: "/img/pokemon.jpg", stat: "" },
      { id: 8, img: "/img/pokemon.jpg", stat: "" },
      { id: 9, img: "/img/girl.jpg", stat: "" },
      { id: 9, img: "/img/girl.jpg", stat: "" },
      { id: 10, img: "/img/bear.jpg", stat: "" },
      { id: 10, img: "/img/bear.jpg", stat: "" },
      { id: 11, img: "/img/mickymouse.jpg", stat: "" },
      { id: 11, img: "/img/mickymouse.jpg", stat: "" },
      { id: 12, img: "/img/frog.jpg", stat: "" },
      { id: 12, img: "/img/frog.jpg", stat: "" },
      { id: 13, img: "/img/fish.jpg", stat: "" },
      { id: 13, img: "/img/fish.jpg", stat: "" },
      { id: 14, img: "/img/monkey.jpg", stat: "" },
      { id: 14, img: "/img/monkey.jpg", stat: "" },
    ],
  ];

  useEffect(() => {
    setItems(levelsData[level - 1].sort(() => Math.random() - 0.5));
    setItemClasses("test");
    const timeout = setTimeout(() => {
      setItemClasses("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [level]);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setMatches(matches + 1);
      setItems([...items]);
      setPrev(-1);

      if (matches + 1 === levelsData[level - 1].length / 2) {
        if (level < levelsData.length) {
          setMessage(`Congratulations! ${getLevelName(level)} completed.`);
          setOpen(true);
        } else {
          localStorage.setItem("win", true);
          setReset(true);
        }
      }
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);

      setChances(chances - 1);
      if (chances === 1) {
        setMessage(`You lose the game. Let's Play again`);
        setOpen(true);
      } else {
        setTimeout(() => {
          items[current].stat = "";
          items[prev].stat = "";
          setItems([...items]);
          setPrev(-1);
        }, 1000);
      }
    }
  }

  function handleClick(id) {
    if (prev === -1 && chances > 0) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  function getLevelName(level) {
    return `Level ${level}`;
  }

  return (
    <>
      {!reset && (
        <div className="d-flex justify-content-between">
          <div className="level-name"> Level : {level}</div>
          <div className="level-name"> Time : {seconds}</div>
        </div>
      )}
      <div className={!reset && "container"}>
        {!reset ? (
          items.map((item, index) => {
            const itemClass =
              item.stat !== ""
                ? "active" + item.stat
                : itemClasses === "test"
                ? itemClasses
                : "";
            {
              console.log(item);
            }
            return (
              <Card
                key={index}
                item={item}
                id={index}
                handleClick={handleClick}
                bgImage={itemClass === "" && "/img/girl.gif"}
              />
            );
          })
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 style={{ color: "white" }}>
                Congratulations you have finished all the levels
              </h1>
              <button
                type="button"
                class="restartbtn"
                onClick={() => {
                  setReset(false);
                  setLevel(1);
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Restart
              </button>
            </div>
          </>
        )}

        {!reset && <div className="chances">Chances Left : {chances}</div>}
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => {
            if (message.includes("lose") || message.includes("Time")) {
              setOpen(false);
              window.location.reload();
            }
            setOpen(false);
            setSeconds(90);
            setLevel(level + 1);
            setMatches(0);
            setChances(3);
          }}
          center
          closeOnOverlayClick={false}
          style={{ borderRadius: "20px" }}
          animationDuration={800}
        >
          {message.includes("Time") ? (
            <>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src="/img/giphy.gif"
                  style={{ height: "50%", width: "50%", objectFit: "cover" }}
                />
              </div>
            </>
          ) : (
            <p style={{ padding: "50px" }}>{message}</p>
          )}
          <button
            type="button"
            class="button"
            onClick={() => {
              if (message.includes("lose") || message.includes("Time")) {
                setOpen(false);
                window.location.reload();
              }
              setItems([]);
              setSeconds(90);
              setOpen(false);
              setLevel(2);
              setMatches(0);
              setChances(level === 1 ? 3 : 2);
            }}
          >
            {message.includes("lose") || message.includes("Time")
              ? "Restart"
              : "Level 2"}
          </button>
        </Modal>
      )}
    </>
  );
}

export default Cards;
