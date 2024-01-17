import { useEffect, useState } from "react";

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([item]) => {
      setIsIntersecting(item.isIntersecting);
    });

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return [isIntersecting, setElementRef];
};

export default useIntersectionObserver;
