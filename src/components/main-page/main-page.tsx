"use client"
import { useState } from "react"
import PokemonCard from "../pokemon-card/pokemon-card"
import DetailsModal from "../details-modal/details-modal"

export default function MainPage(){
    const [pokeId, setPokeId] = useState(0)
    const [modalVisibility, setVisibility] = useState("invisible")

    function ShowModal(id: number, visibility: string){
        setPokeId(id)
        setVisibility(visibility)
    }

    return(
        <div style={{position: "relative"}}>
            <h1>Pokédex</h1>
            <PokemonCard ShowModal={ShowModal}/>
            <DetailsModal class={modalVisibility} invisible={setVisibility} />
        </div>
    )
}