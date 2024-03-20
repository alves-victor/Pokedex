"use client"

import "./style.css"
import "./responsive.css"
import Image from "next/image"
import arrow_back from "../../../public/arrow_back.svg"
import Link from "next/link"

export default function PokemonDetails(props: any){
    let count = 0

    return(
        <div className="container">
            <main className="main">
                <section className={"section " + props.pokemonInfo.types[0] + "-box-shadow"}>
                    <Link href="/">
                        <Image className={"back-btn " + props.pokemonInfo.types[0]} src={arrow_back} alt="back button"></Image>
                    </Link>
                    <Image className={"poke-img " + props.pokemonInfo.types[0] + "-filter"} src={props.pokemonInfo.sprite} alt="pokemon picture" />
                    <section className="name-section section-padding">
                        <span>{props.pokemonInfo.name}</span>
                        <span>#{props.pokemonInfo.id}</span>
                    </section>
                </section>

                <section className={"section " + props.pokemonInfo.types[0] + "-box-shadow"}>

                    <section className="description-section section-padding item">
                        <p className="title">Description</p>
                        <span className="description">{`${props.pokemonInfo.pokemonDescription}`}</span>
                    </section>

                    <section className="type-section section-padding item">
                        <p className="title">types</p>
                        <ol className="pokemon-types">
                            {props.pokemonInfo.types.map((type: string, i: number = 0) => {
                                let element = <li key={"tm" + i} className={"type " + type}>{type}</li>
                                i++
                                return element
                            })}
                        </ol>
                    </section>

                    <ol className="abilities section-padding item">
                        <p className="title">abilities</p>
                        {props.pokemonInfo.abilityName.map((ability: string, i: number = 0) => {
                            let element = <li className="ability" key={"am" + i}><p>{ability}:</p> <span>{props.pokemonInfo.abililtyDescription[i]}</span></li>
                            i++
                            return element
                        })}                        
                    </ol>
                    
                    <p className="title">stats</p>
                    <ol className="stats section-padding item">
                        <li className="stat" key={"sm" + count++}>height: {
                            props.pokemonInfo.height < 10 ? props.pokemonInfo.height + "0cm" : props.pokemonInfo.height / 10 + "m"
                        }</li>
                        <li className="stat" key={"sm" + count++}>weight: {props.pokemonInfo.weight / 10} kg</li>
                        {props.pokemonInfo.stats.map((stat: any, i: number = 0) => {
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