'use client'

import { FlagIcon, HomeIcon, LucideIcon, UserIcon, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus: { icon: LucideIcon, label: string, route: string, key: string }[] = [
    {
        icon: HomeIcon,
        label: "Dashboard",
        route: '/panel/dashboard',
        key: 'dashboard'
    },
    {
        icon: FlagIcon,
        label: "Metas",
        route: '/panel/goals',
        key: 'goal'
    },
    {
        icon: UserIcon,
        label: "Perfil",
        route: '/panel/profile',
        key: 'profile'
    }
]

export function BottomNavbar() {

    const pathname = usePathname();

    return (
        <div className="flex bg-card">
            {
                menus.map(({ key, icon: Icon, label, route }) => (
                    <Link href={route} key={key} className="flex flex-col items-center justify-center gap-1 flex-1 py-2" style={{
                        color: pathname === route ? 'var(--color-primary)' : 'var(--color-foreground)'
                    }}>
                        <Icon className="w-5" />
                        <p className="text-xs">{label}</p>
                    </Link>
                )
                )
            }
        </div>
    )
}