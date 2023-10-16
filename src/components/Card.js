import "../index.css";

function Card({ item, id, handleClick, bgImage, bgWidth, bgHeight }) {
  const itemClass = item.stat ? " active " + item.stat : "";
  const cardStyle = {
    backgroundImage: `url(${bgImage || "/default-bg-image.jpg"})`,
    backgroundSize: `${bgWidth || "100%"} ${bgHeight || "100%"}`,
  };

  return (
    <>
      <div
        className={"card border-0" + itemClass}
        style={cardStyle}
        onClick={() => handleClick(id)}
      >
        <img src={item.img} alt="" />
      </div>
    </>
  );
}

export default Card;
