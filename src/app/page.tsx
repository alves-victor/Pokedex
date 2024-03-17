import PokemonCard from "@/components/pokemon-card/pokemon-card";
import Style from "@/app/page.module.css"

export default function Home() {
  return (
    <main className={Style.main}>
      <PokemonCard/>
    </main>
  );
}
