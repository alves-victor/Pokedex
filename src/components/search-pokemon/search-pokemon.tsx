import { useRouter } from "next/navigation"
import { useState } from "react"
import "./style.css"
import "./responsive.css"

export default function SearchBar(){
    const [text, setText] = useState("")
    const router = useRouter();

    function handleSubmit(e: any){
        e.preventDefault()

        fetch("https://pokeapi.co/api/v2/pokemon/"+ text)
        .then(async (res) => {
            if(await res.json()){
                router.push(`details/?id=${text.toLowerCase()}`)
            }
        })
        .catch(() => alert("Pokemon not found!"))
    }

    return (
        <form autoComplete="off" className="search-form" onSubmit={handleSubmit}>
            <input autoComplete="off" className="search" placeholder="Search using an id or Pokemon name" name="route" type="text" onChange={(e) => setText(e.target.value)}/>
        </form>
    )
}