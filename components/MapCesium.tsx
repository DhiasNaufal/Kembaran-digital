import { Viewer, CesiumComponentRef, CameraFlyTo, Cesium3DTileset, ImageryLayer, } from 'resium'
import {
    Ion,
    Viewer as NativeCesiumViewer,
    Math as CesiumMath,
    Cartesian3,
    IonResource,
    OpenStreetMapImageryProvider,
    UrlTemplateImageryProvider,
} from 'cesium'
import { useContext, useRef, useState } from 'react'
import { ViewerContext } from '@/context/ViewerContext'
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN as string

const CesiumViewer = () => {
    const osmImageryProvider = new UrlTemplateImageryProvider({
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    });
    const {
        action: { setCesiumCamera },
    } = useContext(ViewerContext)
    const ref = useRef<CesiumComponentRef<NativeCesiumViewer>>(null)
    const setTerrain = async () => {
        if (ref.current?.cesiumElement) {
            const viewer = ref.current.cesiumElement;
            const terrainProviderViewModels = viewer.baseLayerPicker.viewModel.terrainProviderViewModels;
            const imageryProviderViewModels = viewer.baseLayerPicker.viewModel.imageryProviderViewModels;

            const desiredTerrain = terrainProviderViewModels.find(model => model.name === "Cesium World Terrain");
            if (desiredTerrain) {
                viewer.baseLayerPicker.viewModel.selectedTerrain = desiredTerrain

            }
            viewer.imageryLayers.addImageryProvider(osmImageryProvider)
            setCesiumCamera(ref.current.cesiumElement.camera)
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    const handleTilesetLoad = () => {
        console.log("first")
    };
    return (
        <Viewer ref={ref} full timeline={false} animation={false}  >
            <CameraFlyTo
                destination={Cartesian3.fromDegrees(110.376100, -7.790165, 1000)}
                orientation={{ heading: CesiumMath.toRadians(15.0), pitch: CesiumMath.toRadians(-35.0), roll: 0.0 }}
                onComplete={setTerrain}
                duration={0}
                once
            />
            {/* <ImageryLayer imageryProvider={osmImageryProvider} /> */}
            <Cesium3DTileset url={IonResource.fromAssetId(96188)} onReady={handleTilesetLoad} />
        </Viewer>
    )
}

export default CesiumViewer