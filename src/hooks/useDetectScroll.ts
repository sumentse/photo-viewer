import { useCallback, useEffect, useState } from "react";

const useDetectScroll = () => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const onScroll = useCallback(
    (e: Event) => {
      setScrollTop((e.target as HTMLDocument).documentElement.scrollTop);
      setScrolling(
        (e.target as HTMLDocument).documentElement.scrollTop > scrollTop
      );
    },
    [scrollTop]
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { scrolling, scrollTop };
};

export default useDetectScroll;
