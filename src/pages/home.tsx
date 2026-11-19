import AppList from "../components/applist";
import type { AppCardModel } from "../components/applist";

const appCardList: AppCardModel[] = [
    {
        Title: "SWGoH Portrait Maker",
        Desc: "Create custom Star Wars Galaxy of Heroes portraits.",
        Link: "/swgoh-portrait-maker",
    },
    {
        Title: "SWGoH Updates",
        Desc: "Learn about the latest SWGoH updates as they happen",
        Link: "/swgoh-updates",
    },
    {
        Title: "SWGoH Asset Extractor Web",
        Desc: "Extract SWGoH from the comfort of your browser",
        Link: "/asset-extractor-web"
    },
    {
        Title: "SWGoH Localization String Parser",
        Desc: "Understand raw localization strings",
        Link: "/loc-bundle-format"
    },
    {
        Title: "SWGoH Update Frequency",
        Desc: "See how frequently SWGoH updates",
        Link: "/update-frequency",
    }
];

export default function Home() {
    return (
        <AppList cards={appCardList} />
    )
}