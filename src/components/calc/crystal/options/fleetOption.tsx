import { useRef, useEffect, useState } from "react";

import { Card, CardRow, CardHeader } from "../page"

import type ICalcOptions from "../ICalcOptions";
import { LoadSession, SaveSession } from "../../../../ts/calc/crystal/LoadSessionStorage";

export default function FleetOption({ SetCrystalCount }: ICalcOptions) {
    const [selectedFleetPayout, setSelectedFleetPayout] = useState("0");
    let fleetCrystalsInCount = useRef(0);

    function syncCrystalCount(newPayout: number, payoutGroup: string) {
        const difference = newPayout - fleetCrystalsInCount.current;

        SetCrystalCount(prev => prev + difference);

        fleetCrystalsInCount.current = newPayout;

        let staleSession = LoadSession(true);
        if (staleSession === undefined) return;
        staleSession.FleetPayout = payoutGroup;
        SaveSession(staleSession);
    }

    useEffect(() => {
        function PageLoadSync() {
            const sessionLoad = LoadSession();
            if (sessionLoad === undefined || sessionLoad.FleetPayout === undefined) {
                return;
            }

            const fleetPayout = fleetPayoutMap[sessionLoad.FleetPayout]

            if (fleetPayout === undefined) {
                console.error(`fleetPayoutMap missing ${sessionLoad.FleetPayout}`);
                return;
            }

            setSelectedFleetPayout(sessionLoad.FleetPayout);
            syncCrystalCount(fleetPayout, sessionLoad.FleetPayout);
        };

        PageLoadSync();
    }, []);

    function onFleetCrystalsSelectorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "0") {
            return;
        }

        const selected = fleetPayoutMap[e.target.value];
        if (selected === undefined) {
            console.error(`Ran into e.target.value not being in fleetPayoutMap in onFleetCrystalsSelectorChange! e.target.value: ${e.target.value}`);
            return;
        }

        setSelectedFleetPayout(e.target.value);
        syncCrystalCount(selected, e.target.value);
    }

    return (
        <Card>
            <CardHeader style={{ marginBottom: "5px" }}>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Fleet Payout</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>On average, what is your position in fleet arena?</p>
            </CardHeader>
            <CardRow>
                <select id="fleetCrystalsSelector" value={selectedFleetPayout} onChange={onFleetCrystalsSelectorChange} className="common-button" style={{ marginTop: "0px" }}>
                    <option key="fleetCrystalsSelectorDefault" value="0">Select Fleet Payout</option>
                    {Object.entries(fleetPayoutMap).map(([position, payout]) => (
                        <option key={position} value={position}>
                            {`${position} (${payout} crystals)`}
                        </option>
                    ))}
                </select>
            </CardRow>
        </Card>
    )
}

const fleetPayoutMap: Record<string, number> = {
    "1st": 400,
    "2nd": 375,
    "3rd": 350,
    "4th": 325,
    "5th": 300,
    "6th - 10th": 200,
    "11th - 20th": 100,
    "21st - 50th": 50,
    "51st+": 0
}
