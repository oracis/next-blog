import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface CountdownProps {
  time: number;
  onEnd: Function;
}

const Countdown = (props: CountdownProps) => {
  const { time, onEnd } = props;
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    const timer = setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            clearInterval(timer);
            onEnd && onEnd();
          }
          return count - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd]);
  return <div className={styles.countdown}>{count}</div>;
};

export default Countdown;
