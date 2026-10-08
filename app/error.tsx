'use client'

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { XCircleIcon } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="mx-auto">
                <div className="mx-auto">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon" >
                                <XCircleIcon />
                            </EmptyMedia>
                            <EmptyTitle>
                                {error.name}
                            </EmptyTitle>
                        </EmptyHeader>
                    </Empty>
                </div>
            </body>
        </html>

    )
}