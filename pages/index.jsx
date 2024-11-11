import About from "./components/About";
import Introduction from "./components/Introduction";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import Rating from "./components/Rating";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
import Transformation from "./components/Transformation";
import Journey from "./components/Journey";

export default function Home() {
  const about = useRef(null);
  const router = useRouter();

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Introduction scrollToSection={scrollToSection} about={about} />
      <About about={about} />
      <Transformation />
      <Journey />
      {/* <Rating /> */}
      {/* <Quote />  */}
      <Footer scrollToSection={scrollToSection} about={about} />
      <a className="chatWrapper" href="https://wa.me/81107752" target="_blank">
        <FaWhatsapp className="chat" />
      </a>
    </div>
  );
}
