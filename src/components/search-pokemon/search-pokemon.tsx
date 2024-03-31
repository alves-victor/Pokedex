import { useRouter } from "next/navigation"
import { useRef } from "react"
import "./style.css"
import "./responsive.css"

export default function SearchBar(){
    const text = useRef("")
    const router = useRouter();

    function handleSubmit(e: any){
        e.preventDefault()

        fetch("https://pokeapi.co/api/v2/pokemon/"+ text.current)
        .then(async (res) => {
            if(await res.json()){
                router.push(`details/?id=${text.current.toLowerCase()}`)
            }
        })
        .catch(() => alert("Pokemon not found!"))
    }

    return (
        <form autoComplete="off" className="search-form" onSubmit={handleSubmit}>
            <input autoComplete="off" className="search" placeholder="Search using an id or Pokemon name" name="route" type="text" onChange={(e) => {text.current = e.target.value}}/>
        </form>
    )
}