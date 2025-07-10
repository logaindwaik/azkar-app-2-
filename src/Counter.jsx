/*{
  numoftries = 100,
  backcolor = "blue",
  title = "GoodJob",
}*/
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useState } from "react";
const Counter = (props) => {
  const title = props.title !== undefined ? props.title : "Good Job";
  const numoftries = props.numoftries !== undefined ? props.numoftries : 100;
  const backcolor = props.backcolor !== undefined ? props.backcolor : "green";

  const [counter, setCounter] = useState(numoftries);
  const [color, setColor] = useState(backcolor);

  useEffect(() => {
    // console.log(backcolor);
    setColor(backcolor);
  }, [backcolor]);
  return (
    <div
      onMouseOut={() => setColor(backcolor)}
      onMouseOver={() => setColor("red")}
      onClick={() => setCounter(counter - 1)}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: color,
        padding: "30px",
        color: "white",
        fontSize: "2rem",
        fontWeight: "bold",
        margin: "16px",
        border: "3px solid #ddd",
        borderRadius: "20px",
        width: "200px",
        height: "200px",
        justifyContent: "space-around",
        gap: "10px",
      }}
    >
      <div> {title}</div>
      <div>{counter}</div>
      <div> {numoftries}</div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          setCounter(numoftries);
        }}
      >
        <i className="fa fa-refresh"></i>
      </div>
    </div>
  );
};
export default Counter;
