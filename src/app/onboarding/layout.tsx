'use client'

import { useUserProfile } from "@/context/UserProfileContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingLayout({ children }: LayoutProps<"/">) {
    const { username, profile } = useUserProfile();


    useEffect(() => {
        console.log(username, profile);
        if (username && profile) {
            redirect('/panel/dashboard')
        }
    }, [profile, username])

    return (
        <div className="flex justify-center flex-col gap-4 h-full">
            <Image src="/web-app-manifest-512x512.png" alt="logo" width={50} height={50} />
            {children}
        </div>
    )
}