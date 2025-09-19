import React, { useEffect, useState } from "react";

export default function Home() {
  const [light, setLight] = useState(null);
  const [colors, setColors] = useState(["green", "yellow", "red"]);
  const [isCycling, setIsCycling] = useState(false);


  const handleClick = function (color) {
    setLight(function (prev) {
      return prev === color ? null : color;
    });
  };

  const startCycle = function () {
    setIsCycling(true);
  };
  const stopCycle = function () {
    setIsCycling(false);
    setLight(null); 
  };

  const togglePurple = function () {
    if (colors.includes("purple")) {
      const next = colors.filter(function (c) { return c !== "purple"; });
      setColors(next);
    } else {
      setColors([].concat(colors, "purple"));
    }
  };

  useEffect(() => {
    if (light && colors.indexOf(light) === -1) {
      setLight(null);
    }
  }, [colors, light]);

  useEffect(() => {
    if (!isCycling) return;

    const id = setInterval(() => {
      setLight(function (prev) {
        if (!prev || colors.indexOf(prev) === -1) return colors[0]; // start at first
        const i = colors.indexOf(prev);
        return colors[(i + 1) % colors.length];
      });
    }, 1500);

    return () => clearInterval(id);
  }, [isCycling, colors]);

  return (
    <div className="traffic-wrap">

      <div className="traffic-box">
        {colors.map(function (color) {
          return (
            <button
              key={color}
              className={"lamp " + color + " " + (light === color ? "on" : "")}
              onClick={function () { handleClick(color); }}
              aria-label={color + " light"}
            />
          );
        })}
      </div>

      <div className="pole" aria-hidden="true" />

      <div className="controls">
        {isCycling ? (
          <button
            onClick={stopCycle}
            className={"control-btn stop"}
            aria-pressed="true"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startCycle}
            className={"control-btn start"}
            aria-pressed="false"
          >
            Start Cycle
          </button>
        )}

        <button
          onClick={togglePurple}
          className={"control-btn " + (colors.includes("purple") ? "remove" : "add")}
        >
          {colors.includes("purple") ? "Remove Purple" : "Add Purple"}
        </button>
      </div>
    </div>
  );
}
