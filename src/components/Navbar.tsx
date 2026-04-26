import Button from "./ui/Button"

import { AvatarCircle, SettingsCog } from 'pixelarticons/react';


export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#0b0b0b] px-6 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold text-white">
            Sketch<span className="text-violet-500">Shop</span>
          </a>

          <div className="flex items-center gap-1">
            <Button variant="ghost" className="rounded-none border-b-2 border-violet-500 px-2 text-xs tracking-[0.12em] text-white">
              FILE
            </Button>
            <Button variant="ghost" className="px-2 text-xs tracking-[0.12em] uppercase">
              EDIT
            </Button>
            <Button variant="ghost" className="px-2 text-xs tracking-[0.12em] uppercase">
              VIEW
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1">
            <AvatarCircle width={24} className="text-amber-300"/>
            <SettingsCog width={24} className="text-amber-300"/>
        </div>
      </div>
    </nav>
  )
}