import About from "./components/About"
import Introduction from "./components/Introduction"
import Quote from "./components/Quote"
import Footer from "./components/Footer"
import Rating from "./components/Rating"
import { useRef } from "react"

export default function Home() {
  const about = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    })
  }

  return (
    <>
      <Introduction scrollToSection={scrollToSection} about={about}/>
      <About about={about}/>
      <Rating />
      <Quote /> 
      <Footer scrollToSection={scrollToSection} about={about}/>
    </>
  )
}
