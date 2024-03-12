import "./style.css"

export default function DetailsModal(props: any){


    return(
        <div className={"modal " + props.class}>
            <button onClick={() => props.invisible("invisible")}>teste2</button>
        </div>
    )
}