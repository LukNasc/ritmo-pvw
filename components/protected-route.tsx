'use client'

import { useUserProfile } from "@/context/UserProfileContext";
import { redirect, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { profile, username } = useUserProfile();
    const pathname = usePathname();

    const userIsLogged = useCallback(() => {
        if (!profile && !username) {
            return false
        }

        return true
    }, [profile, username])

    useEffect(() => {
        if (!userIsLogged()) {
            redirect("/onboarding/register")
        }



    }, [pathname, userIsLogged])



    return children;
}
