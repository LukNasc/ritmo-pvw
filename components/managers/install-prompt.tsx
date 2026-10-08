'use client'

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
        )
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    async function install() {
        if (!deferredPrompt) return
        await deferredPrompt.prompt()
        await deferredPrompt.userChoice
        setDeferredPrompt(null)
    }

    if (isStandalone) return null

    return (
        <div className="fixed top-0 lef-0 p-2 bg-blue-500">
            <h3>Install App</h3>

            {deferredPrompt && (
                <button
                    onClick={install}
                    className="w-full bg-red-500 p-2 active:opacity-85"
                >
                    Add to Home Screen
                </button>
            )}

            {isIOS && (
                <p>
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon"> ⎋ </span>
                    and then &quot;Add to Home Screen&quot;
                    <span role="img" aria-label="plus icon"> ➕ </span>.
                </p>
            )}
        </div>
    )
}