"use client"

import PokemonDetails from "@/components/pokemon-details/pokemon-details"
import { useSearchParams } from "next/navigation"

export default function Details(){
    const params = useSearchParams()

    return(
        <PokemonDetails params={params.get("id")} />
    )
}