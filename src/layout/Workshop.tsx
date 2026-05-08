import Navbar from "../shared/components/Navbar"
import PinZoomPinch from "./PinZoomPinch"

export default function Workshop() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <PinZoomPinch />
    </div>
  )
}