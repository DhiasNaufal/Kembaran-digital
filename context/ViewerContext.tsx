

'use client'

import React, { ReactNode, createContext, useState } from 'react'
import { Camera } from 'cesium'
type ViewerState = {
    cesiumCamera: Camera | null
}
type ViewerAction = {
    setCesiumCamera: React.Dispatch<React.SetStateAction<ViewerState['cesiumCamera']>>
}
export const ViewerContext = createContext<{ state: ViewerState; action: ViewerAction }>({
    state: {
        cesiumCamera: null,
    },
    action: {} as ViewerAction,
})

export const ViewerProvider = ({ children }: { children: ReactNode }) => {
    const [cesiumCamera, setCesiumCamera] = useState<ViewerState['cesiumCamera']>(null)

    return (
        <ViewerContext.Provider
            value={{
                state: {
                    cesiumCamera,
                },
                action: {
                    setCesiumCamera,
                },
            }}
        >
            {children}
        </ViewerContext.Provider>
    )
}
