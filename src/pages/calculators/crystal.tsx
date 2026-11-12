import { useState } from "react";

import { Card, CardRow, CardHeader, CardDescription, Page } from "../../components/calc/crystal/page"

import type ICalcOptions from "../../components/calc/crystal/ICalcOptions";
import FleetOption from "../../components/calc/crystal/options/fleetOption";

const calcOptions: React.ComponentType<ICalcOptions>[] = [
    FleetOption,
]

export default function CrystalCalc() {
    const [crystalCount, setCrystalCount] = useState(0);

    return (
        <Page>
            <TopCard />

            {calcOptions.map((Option, index) => (
                <Option
                    key={index}
                    CrystalCount={crystalCount}
                    SetCrystalCount={setCrystalCount}
                />
            ))}

            <BottomCard crystalCount={crystalCount} />
        </Page>
    )
}

function TopCard() {
    return (
        <Card>
            <CardHeader>
                <h1 style={{marginBottom: "5px", marginTop: "5px"}}>SWGoH Crystal Calculator</h1>

                <CardDescription style={{marginBottom: "0px", marginTop: "5px"}}>
                    Calculate your daily and monthly crystal income
                    by answering a few questions.
                </CardDescription>
            </CardHeader>

            <p style={{marginBottom: "0px", marginTop: "0px"}}>
                Your session data is automatically stored locally
                on your computer and is never sent to a server.
            </p>
        </Card>
    )
}

interface BottomCardPrefs {
    crystalCount: number;
}

function BottomCard({crystalCount}: BottomCardPrefs) {
    const crystalCountAdjusted = crystalCount ?? 0;

    return (
        <Card>
            <CardHeader>
                <h2 style={{marginBottom: "0px", marginTop: "5px"}}>Your Total Crystal Income</h2>
            </CardHeader>

            <CardRow>
                <h3 style={{marginBottom: "0px", marginTop: "5px"}}>Daily Income</h3>
                <h2 style={{marginBottom: "0px", marginTop: "5px"}}>{crystalCountAdjusted.toLocaleString()} crystals</h2>
            </CardRow>

            <CardRow>
                <h3 style={{marginBottom: "0px", marginTop: "5px"}}>Monthly Income</h3>
                <h2 style={{marginBottom: "0px", marginTop: "5px"}}>{(crystalCountAdjusted * 28).toLocaleString()} crystals</h2>
            </CardRow>
        </Card>
    )
}