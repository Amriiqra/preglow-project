import React from 'react'
import { Spinner } from '../ui/spinner'

export default function Loader() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center min-h-screen">
            <Spinner className="size-8 text-primary" />
            <p>Loading...</p>
        </div>
    )
}
