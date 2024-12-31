import { Viewer, CesiumComponentRef } from 'resium'
import {
    Ion,
    Viewer as NativeCesiumViewer,
    UrlTemplateImageryProvider,
} from 'cesium'
import { useContext, useRef } from 'react'

const tomtomImageryProvider = new UrlTemplateImageryProvider({
    url: `https://api.tomtom.com/traffic/map/4/tile/flow/reduced-sensitivity/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`,
})

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN as string

const CesiumViewer = () => {

    const ref = useRef<CesiumComponentRef<NativeCesiumViewer>>(null)

    return (
        <Viewer full shouldAnimate ref={ref} infoBox={false} baseLayerPicker={false}>

        </Viewer>
    )
}

export default CesiumViewer