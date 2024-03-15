import "./style.css"
import Image from "next/image"
import close from "../../../public/close.svg"

export default function DetailsModal(props: any){


    return(
        <div className={"modal " + props.class}>
            <main className="modal-main">
                <section className="modal-section">
                    <Image className="close-btn" onClick={() => props.invisible("invisible")} src={close} alt="close button"></Image>
                    <img className="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="a" />
                    <section className="name-section section-padding">
                        <span>bulbassaur</span>
                        <span>#1</span>
                    </section>
                </section>

                <section className="modal-section">

                    <section className="description-section section-padding item">
                        <p className="title">Description</p>
                        <span className="description">{`For some time after its birth, it\ngrows by gaining nourishment from\nthe seed on its back.`}</span>
                    </section>

                    <section className="type-section section-padding item">
                        <p className="title">types</p>
                        <ol className="pokemon-types">
                            <li className="type grass">grass</li>
                            <li className="type poison">poison</li>
                        </ol>
                    </section>

                    <ul className="abilities section-padding item">
                        <p className="title">abilities</p>
                        <li className="ability">
                            <p>overgrow:</p>
                            <span>Strengthens grass moves to inflict 1.5x damage at 1/3 max HP or less.</span>
                        </li>
                        <li className="ability">
                            <p>chlorophyll:</p>
                            <span>Doubles Speed during strong sunlight.</span>
                        </li>
                    </ul>
                    
                    <p className="title">stats</p>
                    <section className="stats section-padding item">
                        <span>heigth: {7 / 10}m</span>
                        <span>weigth: {60 / 10}kg</span>
                        <span>attack: 49</span>
                        <span>defense: 49</span>
                        <span>SP attack: 65</span>
                        <span>SP defense: 65</span>
                        <span>speed: 45</span>
                    </section>

                </section>
                
            </main>
        </div>
    )
}