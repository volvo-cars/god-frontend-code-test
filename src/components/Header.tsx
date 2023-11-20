"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface IHeader {
    children: ReactNode
}

const Header = ({ children }: IHeader) => {
    const router = useRouter()

    return (
        <div className="flex gap-x-gutter p-16 md:p-32 bg-surface-accent-blue">
            <a onClick={() => router.replace('/')} className="font-medium link-inline self-center text-always-white">Home</a>
            { children }
        </div>
    )
}

export default Header
