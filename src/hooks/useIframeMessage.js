import { useCallback } from 'react'

export const useIframeMessage = () => {
    const sendMessage = useCallback((data) => {
        window.parent.postMessage(data, '*')
    }, [])

    return { sendMessage }
}