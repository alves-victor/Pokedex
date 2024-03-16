import "./style.css"
import Image from "next/image"
import close from "../../../public/close.svg"

export default function DetailsModal(props: any){


    return(
        <div className={"modal " + props.class}>
            <main className="modal-main">
                <section className="modal-section">
                    <Image className="close-btn" onClick={() => props.invisible("invisible")} src={close} alt="close button"></Image>
                    <img className="poke-img" src={props.pokemonInfo.sprite} alt="pokemon picture" />
                    <section className="name-section section-padding">
                        <span>{props.pokemonInfo.name}</span>
                        <span>#{props.pokemonInfo.id}</span>
                    </section>
                </section>

                <section className="modal-section">

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
                        {props.pokemonInfo.stats.map((stat: any, i: number = 0) => {
                            let element
                            switch (stat.name) {
                                case "height":
                                    element = <li className="stat" key={"sm" + i}>{`${stat.name}: ${stat.value / 10}m`}</li>
                                    i++
                                    return element
                                case "weight":
                                    element = <li className="stat" key={"sm" + i}>{`${stat.name}: ${stat.value / 10}kg`}</li>
                                    i++
                                    return element
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