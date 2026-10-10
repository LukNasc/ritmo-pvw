'use client'

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { XCircleIcon } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html className="dark">
            <body className="mx-auto max-w-xl h-screen border border-border">
                <div className="h-full flex flex-col items-center justify-center mx-auto">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon" >
                                <XCircleIcon />
                            </EmptyMedia>
                            <EmptyTitle>
                                <h1 className="text-lg uppercase font-bold">Ops, ocorreu um erro</h1>
                            </EmptyTitle>
                        </EmptyHeader>
                        <EmptyContent>
                            <EmptyDescription>
                                {error.message}
                            </EmptyDescription>
                        </EmptyContent>
                    </Empty>
                </div>
            </body>
        </html>

    )
}