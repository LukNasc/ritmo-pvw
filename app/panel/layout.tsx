'use client'
import { BottomNavbar } from "@/components/bottom-navbar";
import { ProtectedRoute } from "@/components/protected-route";
import { GoalContextProvider } from "@/context/GoalsContext";
import { useUserProfile } from "@/context/UserProfileContext"
import { redirect } from 'next/navigation'
import { useEffect } from "react"

export default function ProtectedRoutesLayout({ children }: { children: React.ReactNode }) {
    const { profile, username } = useUserProfile();

    useEffect(() => {
        if (!profile || !username) {
            redirect("/onboarding/register")
        }
    }, [profile, username])

    return (
        <ProtectedRoute>
            <GoalContextProvider>
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="relative flex-1 overflow-y-auto border-x border-b border-l-border p-5">
                        {children}
                    </div>
                    <BottomNavbar />
                </div>
            </GoalContextProvider>
        </ProtectedRoute>


    )
}