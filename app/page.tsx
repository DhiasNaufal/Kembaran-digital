'use client'
// import MapCesium from '@/components/MapCesium';
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk menghindari masalah SSR
const MapCesium = dynamic(() => import("@/components/MapCesium"), { ssr: false });

export default function Home() {
  return (
    <div>
      <MapCesium />
    </div>
  )
}
