import {useEffect, useState} from "react";

function useResponsive(size1, size2) {
  const [dimension, setDimension] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setDimension(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return _ => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (size2) return dimension >= size1 && dimension < size2;
  return dimension >= size1;
}

export default useResponsive;
