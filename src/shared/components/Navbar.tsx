import { useState, useEffect } from "react"
import Button from "./Button"
import { motion } from "motion/react"
import { AvatarCircle, SettingsCog2 } from 'pixelarticons/react'
import logoLineSketch from "../../assets/logo-line-Sketch.svg"
import { useNavigate, useLocation, Link } from "react-router"

const NAV_ITEMS = [
  { label: "FILE", path: "/createfile" },
  { label: "EDIT", path: "/" },
  { label: "VIEW", path: "/" }
] as const


export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<string>("FILE")

  useEffect(() => {
    const currentItem = NAV_ITEMS.find(item => item.path === location.pathname)
    if (currentItem) {
      setActiveTab(currentItem.label)
    }
  }, [location.pathname])

  return (
    <nav className="border-b border-white/10 bg-[#0b0b0b] px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logoLineSketch} alt="SketchShop" />
          </Link>

          <div className="flex items-center gap-3.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.label

              return (
                <div className="relative" key={item.label}>
                  <Button
                    variant="ghost"
                    className={`rounded-none text-sm tracking-[0.12em] ${isActive ? "font-semibold text-white" : "text-gray-300"}`}
                    onClick={() => navigate(item.path)}
                    aria-pressed={isActive}
                  >
                    {item.label}
                  </Button>

                  {isActive ? (
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.75 w-full bg-violet-500"
                      layoutId="active-nav-border"
                      transition={{ type: "spring", stiffness: 450, damping: 38 }}
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <AvatarCircle width={24} className="text-violet-500" />
          <SettingsCog2 width={24} className="text-gray-300" />
        </div>
      </div>
    </nav>
  )
}