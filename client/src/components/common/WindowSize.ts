import { useEffect, useState } from "react";
// import { useBreakpointValue } from "@chakra-ui/react";

function WindowSize({ screenWidth }: { screenWidth: number }) {
  // const smallScreen = useBreakpointValue({ sm: true, md: false });
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () =>
      setIsSmallScreen(window.innerWidth < screenWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    console.log(isSmallScreen);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen, screenWidth]);

  return isSmallScreen;
}

export default WindowSize;
