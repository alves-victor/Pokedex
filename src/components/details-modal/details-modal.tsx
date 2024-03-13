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
                    <p className="item">types</p>
                    <section className="type-section section-padding item">
                        <ol className="pokemon-types">
                            <li className="type grass">grass</li>
                            <li className="type poison">poison</li>
                        </ol>
                    </section>

                    <p className="item">abilities</p>
                    <ul className="abilities item">
                        <li>overgrow</li>
                        <li>chlorophyll</li>
                    </ul>
                    
                    <p className="item">details</p>
                    <section className="details section-padding item">
                        <span>heigth: 70cm</span>
                        <span>weigth: 69cm</span>
                    </section>

                </section>
                
            </main>
        </div>
    )
}