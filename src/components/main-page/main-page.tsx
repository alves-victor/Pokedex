"use client"
import { useState } from "react"
import PokemonCard, { Pokemon } from "../pokemon-card/pokemon-card"
import DetailsModal from "../details-modal/details-modal"

export default function MainPage(){
    const [modalVisibility, setVisibility] = useState("invisible")
    const [pokemonInfo, setPokemonInfo] = useState(new Pokemon)

    async function ShowModal(id: number, visibility: string){
        await GetPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        setVisibility(visibility)
    }

    async function GetPokemon(url: string){
        const pokemon: Pokemon = new Pokemon()
        await fetch(url)
            .then(res => res.json())
            .then(async data => {
                pokemon.name = data.name
                pokemon.id = data.id
                pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
                pokemon.types = data.types.map((types: any) => types.type.name)
                pokemon.mainType = pokemon.types[0]
                pokemon.abilityName = data.abilities.map((abilities: any) => abilities.ability.name)              
                pokemon.abililtyDescription = data.abilities.map((abilities: any) => GetAblitiesDescription(abilities.ability.url))
                await GetPokemonDescription(data.species.url, pokemon)
                pokemon.stats = GetStats(data.stats)
                pokemon.height = data.height
                pokemon.weight = data.weight
            })
            .catch(error => alert(error))
        setPokemonInfo(pokemon)
    }

    async function GetAblitiesDescription(url: string){
        return await fetch(url)
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.effect_entries.length; i++) {
                    if(data.effect_entries[i].language.name === "en"){
                        return data.effect_entries[i].short_effect
                    }
                }
            })
    }

    async function GetPokemonDescription(url: string, pokemon: Pokemon){
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i < data.flavor_text_entries.length; i++){
                    if(data.flavor_text_entries[i].language.name === "en" && data.flavor_text_entries[i].version.name === "diamond"){
                        pokemon.pokemonDescription = data.flavor_text_entries[i].flavor_text
                    }
                }
            })
    }

    function GetStats(stats: any[]){
        return stats.map((stats: any) => {
            return {
                name: stats.stat.name,
                value: stats.base_stat
            }
        })
    }

    return(
        <div style={{position: "relative"}}>
            <h1 style={{padding: "0px 20px"}}>Pokédex</h1>
            <PokemonCard ShowModal={ShowModal}/>
            <DetailsModal class={modalVisibility} invisible={setVisibility} pokemonInfo={pokemonInfo}/>
        </div>
    )
}