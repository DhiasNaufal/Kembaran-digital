import { Viewer, CesiumComponentRef, CameraFlyTo, Cesium3DTileset, ImageryLayer, } from 'resium'
import {
    Ion,
    Viewer as NativeCesiumViewer,
    Math as CesiumMath,
    Cartesian3,
    IonResource,
    OpenStreetMapImageryProvider,
} from 'cesium'
import { useContext, useRef } from 'react'
import { ViewerContext } from '@/context/ViewerContext'
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN as string

const CesiumViewer = () => {
    const osmImageryProvider = new OpenStreetMapImageryProvider({
        url: "https://a.tile.openstreetmap.org/",
    });
    const {
        action: { setCesiumCamera },
    } = useContext(ViewerContext)
    const ref = useRef<CesiumComponentRef<NativeCesiumViewer>>(null)
    const setTerrain = async () => {
        if (ref.current?.cesiumElement) {
            const viewer = ref.current.cesiumElement;
            const terrainProviderViewModels = viewer.baseLayerPicker.viewModel.terrainProviderViewModels;
            const desiredTerrain = terrainProviderViewModels.find(model => model.name === "Cesium World Terrain");
            if (desiredTerrain) {
                viewer.baseLayerPicker.viewModel.selectedTerrain = desiredTerrain
            }
            setCesiumCamera(ref.current.cesiumElement.camera)
        }
    }
    return (
        <Viewer ref={ref} full timeline={false} animation={false} >
            <CameraFlyTo
                destination={Cartesian3.fromDegrees(116.708881, - 0.972826, 1200)}
                orientation={{ heading: CesiumMath.toRadians(15.0), pitch: CesiumMath.toRadians(-35.0), roll: 0.0 }}
                onComplete={setTerrain}
                duration={0}
                once
            />
            <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
            <ImageryLayer imageryProvider={osmImageryProvider} />
        </Viewer>
    )
}

export default CesiumViewer