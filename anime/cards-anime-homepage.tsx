import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const cards = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
  // "https://upload.wikimedia.org/wikipedia/commons/1/18/02_La_Lumiere_-_Grand_jeu_de_l%27Oracle_des_Dames.jpg"
];

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

export default function Deck() {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2;
      if (!active && trigger) gone.add(index);

      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0;
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0);
        const scale = active ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!active && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );

  return (
    <div
      className="container cursor-pointer"
      style={{
        cursor: `url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png") 39 39, auto`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          className="absolute w-72 h-48 will-change-transform flex items-center justify-center mr-2 top-1 bottom-0"
          key={i}
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate(
                [rot, scale],
                (r, s) =>
                  `perspective(1500px) rotateX(30deg) rotateY(${
                    r / 10
                  }deg) rotateZ(${r}deg) scale(${s})`
              ),
              backgroundImage: `url(${cards[i]})`,
              backgroundColor: "white",
              backgroundSize: "auto 87%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              width: "47vh",
              maxWidth: "300px",
              height: "85vh",
              maxHeight: "570px",
              borderRadius: "15px",
              boxShadow:
                "0 12.5px 100px -10px rgba(20, 20, 25, 0.4), 0 10px 10px -10px rgba(16, 16, 23, 0.3)",
            }}
          />
        </animated.div>
      ))}
    </div>
  );
}
