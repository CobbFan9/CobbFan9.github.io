import AppList from "../components/applist";
import type { AppCardModel } from "../components/applist";

const appCardList: AppCardModel[] = [
    {
        Title: "Crystal Calculator",
        Desc: "Calculate your crystal income in SWGoH",
        Link: "/calc/crystal",
    },
]

export default function Calculators() {
    return (
        <AppList cards={appCardList} />
    )
}