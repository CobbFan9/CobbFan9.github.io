import { useEffect, useState } from "react";

import { Card, CardRow, CardHeader } from "../page"

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { shardRefreshMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function NodeRefresh() {
    const ctx = useCrystalCalcCtx();

    const [hardNodeUnits, setHardNodeUnits] = useState<string[]>(Array(6).fill(""));
    const [selectedHardNodeRefreshes, setSelectedHardNodeRefreshes] = useState<string[]>(Array(6).fill("-1"));
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function calculateCrystalCost(): number {
            let cost = 0;

            for (const hardNodeRefresh of selectedHardNodeRefreshes) {
                if (hardNodeRefresh === "0") continue;

                const refCost = shardRefreshMap[hardNodeRefresh];
                if (refCost === undefined) continue;

                cost -= refCost;
            }

            return cost;
        }

        function setCrystalCost() {
            const cost = calculateCrystalCost();
            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "Expense_NodeRefresh_Node Refreshes": cost,
            }));
        }

        setCrystalCost();
    }, [selectedHardNodeRefreshes, ready]);

    useEffect(() => {
        function defInit() {
            setHardNodeUnits(ctx.LocalStorageManager.data.NodeRefreshUnits ?? Array(6).fill(""));
            setSelectedHardNodeRefreshes(ctx.LocalStorageManager.data.NodeRefreshSelected ?? Array(6).fill(""));
        }

        defInit();
        setReady(true);
    }, []);

    useEffect(() => {
        function saveHardNodeUnits() {
            ctx.LocalStorageManager.data.NodeRefreshUnits = hardNodeUnits;
            ctx.LocalStorageManager.SaveSession();
        }

        if (!ready) return;
        saveHardNodeUnits();
    }, [hardNodeUnits, ready]);

    useEffect(() => {
        function saveNodeRefreshes() {
            ctx.LocalStorageManager.data.NodeRefreshSelected = selectedHardNodeRefreshes;
            ctx.LocalStorageManager.SaveSession();
        }

        if (!ready) return;
        saveNodeRefreshes();
    }, [selectedHardNodeRefreshes, ready])

    function onNodeRefreshSelect(e: React.ChangeEvent<HTMLSelectElement>, index: number) {
        const newValues = [...selectedHardNodeRefreshes];
        newValues[index] = e.target.value;

        setSelectedHardNodeRefreshes(newValues);
    }

    function onNodeUnitChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const newValues = [...hardNodeUnits];
        newValues[index] = e.target.value;

        setHardNodeUnits(newValues);
    }

    return (
        <Card>
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Hard Node Refreshes</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>What do your daily node refreshes look like?</p>
            </CardHeader>

            {hardNodeUnits.map((unit, index) => (
                <CardRow key={index}>
                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                        <input type="text" value={unit} onChange={(e) => onNodeUnitChange(e, index)} placeholder="Unit" style={{ flex: 1, minWidth: 0 }} className="common-button" />

                        <select id={`nodeRefreshSelector${index + 1}`} value={selectedHardNodeRefreshes[index]} onChange={(e) => onNodeRefreshSelect(e, index)} className="common-button" style={{ flex: 1, minWidth: 0 }}>
                            <option value="-1">Select Hard Node Refreshes</option>

                            {Object.entries(shardRefreshMap).map(([count, price]) => (
                                <option key={count} value={count}>
                                    {`${count} (${price} crystals)`}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardRow>
            ))}
        </Card>
    )
}