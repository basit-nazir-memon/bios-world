import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import BIOSWHomeWithCattinoFont from "./pages/Home";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "BIOS World";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }

    const link = document.createElement("link");
    link.rel = "shortcut icon";
    link.href = "/biosw-11@2x.png";
    document.head.appendChild(link);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<BIOSWHomeWithCattinoFont />} />
    </Routes>
  );
}
export default App;
