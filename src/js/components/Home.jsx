import React, { useState } from "react";

export default function Home() {
  const [light, setLight] = useState(null); 
  return (
    <div className="traffic-wrap">
      <div className="traffic-box">
        <button
          className={
            "lamp red " + (light === "red" ? "on" : "")
          }
          onClick={() => setLight("red")}
          aria-label="Red light"
        />
        <button
          className={
            "lamp yellow " + (light === "yellow" ? "on" : "")
          }
          onClick={() => setLight("yellow")}
          aria-label="Yellow light"
        />
        <button
          className={
            "lamp green " + (light === "green" ? "on" : "")
          }
          onClick={() => setLight("green")}
          aria-label="Green light"
        />
      </div>
      <div className="pole" aria-hidden="true" />
    </div>
  );
}
