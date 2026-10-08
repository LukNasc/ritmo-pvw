'use client'

import { PROFILE, Profile } from "@/types/profiles";
import { useLocalStorage } from "@uidotdev/usehooks";
import { redirect } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, } from "react";

type UserProfileContextType = {
    profile: Profile | null
    username: string | null,
    setProfile: (profile: Profile) => void,
    setUsername: (username: string) => void,
    logout: () => void
}

const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);


export function UserProfileProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useLocalStorage<string | null>("@ritmo/username", null);
    const [profile, setProfile] = useLocalStorage<Profile | null>("@ritimo/profile", null);


    const handleSetProfile = useCallback((profile: Profile) => {
        setProfile(profile);
    }, [setProfile])

    const handleSetUsername = useCallback((name: string) => {
        setUsername(name);
    }, [setUsername])

    const handleLogout = useCallback(() => {
        setUsername(null);
        setProfile(null);
        localStorage.clear();
    }, [setProfile, setUsername])

    const values: UserProfileContextType = useMemo(() => ({
        username, profile, setProfile: handleSetProfile, setUsername: handleSetUsername, logout: handleLogout
    }), [username, profile, handleSetProfile, handleSetUsername, handleLogout])

    return (
        <UserProfileContext.Provider value={values}>
            {children}
        </UserProfileContext.Provider>
    )
}

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error("useUserProfile must be used within a UserProfileProvider");
    }
    return context;
}