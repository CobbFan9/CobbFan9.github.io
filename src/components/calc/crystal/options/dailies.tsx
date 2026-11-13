import { useEffect, useState } from "react";

import { Card, CardRow, CardHeader } from "../page"

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

export default function Dailies() {
    const ctx = useCrystalCalcCtx();

    const [selectedKesselRun, setSelectedKesselRun] = useState("-1");

    useEffect(() => {
        function defInit() {
            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "Dailies_Daily Activities": 70,
                "Dailies_Galactic War": 25,
                "Dailies_Galactic Bounties": 3.33,
                "Dailies_Login Calender": 13.33
            }));
        }

        function loadLocalStorage() {
            setSelectedKesselRun(ctx.LocalStorageManager.data.KesselRun ?? "-1");
        }

        loadLocalStorage();
        defInit();
    }, [])

    useEffect(() => {
        function setLocalStorageKessel(input: string) {
            ctx.LocalStorageManager.data.KesselRun = input
            ctx.LocalStorageManager.SaveSession();
        }

        function setKesselRun() {
            if (selectedKesselRun === "0") {
                ctx.SetCrystalsCounted(prev => ({
                    ...prev,
                    "Dailies_Kessel Run": 7.14
                }));
            } else {
                ctx.SetCrystalsCounted(prev => ({
                    ...prev,
                    "Dailies_Kessel Run": 0
                }));
            }

            setLocalStorageKessel(selectedKesselRun);
        }

        setKesselRun();
    }, [selectedKesselRun])

    function onKesselRunSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedKesselRun(e.target.value);
    }

    return (
        <Card>
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Kessel Run</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>Do you usually do kessel run daily?</p>
            </CardHeader>

            <CardRow>
                <select id="kesselRunSelector" value={selectedKesselRun} onChange={onKesselRunSelect} className="common-button truncate-select" style={{ marginTop: "0px" }}>
                    <option key="kesselRunSelectorDefault" value="-1">Select Kessel Run Participation</option>
                    <option key="kesselRunSelectorYes" value="0">Yes</option>
                    <option key="kesselRunSelectorNo" value="1">No</option>
                </select>
            </CardRow>
        </Card>
    )
}