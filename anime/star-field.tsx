import React from "react";
import { useSpring, animated } from "react-spring";

const StarField = () => {
  const blinkingProps = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0.8 },
    loop: true,
    config: { duration: 100 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(to bottom, #020107 0%, #201b46 100%)",
      }}
    >
      {Array.from({ length: 200 }).map((_, index) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;

        return (
          <animated.div
            key={index}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: `${x}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: "#FFF",
              opacity: blinkingProps.opacity,
              boxShadow: "0 0 10px #FFF",
            }}
          />
        );
      })}
    </div>
  );
};

export default StarField;
