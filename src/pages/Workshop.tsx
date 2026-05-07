import Navbar from "../components/Navbar"
import PinZoomPinch from "../components/PinZoomPinch"
import ContextualBar from "../components/ContextualBar"

export default function Workshop() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <PinZoomPinch />

      {/* <Canvas /> */}
    </div>
  )
}