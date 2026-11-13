import { useEffect, useState } from "react";

import { Card, CardRow, CardHeader } from "../page"

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { fleetPayoutMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function FleetOption() {
    const ctx = useCrystalCalcCtx();

    const [selectedFleetPayout, setSelectedFleetPayout] = useState("-1");

    function syncCrystalCount(newPayout: number, payoutGroup: string) {
        ctx.SetCrystalsCounted(prev => ({
            ...prev,
            "FleetOption_Fleet Arena": newPayout
        }));

        ctx.LocalStorageManager.data.FleetPayout = payoutGroup;
        ctx.LocalStorageManager.SaveSession();
    }

    useEffect(() => {
        function PageLoadSync() {
            if (ctx.LocalStorageManager.data.FleetPayout === undefined) {
                return;
            }

            const fleetPayout = fleetPayoutMap[ctx.LocalStorageManager.data.FleetPayout]

            if (fleetPayout === undefined) {
                console.error(`fleetPayoutMap missing ${ctx.LocalStorageManager.data.FleetPayout}`);
                return;
            }

            setSelectedFleetPayout(ctx.LocalStorageManager.data.FleetPayout);
            syncCrystalCount(fleetPayout, ctx.LocalStorageManager.data.FleetPayout);
        };

        PageLoadSync();
    }, []);

    function onFleetCrystalsSelectorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "-1") {
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
                <select id="fleetCrystalsSelector" value={selectedFleetPayout} onChange={onFleetCrystalsSelectorChange} className="common-button truncate-select" style={{ marginTop: "0px" }}>
                    <option key="fleetCrystalsSelectorDefault" value="-1">Select Fleet Payout</option>
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
