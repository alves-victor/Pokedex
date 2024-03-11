"use client"
import { useState } from "react"
import PokemonCard from "../pokemon-card/pokemon-card"

export default function MainPage(){
    const [pokeId, setPokeId] = useState(0)

    function ShowModal(id: number){
        setPokeId(id)
    }


    return(
        <div>
            <h1>Pokédex</h1>
            <PokemonCard ShowModal={ShowModal}/>
        </div>
    )
}