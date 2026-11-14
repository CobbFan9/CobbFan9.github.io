import { useEffect, useState } from "react";
import styled from "styled-components";

import { CardRow, CardHeader } from "../page"
import { CollapsibleCard } from "../collapsibleCard";

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { ebMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function EbOption() {
    const ctx = useCrystalCalcCtx();

    const [selectedEb1, setSelectedEb1] = useState("-1");
    const [selectedEb2, setSelectedEb2] = useState("-1");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function loadLocalStorage() {
            setSelectedEb1(ctx.LocalStorageManager.data.SelectedEb1 ?? "-1");
            setSelectedEb2(ctx.LocalStorageManager.data.SelectedEb2 ?? "-1");
        }

        loadLocalStorage();
        setReady(true);
    }, [])

    useEffect(() => {
        function setLocalStorage(eb1: string, eb2: string) {
            ctx.LocalStorageManager.data.SelectedEb1 = eb1;
            ctx.LocalStorageManager.data.SelectedEb2 = eb2;
            ctx.LocalStorageManager.SaveSession();
        }

        function setEBs() {
            if (selectedEb1 !== "-1") {
                const payout = ebMap[selectedEb1];
                if (payout === undefined) {
                    console.error(`Missing eb1 define: ${selectedEb1}`);
                } else {
                    ctx.SetCrystalsCounted(prev => ({
                        ...prev,
                        "EB_Era Battle 1": payout * 2 / 28
                    }));
                }
            }

            if (selectedEb2 !== "-1") {
                const payout = ebMap[selectedEb2];
                if (payout === undefined) {
                    console.error(`Missing eb2 define: ${selectedEb2}`);
                } else {
                    ctx.SetCrystalsCounted(prev => ({
                        ...prev,
                        "EB_Era Battle 2": payout * 2 / 28
                    }));
                }
            }
        }

        if (!ready) return;
        setEBs();
        setLocalStorage(selectedEb1, selectedEb2);
    }, [selectedEb1, selectedEb2, ready])

    function onEb1Select(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedEb1(e.target.value);
    }

    function onEb2Select(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedEb2(e.target.value);
    }

    return (
        <CollapsibleCard title="Era Battles">
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Era Battles</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>What rewards do you get from Era Battles?</p>
            </CardHeader>

            <CardRow>
                <SelectorSizeSetter>
                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Era Battle 1 (With JG Unit)</h3>
                    <select id="eb1Selector" value={selectedEb1} onChange={onEb1Select} className="common-button truncate-select" style={{ marginTop: "7px" }}>
                        <option key="eb1electorDefault" value="-1">Select Era Battle 1 Rewards</option>
                        {Object.entries(ebMap).map(([level, payout]) => (
                            <option key={`eb1Selector_${level}`} value={level}>
                                {`${level} (${payout} crystals)`}
                            </option>
                        ))}
                    </select>

                    <h3 style={{ marginBottom: "0px", marginTop: "20px" }}>Era Battle 2 (Without JG Unit)</h3>
                    <select id="eb2Selector" value={selectedEb2} onChange={onEb2Select} className="common-button truncate-select" style={{ marginTop: "7px" }}>
                        <option key="eb2electorDefault" value="-1">Select Era Battle 2 Rewards</option>
                        {Object.entries(ebMap).map(([level, payout]) => (
                            <option key={`eb2Selector_${level}`} value={level}>
                                {`${level} (${payout} crystals)`}
                            </option>
                        ))}
                    </select>
                </SelectorSizeSetter>
            </CardRow>
        </CollapsibleCard>
    )
}

const SelectorSizeSetter = styled.div`
    select {
        display: block;
        width: 100%;
    }
`;