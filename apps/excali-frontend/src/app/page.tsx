"use client"

import Landing from "@/components/core/Landing";
import Navbar from "@/components/core/Navbar";
import { useState } from "react";



export default function Home() {
  return (
     <div className="min-h-screen bg-[linear-gradient(180deg,#0d0d1a_0%,#141428_20%,#1e1a3a_40%,#2a2148_55%,#3d2a52_70%,#52304a_82%,#6b3540_92%,#7a3a38_100%)]">
      <Navbar  />
      <Landing  />
    </div>
  );
}
