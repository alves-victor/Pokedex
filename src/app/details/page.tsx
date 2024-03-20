"use client"

import PokemonDetails from "@/components/pokemon-details/pokemon-details"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function Params(){
    const searchParams: any = useSearchParams()
    const params = searchParams.get("id")

    return <PokemonDetails class="visible" params={params}/>
}

export default function Details(){

    return(
        <Suspense fallback={<p>loading...</p>}>
            <Params/>
        </Suspense>
    )
}