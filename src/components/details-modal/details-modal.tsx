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
                    <section className="name-section">
                        <span>bulbassaur</span>
                        <span>#1</span>
                    </section>
                </section>
                
            </main>
        </div>
    )
}