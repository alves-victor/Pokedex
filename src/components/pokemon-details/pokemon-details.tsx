"use client"

import "./style.css"
import "./responsive.css"
import Image from "next/image"
import arrow_back from "../../../public/arrow_back.svg"
import Link from "next/link"
import { Pokemon } from "@/components/pokemon-card/pokemon-card"
import { useEffect, useState } from "react"

export default function PokemonDetails(props: any){
    const [pokemonInfo, setPokemonInfo] = useState(new Pokemon)
    let count = 0

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

    useEffect(() => {
        GetPokemon(`https://pokeapi.co/api/v2/pokemon/${props.params}/`)
    })

    return(
        <div className="container">
            <main className="main">
                <section className={"section " + pokemonInfo.types[0] + "-box-shadow"}>
                    <Link href="/">
                        <Image className={"back-btn " + pokemonInfo.types[0]} src={arrow_back} alt="back button"></Image>
                    </Link>
                    <img className={"poke-img " + pokemonInfo.types[0] + "-filter"} src={pokemonInfo.sprite} alt="pokemon picture" />
                    <section className="name-section section-padding">
                        <span>{pokemonInfo.name}</span>
                        <span>#{pokemonInfo.id}</span>
                    </section>
                </section>

                <section className={"section " + pokemonInfo.types[0] + "-box-shadow"}>

                    <section className="description-section section-padding item">
                        <p className="title">Description</p>
                        <span className="description">{`${pokemonInfo.pokemonDescription}`}</span>
                    </section>

                    <section className="type-section section-padding item">
                        <p className="title">types</p>
                        <ol className="pokemon-types">
                            {pokemonInfo.types.map((type: string, i: number = 0) => {
                                let element = <li key={"tm" + i} className={"type " + type}>{type}</li>
                                i++
                                return element
                            })}
                        </ol>
                    </section>

                    <ol className="abilities section-padding item">
                        <p className="title">abilities</p>
                        {pokemonInfo.abilityName.map((ability: string, i: number = 0) => {
                            let element = <li className="ability" key={"am" + i}><p>{ability}:</p> <span>{pokemonInfo.abililtyDescription[i]}</span></li>
                            i++
                            return element
                        })}                        
                    </ol>
                    
                    <p className="title">stats</p>
                    <ol className="stats section-padding item">
                        <li className="stat" key={"sm" + count++}>height: {
                            pokemonInfo.height < 10 ? pokemonInfo.height + "0cm" : pokemonInfo.height / 10 + "m"
                        }</li>
                        <li className="stat" key={"sm" + count++}>weight: {pokemonInfo.weight / 10} kg</li>
                        {pokemonInfo.stats.map((stat: any, i: number = 0) => {
                            let element
                            switch (stat.name) {
                                case "special-attack":
                                    element = <li className="stat" key={"sm" + i}>{`SP Attack: ${stat.value}`}</li>
                                    i++
                                    return element
                                case "special-defense":
                                    element = <li className="stat" key={"sm" + i}>{`SP Defense: ${stat.value}`}</li>
                                    i++
                                    return element
                                default:
                                    element = <li className="stat" key={"sm" + i}>{`${stat.name}: ${stat.value}`}</li>
                                    i++
                                    return element
                            }
                        })}
                    </ol>
                </section>
                
            </main>
        </div>
    )
}