import { useEffect, useState } from "react";

import { Card, CardRow, CardHeader } from "../page"

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { gacLeaguesMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function GacOption() {
    const ctx = useCrystalCalcCtx();

    const [selectedGacLeague, setSelectedGacLeague] = useState("-1");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function setCrystal() {
            const profit = gacLeaguesMap[selectedGacLeague] ?? 0;

            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "Gac_GAC Rewards": profit,
            }));
        }

        setCrystal();
    }, [selectedGacLeague, ready]);

    useEffect(() => {
        function defInit() {
            setSelectedGacLeague(ctx.LocalStorageManager.data.GacLeague ?? "-1");
        }

        defInit();
        setReady(true);
    }, []);

    useEffect(() => {
        function saveSession() {
            ctx.LocalStorageManager.data.GacLeague = selectedGacLeague;
            ctx.LocalStorageManager.SaveSession();
        }

        if (!ready) return;
        saveSession();
    }, [selectedGacLeague, ready]);

    function onGacLeagueSelectorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedGacLeague(e.target.value);
    }

    return (
        <Card>
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Grand Arena</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>What GAC league are you?</p>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>Note: your profit is assuming 5 wins 4 losses per month</p>
            </CardHeader>
            <CardRow>
                <select id="gacLeagueSelector" value={selectedGacLeague} onChange={onGacLeagueSelectorChange} className="common-button truncate-select" style={{ marginTop: "0px" }}>
                    <option key="gacLeagueSelectorDefault" value="-1">Select GAC League</option>
                    {Object.entries(gacLeaguesMap).map(([league, payout]) => (
                        <option key={`gacLeagueSelector_${league}`} value={league}>
                            {`${league} (${Math.floor(payout).toLocaleString()} crystals)`}
                        </option>
                    ))}
                </select>
            </CardRow>
        </Card>
    )
}