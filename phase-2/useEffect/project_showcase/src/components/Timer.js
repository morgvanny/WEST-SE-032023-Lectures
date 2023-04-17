import { useEffect } from "react";

export default function Timer({ num, setNum }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval function running");
      setNum((num) => num + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{num}</div>;
}
