'use client'
// import MapCesium from '@/components/MapCesium';
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk menghindari masalah SSR
const MapCesium = dynamic(() => import("@/components/MapCesium"), { ssr: false });
import { Autocomplete, AutocompleteItem, cn, Radio, RadioGroup, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import { useContext, useState } from "react";
import { ViewerContext } from "@/context/ViewerContext";
import { Cartesian3, Math as CesiumMath, } from "cesium";
export default function Home() {
  const YearValue: any = {
    1: '2019',
    2: '2020',
    3: '2021',
    4: '2022',
    5: '2023',
    6: '2024',
  }
  const city = [
    { label: "Nusantara", key: "nusantara", },
    { label: "Yogyakarta", key: "yogyakarta", },
  ]
  const [selectedCity, setSelectedCity] = useState<React.Key | null>("nusantara");
  const [selectedRaster, setSelectedRaster] = useState("penutupan-lahan");
  const [isRasterOn, setRasterOn] = useState(false);
  const {
    state: { cesiumCamera },
  } = useContext(ViewerContext)
  const LocationMapping: any = {
    nusantara: Cartesian3.fromDegrees(116.708881, - 0.972826, 1000),
    yogyakarta: Cartesian3.fromDegrees(110.376100, -7.790165, 1000)
  }

  const handleSelectedCity = (value: any) => {
    setSelectedCity(value)
    const coordinate = LocationMapping[value]
    cesiumCamera?.flyTo({ destination: coordinate, duration: 2, orientation: { heading: CesiumMath.toRadians(15.0), pitch: CesiumMath.toRadians(-35.0), roll: 0.0 } })
  }
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 h-full">
        <MapCesium />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none h-full">
        <div className="absolute top-0 pointer-events-auto  p-4 w-[250px] bg-white  transition-all duration-300  rounded-none shadow-md h-full">
          <Autocomplete defaultSelectedKey="nusantara" onSelectionChange={(value) => { handleSelectedCity(value) }} className="max-w-xs" label="Select City" size='sm'>
            {city.map((animal) => (
              <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
            ))}
          </Autocomplete>
          <Slider
            className="max-w-md"
            color="foreground"
            defaultValue={1}
            getValue={(value: any) => `${YearValue[value]} `}
            label="Tahun"
            maxValue={6}
            minValue={1}
            showSteps={true}
            size="md"
            step={1}
          />
          <div className="py-2 flex justify-between">
            <p>
              Raster Area
            </p>
            <Switch size="sm" isSelected={isRasterOn} onValueChange={setRasterOn} />
          </div>
          <RadioGroup value={selectedRaster} onValueChange={setSelectedRaster} isDisabled={!isRasterOn}>
            <Radio value="penutupan-lahan">Penutup Lahan</Radio>
            <Radio value="lst">LST (suhu)</Radio>
            <Radio value="uhi"> UHI (suhu)</Radio>
            <Radio value="polusi">PM 2,5 (polusi)</Radio>
            <Radio value="ndvi"> NDVI (tingkat vegetasi)</Radio>
          </RadioGroup>
        </div>
      </div>
    </div >
    // <div>
    //  
    // </div>
  )
}
