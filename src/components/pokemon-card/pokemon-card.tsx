import "./style.css"
import "./pokeTypes.css"
import img from "../../../public/info.svg"
import Image from "next/image"

export default function PokemonCard(){
    const pokemonDetail = {
        name: "",
        id:0,
        sprite: "",
        types: [],
        mainType:""
    }

    const limit:number = 8
    let offset:number = 0
    //let list = document.getElementById("pokemon-list")

    function savePokemonDetails(details:any){
        pokemonDetail.name = details.name
        pokemonDetail.id = details.id
        pokemonDetail.sprite = details.sprites.other.dream_world.front_default
        pokemonDetail.types = details.types.map((types:any) => types.type.name)
        pokemonDetail.mainType = pokemonDetail.types[0]

        return pokemonDetail
    }

    async function GetPokemonDetails(pokemon:any){
        return await fetch(pokemon.url)
            .then(response => response.json())
            .then(details => savePokemonDetails(details))
            .catch(error => alert(error))
    }

    async function GetPokemons(){
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

        return await fetch(url)
            .then(response => response.json())
            .then(data => data.results)
            .then(pokemons => pokemons.map(GetPokemonDetails))
            .then(detailRequest => Promise.all(detailRequest))
            .then(pokemonDetails => pokemonDetails)
            .catch(error => alert(error))
    }

    function convertPokemonToLi(){
        return ``
    }

    function LoadMorePokemons(){
        GetPokemons().then((pokemons: any) => {
            //list.innerHTML = pokemons.map(convertPokemonToLi).join("")
        })
    }

    return(
        <ol id="pokemon-list">
            <li className="pokemon-card grass">
                <section className="top-section">
                    <p className="pokemon-name">Bulbasaur</p>
                    <p className="pokemon-number">#1</p>
                </section>
                <section className="mid-section">
                    <img className="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="Pokemon-img" />
                    <Image className="infoIcon" src={img} alt={"details button"} ></Image>
                </section>
                <section className="bot-section">
                    <ol className="pokemon-types">
                        <li className="type grass">Grass</li>
                        <li className="type poison">Poison</li>
                    </ol>
                </section>
            </li>
            <li className="pokemon-card fire">
                <section className="top-section">
                    <p className="pokemon-name">Charmander</p>
                    <p className="pokemon-number">#4</p>
                </section>
                <section className="mid-section">
                    <img className="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg" alt="Pokemon-img" />
                </section>
                <section className="bot-section">
                    <ol className="pokemon-types">
                        <li className="type fire">fire</li>
                    </ol>
                </section>
            </li>
            <li className="pokemon-card fire">
                <section className="top-section">
                    <p className="pokemon-name">Charmander</p>
                    <p className="pokemon-number">#4</p>
                </section>
                <section className="mid-section">
                    <img className="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg" alt="Pokemon-img" />
                </section>
                <section className="bot-section">
                    <ol className="pokemon-types">
                        <li className="type fire">fire</li>
                    </ol>
                </section>
            </li>
            <li className="pokemon-card">
                <section className="top-section">
                    <p className="pokemon-name">Charmander</p>
                    <p className="pokemon-number">#4</p>
                </section>
                <section className="mid-section">
                    <img className="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg" alt="Pokemon-img" />
                </section>
                <section className="bot-section">
                    <ol className="pokemon-types">
                        <li className="type">fire</li>
                    </ol>
                </section>
            </li>
        </ol>
    )
}