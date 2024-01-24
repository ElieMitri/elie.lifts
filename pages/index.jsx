import About from "./components/About"
import Introduction from "./components/Introduction"
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <Introduction />
      <About />
    </>
  )
}
