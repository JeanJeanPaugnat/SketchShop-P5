import Navbar from "../components/Navbar"
import Canvas from "../components/Canvas"
import PinZoomPinch from "../components/PinZoomPinch"

export default function Workshop() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <PinZoomPinch />

      {/* <Canvas /> */}
    </div>
  )
}