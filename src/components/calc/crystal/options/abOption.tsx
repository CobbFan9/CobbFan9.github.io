import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card, CardRow, CardHeader } from "../page"

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { abMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function AbOption() {
    const ctx = useCrystalCalcCtx();

    const [selectedDothF, setSelectedDotF] = useState("-1");
    const [selectedPaw, setSelectedPaw] = useState("-1");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function loadLocalStorage() {
            setSelectedDotF(ctx.LocalStorageManager.data.SelectedDothF ?? "-1");
            setSelectedPaw(ctx.LocalStorageManager.data.SelectedPaw ?? "-1");
        }

        loadLocalStorage();
        setReady(true);
    }, [])

    useEffect(() => {
        function setLocalStorage(dothF: string, paw: string) {
            ctx.LocalStorageManager.data.SelectedDothF = dothF
            ctx.LocalStorageManager.data.SelectedPaw = paw
            ctx.LocalStorageManager.SaveSession();
        }

        function setABs() {
            if (selectedDothF !== "-1") {
                const payout = abMap[selectedDothF];
                if (payout === undefined) {
                    console.error(`Missing dothf define: ${selectedDothF}`);
                } else {
                    ctx.SetCrystalsCounted(prev => ({
                        ...prev,
                        "AB_Dual of the Fates": payout / 30
                    }));
                }
            }

            if (selectedPaw !== "-1") {
                const payout = abMap[selectedPaw];
                if (payout === undefined) {
                    console.error(`Missing paw define: ${selectedPaw}`);
                } else {
                    ctx.SetCrystalsCounted(prev => ({
                        ...prev,
                        "AB_Peridia Patrol": payout / 30
                    }));
                }
            }
        }

        if (!ready) return;
        setABs();
        setLocalStorage(selectedDothF, selectedPaw);
    }, [selectedDothF, selectedPaw, ready])

    function onDothFSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedDotF(e.target.value);
    }

    function onPawSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPaw(e.target.value);
    }

    return (
        <Card>
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Assault Battles</h2>
            </CardHeader>

            <CardRow>
                <SelectorSizeSetter>
                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Dual of the Fates</h3>
                    <select id="dothFSelector" value={selectedDothF} onChange={onDothFSelect} className="common-button truncate-select" style={{ marginTop: "7px" }}>
                        <option key="dothFSelectorDefault" value="-1">Select Dual of the Fates rewards</option>
                        {Object.entries(abMap).map(([level, payout]) => (
                            <option key={`dothFSelector_${level}`} value={level}>
                                {`${level} (${payout} crystals)`}
                            </option>
                        ))}
                    </select>

                    <h3 style={{ marginBottom: "0px", marginTop: "20px" }}>Peridia Patrol</h3>
                    <select id="pawelector" value={selectedPaw} onChange={onPawSelect} className="common-button truncate-select" style={{ marginTop: "7px" }}>
                        <option key="pawSelectorDefault" value="-1">Select Peridia Patrol rewards</option>
                        {Object.entries(abMap).map(([level, payout]) => (
                            <option key={`pawSelector_${level}`} value={level}>
                                {`${level} (${payout} crystals)`}
                            </option>
                        ))}
                    </select>
                </SelectorSizeSetter>
            </CardRow>
        </Card>
    )
}

const SelectorSizeSetter = styled.div`
    select {
        display: block;
        width: 100%;
    }
`;