import { useState } from "react";

import { Card, CardRow, CardHeader, CardDescription, Page } from "../../components/calc/shard/page"

import Options from "../../components/calc/shard/options";

export default function ShardCalc() {
    const [timeTo7, setTimeTo7] = useState(0);

    return (
        <Page>
            <TopCard />

            <Options setTimeTo7={setTimeTo7} />

            <BottomCard timeTo7={timeTo7} />
        </Page>
    )
}



function TopCard() {
    return (
        <Card>
            <CardHeader>
                <h1 style={{ marginBottom: "5px", marginTop: "5px" }}>SWGoH Shard Calculator</h1>

                <CardDescription style={{ marginBottom: "0px", marginTop: "5px" }}>
                    Calculate about how long it will take to farm a unit's shards from a node.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

interface BottomCardProps {
    timeTo7: number;
}

function BottomCard({ timeTo7 }: BottomCardProps) {
    return (
        <Card>
            <CardRow>
                <h1 style={{ marginBottom: "0px", marginTop: "5px" }}>Time till 7 star</h1>
                <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>{timeTo7.toLocaleString()} days</h2>
                <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>{(timeTo7 / 7).toLocaleString()} weeks</h2>
            </CardRow>
        </Card>
    )
}