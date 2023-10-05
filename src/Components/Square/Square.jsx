import { useEffect, useState } from "react";
import "./Square.scss";

function Square({
  id,
  currentPlayer,
  setPlayer,
  disabled,
  reset,
  strike,
  validSquares,
}) {
  const [playerAssigned, setPlayerAssigned] = useState("");

  const assignPlayer = () => {
    setPlayerAssigned(currentPlayer);
    setPlayer(id);
  };

  useEffect(() => {
    if (reset) {
      setPlayerAssigned("");
    }
  }, [reset]);

  return (
    <span
      className="square"
      onClick={!playerAssigned && !disabled ? assignPlayer : null}
    >
      {validSquares.includes(id) && (
        <>
          {strike === "horizontal" && (
            <span className="horizontal-check"> _ </span>
          )}
          {strike === "vertical" && <span className="vertical-check"> |</span>}
          {strike === "left-diagonal" && (
            <span className="left-strike-check"> \ </span>
          )}
          {strike === "right-diagonal" && (
            <span className="right-strike-check"> / </span>
          )}
        </>
      )}
      <span className="value">{playerAssigned}</span>
    </span>
  );
}

export default Square;
