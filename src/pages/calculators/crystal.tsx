import { useState, useEffect } from "react";

import { Card, CardRow, CardHeader, CardDescription, Page } from "../../components/calc/crystal/page"

import FleetOption from "../../components/calc/crystal/options/fleetOption";
import TBOption from "../../components/calc/crystal/options/tbOption";
import Dailies from "../../components/calc/crystal/options/dailies";
import NodeRefresh from "../../components/calc/crystal/options/nodeRefresh";
import GacOption from "../../components/calc/crystal/options/gacOption";
import AbOption from "../../components/calc/crystal/options/abOption";
import EbOption from "../../components/calc/crystal/options/ebOption";
import MarqueeOption from "../../components/calc/crystal/options/marquees";
import EnergyOption from "../../components/calc/crystal/options/energyOption"

import type { CrystalCalcContext } from "../../ts/calc/crystal/context";
import { useCrystalCalcCtx, CrystalCalcCtx } from "../../ts/calc/crystal/context";

import LocalStorageManager from "../../ts/calc/crystal/LocalStorageManager";

const calcOptions: React.ComponentType[] = [
    Dailies,
    GacOption,
    FleetOption,
    TBOption,
    AbOption,
    EbOption,

    MarqueeOption,
    EnergyOption,
    NodeRefresh,
]

const calcWeights: Record<string, number> = {
    "Gac": 0,
    "TBOption": 1,
    "Dailies": 2,
    "FleetOption": 3,
    "AB": 4,
    "EB": 5,

    "Expenses_Marquee": 0,
    "Expense_Energy": 1,
    "Expenses_NodeRefresh": 2,
}

export default function CrystalCalc() {
    const [crystalsCounted, setCrystalsCounted] = useState<Record<string, number>>({})

    let ctx: CrystalCalcContext = {
        CrystalsCounted: crystalsCounted,
        SetCrystalsCounted: setCrystalsCounted,
        LocalStorageManager: new LocalStorageManager(),
    }

    return (
        <CrystalCalcCtx.Provider value={ctx}>
            <Page>
                <TopCard />

                {calcOptions.map((Option, index) => (
                    <Option key={index} />
                ))}

                <BottomCard />
            </Page>
        </CrystalCalcCtx.Provider>
    )
}

function TopCard() {
    return (
        <Card>
            <CardHeader>
                <h1 style={{ marginBottom: "5px", marginTop: "5px" }}>SWGoH Crystal Calculator</h1>

                <CardDescription style={{ marginBottom: "0px", marginTop: "5px" }}>
                    Calculate your daily and monthly crystal income
                    by answering a few questions.
                </CardDescription>
            </CardHeader>

            <p style={{ marginBottom: "0px", marginTop: "0px" }}>
                Your session data is automatically stored locally
                on your computer and is never sent to a server.
            </p>
        </Card>
    )
}

function BottomCard() {
    const ctx = useCrystalCalcCtx();

    const [crystalCount, setCrystalCount] = useState(0);
    const [orderedExplain, setOrderedExplain] = useState<Record<string, number>>({});
    const [expenseExplain, setExpenseExplain] = useState<Record<string, number>>({});

    useEffect(() => {
        function calcCrystalCount() {
            setCrystalCount(Object.values(ctx.CrystalsCounted ?? {}).reduce((total, amount) => total + (Number(amount) || 0), 0));
        }

        function genOrder() {
            function sortAndFormat(entries: [string, number][]) {
                return Object.fromEntries(
                    entries
                        .sort(([keyA], [keyB]) => {
                            const getWeight = (key: string) => {
                                const prefix = Object.keys(calcWeights).find(k =>
                                    key.startsWith(`${k}_`)
                                );
                                return prefix !== undefined ? calcWeights[prefix] : Infinity;
                            };

                            return getWeight(keyA) - getWeight(keyB);
                        })
                        .map(([key, value]) => [key.replace(/^[^_]+_/, ""), value])
                );
            }

            function removePrefix(entries: [string, number][], prefix: string): [string, number][] {
                return entries.map(([key, value]) => [key.startsWith(prefix) ? key.slice(prefix.length) : key, value]);
            }

            const entries = Object.entries(ctx.CrystalsCounted);

            setOrderedExplain(sortAndFormat(entries.filter(([key]) => !key.startsWith("Expense_"))));

            setExpenseExplain(sortAndFormat(removePrefix(entries.filter(([key]) => key.startsWith("Expense_")), "Expense_")));
        }

        calcCrystalCount();
        genOrder();
    }, [ctx.CrystalsCounted])

    function onClickClearData() {
        ctx.LocalStorageManager.Clear();
        window.location.reload();
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>Your Total Crystal Income</h2>
                </CardHeader>

                <CardRow>
                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Daily Income</h3>
                    <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>{crystalCount.toLocaleString()} crystals</h2>
                </CardRow>

                <CardRow>
                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Monthly Income</h3>
                    <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>{(crystalCount * 28).toLocaleString()} crystals</h2>
                </CardRow>

                <CardRow>
                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Income (Daily)</h3>
                    <ol style={{ listStylePosition: "inside", paddingLeft: 0 }}>
                        {Object.entries(orderedExplain).map(([name, crystals]) => (
                            <li key={`orderedExplain_${name}`} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", textAlign: "left" }}>
                                <span>{name}</span>
                                <span style={{ textAlign: "right" }}>
                                    {crystals.toLocaleString()} crystals
                                </span>
                            </li>
                        ))}
                    </ol>

                    <h3 style={{ marginBottom: "0px", marginTop: "5px" }}>Expenses (Daily)</h3>
                    <ol style={{ listStylePosition: "inside", paddingLeft: 0 }}>
                        {Object.entries(expenseExplain).map(([name, crystals]) => (
                            <li key={`expenseExplain_${name}`} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", textAlign: "left" }}>
                                <span>{name}</span>
                                <span style={{ textAlign: "right" }}>
                                    {crystals.toLocaleString()} crystals
                                </span>
                            </li>
                        ))}
                    </ol>
                </CardRow>
            </Card>

            <Card>
                <CardRow>
                    <button className="common-button" onClick={() => onClickClearData()}>Clear Data - NOT REVERSIBLE!</button>
                </CardRow>
            </Card>
        </>
    )
}