import AppList from "../components/applist";
import type { AppCardModel } from "../components/applist";

const appCardList: AppCardModel[] = [
    {
        Title: "Crystal Calculator",
        Desc: "Calculate your crystal income in SWGoH",
        Link: "/calc/crystal",
    },
    {
        Title: "Shard Calculator",
        Desc: "Calculate how much time it will take to farm a unit's shards!",
        Link: "/calc/shard",
    }
]

export default function Calculators() {
    return (
        <AppList cards={appCardList} />
    )
}