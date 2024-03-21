"use client"

import "./style.css"
import "./responsive.css"
import "../../app/pokeTypes.css"
import info from "../../../public/info.svg"
import arrow_back from "../../../public/arrow_back.svg"
import Image from "next/image"
import React, { useEffect, useState } from "react";
import Link from "next/link";

export class Pokemon{
    name: string = "";
    id: number = 0;
    sprite: string = "";
    types: string[] = [];
    mainType: string = "";
    abilityName: string[] = [];
    abililtyDescription: string[] = [];
    pokemonDescription: string = "";
    stats: any[] = [];
    height: number = 0;
    weight: number = 0
}

export default function PokemonCard(){

    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
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
                    <Image className="pokemon-img" src={pokemon.sprite} alt="Pokemon-img" width={0} height={0}/>
                    <Link 
                        href={{
                            pathname: "/details",
                            query: {id: pokemon.id},                                               
                        }}
                    >
                        <Image className="infoIcon" src={info} alt="details button"/>
                    </Link>
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
        if(localStorage.getItem("url-atual")){
            Load(localStorage.getItem("url-atual"))
        }else{
            Load(url)
        }

        window.onbeforeunload = function(){
            localStorage.clear()
        }
    }, [])
    
    async function Load(url: any){
        localStorage.setItem("url-atual", url)
        await GetPokemons(url).then((pokemons: any) => {
            let li = pokemons.map(ConvertPokemonToLi)
            setList(li)
        })
    }

    return(
        <>
            <h1 id="top" onClick={() => Load(url)}>Pokédex</h1>

            <ol id="pokemon-list">
                {list.map(pokemon => pokemon)}
            </ol>

            <section className="btn-section">
                <a href="#top" className="change-page-btn" onClick={() => {
                    previous?Load(previous): alert("Fim!")
                }}>
                    <Image src={arrow_back} alt={"voltar"}></Image> previous
                </a>

                <a href="#top" className="change-page-btn" onClick={() => {
                    next?Load(next): alert("Fim!")
                }}>
                    next <Image className="flip" src={arrow_back} alt={"avançar"}></Image>
                </a>
            </section>
        </>
    )
}