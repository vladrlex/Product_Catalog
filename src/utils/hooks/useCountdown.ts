import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const navigate = useNavigate();

  useEffect(() => {
    function tick() {
      setRemaining(current => current - 1);
    }

    const countdown = setInterval(tick, 1000);

    if (remaining === 0) {
      clearInterval(countdown);
      navigate(-1);
    }

    return () => clearInterval(countdown);
  }, [remaining]);

  return remaining;
}