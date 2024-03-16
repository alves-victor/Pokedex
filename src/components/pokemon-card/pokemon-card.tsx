import "./style.css"
import "./pokeTypes.css"
import img from "../../../public/info.svg"
import Image from "next/image"
import React, { useEffect, useState } from "react";

export class Pokemon{
    name: string = "";
    id: number = 0;
    sprite: string = "";
    types: string[] = [];
    mainType: string = "";
    abilityName: string[] = [];
    abililtyDescription: string[] = [];
    pokemonDescription: string = "";
    stats: any[] = []
}

export default function PokemonCard(props: any){

    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=8"
    const [list, setList] = useState(Array<any>)
    const [next, setNext] = useState("")
    const [previous, setPrevious] = useState("")
    let count = 1500

    function savePokemonDetails(details:any){
        const pokemon:Pokemon = new Pokemon()
        pokemon.name = details.name
        pokemon.id = details.id
        pokemon.sprite = details.sprites.other.dream_world.front_default
        pokemon.types = details.types.map((types:any) => types.type.name)
        pokemon.mainType = pokemon.types[0]

        return pokemon
    }

    async function GetPokemonDetails(pokemon:any){
        return await fetch(pokemon.url)
            .then(response => response.json())
            .then(details => savePokemonDetails(details))
            .catch(error => alert(error))
    }

    async function GetPokemons(url: string){
        return await fetch(url)
            .then(response => response.json())
            .then(data => {
                setNext(data.next)
                setPrevious(data.previous)
                return data.results
            })
            .then(pokemons => pokemons.map(GetPokemonDetails))
            .then(detailRequest => Promise.all(detailRequest))
            .then(pokemonDetails => pokemonDetails)
            .catch(error => console.log(error))
    }

    function ConvertPokemonToLi(pokemon: any){
        return(
            <li key={pokemon.id} className={"pokemon-card " + pokemon.mainType}>
                <section className="top-section">
                    <p className="pokemon-name">{pokemon.name}</p>
                    <p className="pokemon-number">#{pokemon.id}</p>
                </section>
                <section className="mid-section">
                    <img className="pokemon-img" src={pokemon.sprite} alt="Pokemon-img" />
                    <Image onClick={() => props.ShowModal(pokemon.id, "visible")} className="infoIcon" src={img} alt="details button"></Image>
                </section>
                <section className="bot-section">
                    <ol className="pokemon-types">
                        {pokemon.types.map((type: string) => <li key={count++} className={"type " + type}>{type}</li>)}
                    </ol>
                </section>
            </li>
        )
    }

    useEffect(() => {
        Load(url)
    }, [])
    
    async function Load(url: string){
        await GetPokemons(url).then((pokemons: any) => {
            let li = pokemons.map(ConvertPokemonToLi)
            setList(li)
        })
    }

    return(
        <>
            <button onClick={() => {
                previous?Load(previous): alert("Fim!")
            }}>
                Previous
            </button>

            <button onClick={() => {
                next?Load(next): alert("Fim!")
            }}>
                Next
            </button>

            <ol id="pokemon-list">
                {list.map(pokemon => pokemon)}
            </ol>
        </>
    )
}