import { useEffect, useState } from "react";

import { CardRow, CardHeader } from "../page"
import { CollapsibleCard } from "../collapsibleCard";

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";
import type { IEnergyRefresh } from "../../../../ts/calc/crystal/LocalStorageManager"

import { energyRefresh, cantinaEnergyRefresh } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function EnergyOption() {
    const ctx = useCrystalCalcCtx();

    const [energy, setEnergy] = useState<IEnergyRefresh>({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function defInit() {
            setEnergy(ctx.LocalStorageManager.data.EnergyRefresh ?? {});
        }

        defInit();
        setReady(true);
    }, []);

    useEffect(() => {
        function save() {
            ctx.LocalStorageManager.data.EnergyRefresh = energy;
            ctx.LocalStorageManager.SaveSession();
        }

        function calc() {
            let totalCost = 0;

            if (energy.Normal !== undefined) {
                totalCost -= energyRefresh[energy.Normal] ?? 0;
            }

            if (energy.Cantina !== undefined) {
                totalCost -= cantinaEnergyRefresh[energy.Cantina] ?? 0;
            }

            if (energy.Mod !== undefined) {
                totalCost -= energyRefresh[energy.Mod] ?? 0;
            }

            if (energy.Ship !== undefined) {
                totalCost -= energyRefresh[energy.Ship] ?? 0;
            }

            if (energy.Conquest !== undefined) {
                totalCost -= (energyRefresh[energy.Conquest] ?? 0) / 2;
            }

            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "Expense_Energy_Energy Refreshes": totalCost
            }));
        }

        if (!ready) return;
        calc();
        save();
    }, [energy, ready]);

    return (
        <CollapsibleCard title="Energy Refreshes">
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Energy Refreshes</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>How many energy refreshes do you do?</p>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>Note: Conquest refreshes are half cost in final tally due to only being a thing half the month.</p>
            </CardHeader>

            {[
                { key: "Normal", costs: energyRefresh, defValue: energy.Normal },
                { key: "Cantina", costs: cantinaEnergyRefresh, defValue: energy.Cantina },
                { key: "Mod", costs: energyRefresh, defValue: energy.Mod },
                { key: "Ship", costs: energyRefresh, defValue: energy.Ship },
                { key: "Conquest", costs: energyRefresh, defValue: energy.Conquest }
            ].map(({ key, costs, defValue }) => (
                <CardRow key={key}>
                    <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
                        <label style={{ flex: 0.2 }} className="common-button" >{key + ":"}</label>

                        <EnergySelector
                            id={`energy${key}`}
                            label={key}
                            value={defValue ?? "-1"}
                            costs={costs}
                            onChange={(value) => setEnergy(prev => ({ ...prev, [key]: value }))}
                        />
                    </div>
                </CardRow>
            ))}
        </CollapsibleCard>
    )
}

interface EnergySelectorProps {
    id: string;
    label: string;
    value: string;
    costs: Record<string, number>;
    onChange: (value: string) => void;
}

function EnergySelector({ id, label, value, costs, onChange }: EnergySelectorProps) {
    return (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="common-button truncate-select"
            style={{ flex: 1, minWidth: 0 }}
        >
            <option value="-1">Select {label} Energy Refreshes</option>

            {Object.entries(costs).map(([count, cost]) => (
                <option key={`${id}_${count}`} value={count}>
                    {`${count} (${cost} crystals)`}
                </option>
            ))}
        </select>
    );
}