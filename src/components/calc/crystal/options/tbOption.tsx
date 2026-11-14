import { useEffect, useState } from "react";

import { CardRow, CardHeader } from "../page"
import { CollapsibleCard } from "../collapsibleCard";

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { DSHothPayoutMap, LSHothPayoutMap, DSGeoPayoutMap, LSGeoPayoutMap, RotePayoutMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function TBOption() {
    const ctx = useCrystalCalcCtx();

    const [selectedDSTB, setSelectedDSTB] = useState("0");
    const [selectedLSTB, setSelectedLSTB] = useState("0");
    const [selectedStarDS, setSelectedStarDS] = useState("0");
    const [selectedStarLS, setSelectedStarLS] = useState("0");
    const [selectedStarMapDS, setSelectedStarMapDS] = useState<Record<string, number>>({ "Select TB First": 0 });
    const [selectedStarMapLS, setSelectedStarMapLS] = useState<Record<string, number>>({ "Select TB First": 0 });
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function syncPayout() {
            const dsCrystals = selectedStarMapDS[selectedStarDS] ?? 0;
            const lsCrystals = selectedStarMapLS[selectedStarLS] ?? 0;

            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "TBOption_DS TB": dsCrystals / 28,
                "TBOption_LS TB": lsCrystals / 28,
            }))
        }

        function syncLocalStorage() {
            ctx.LocalStorageManager.data.TBOptionData = `${selectedDSTB}||${selectedLSTB}||${selectedStarDS}||${selectedStarLS}`;
            ctx.LocalStorageManager.SaveSession();
        }

        if (!ready) return;
        syncPayout();
        syncLocalStorage();
    }, [selectedDSTB, selectedLSTB, selectedStarDS, selectedStarLS, selectedStarMapDS, selectedStarMapLS, ready])

    useEffect(() => {
        function loadLocalStorage() {
            if (ctx.LocalStorageManager.data.TBOptionData === undefined) return;

            const parts = ctx.LocalStorageManager.data.TBOptionData.split("||")
            if (parts.length !== 4) {
                console.error(`Invalid length parts: ${parts.length}, ${parts}`);
                return;
            }

            try {
                if (parts[0] === undefined || parts[1] === undefined || parts[2] === undefined || parts[3] === undefined) return;
            } catch (e) {
                console.error(`Part was somehow undefined ${parts}`);
            }

            setSelectedDSTB(parts[0]);
            setSelectedLSTB(parts[1]);
            setSelectedStarDS(parts[2]);
            setSelectedStarLS(parts[3]);
            setMap(parts[0], true);
            setMap(parts[1], false);
        }

        loadLocalStorage();
        setReady(true);
    }, []);

    function setMap(selectedTB: string, isDS: boolean) {
        if (isDS) {
            setSelectedDSTB(selectedTB);
            switch (selectedTB) {
                case "1":
                    setSelectedStarMapDS(DSHothPayoutMap);
                    break;
                case "2":
                    setSelectedStarMapDS(DSGeoPayoutMap);
                    break;
                case "3":
                    setSelectedStarMapDS(RotePayoutMap);
                    break;
                case "0":
                case "-1":
                    break;
                default:
                    console.error(`Unknown TB value selected somehow: ${selectedTB}`);
                    return;
            }
        } else {
            setSelectedLSTB(selectedTB);
            switch (selectedTB) {
                case "1":
                    setSelectedStarMapLS(LSHothPayoutMap);
                    break;
                case "2":
                    setSelectedStarMapLS(LSGeoPayoutMap);
                    break;
                case "3":
                    setSelectedStarMapLS(RotePayoutMap);
                    break;
                case "0":
                case "-1":
                    break;
                default:
                    console.error(`Unknown TB value selected somehow: ${selectedTB}`);
                    return;
            }
        }
    }

    function onChangeSelectTB(e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>, isDS: boolean) {
        if (e.target.value === "0") return;

        if (e.target.value !== selectedDSTB && isDS) {
            setSelectedStarDS("-1");
        } else if (e.target.value !== selectedLSTB && !isDS) {
            setSelectedStarLS("-1")
        }

        setMap(e.target.value, isDS);
    }

    function onChangeSelectTBStar(e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>, isDS: boolean) {
        if (e.target.value === "-1") return;

        if (isDS) {
            setSelectedStarDS(e.target.value);
        } else {
            setSelectedStarLS(e.target.value);
        }
    }

    return (
        <CollapsibleCard title="Territory Battles">
            <CardHeader style={{ marginBottom: "0px" }}>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Territory Battles</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>On average, what do you get from TB?</p>
            </CardHeader>
            <CardRow>
                <select id="tbSelectorDS" value={selectedDSTB} onChange={(e) => onChangeSelectTB(e, true)} className="common-button truncate-select" style={{ marginTop: "0px" }}>
                    <option key="tbSelectorDSDefault" value="0">Select DS TB</option>
                    <option key="tbSelectorDSHoth" value="1">DS Hoth</option>
                    <option key="tbSelectorDSGeo" value="2">DS Geo</option>
                    <option key="tbSelectorDSRote" value="3">RoTE</option>
                </select>

                <select id="tbStarSelectorDS" value={selectedStarDS} onChange={(e) => onChangeSelectTBStar(e, true)} className="common-button truncate-select" style={{ marginTop: "3px" }}>
                    <option key="tbSelectorDSDefault" value="-1">Select DS TB Star Count</option>
                    {Object.entries(selectedStarMapDS).map(([starCount, payout]) => (
                        <option key={`tbSelectorDS-${starCount}`} value={starCount}>
                            {`${starCount} (${payout} crystals)`}
                        </option>
                    ))}
                </select>

                <select id="tbSelectorLS" value={selectedLSTB} onChange={(e) => onChangeSelectTB(e, false)} className="common-button truncate-select" style={{ marginTop: "10px" }}>
                    <option key="tbSelectorLSDefault" value="0">Select LS TB</option>
                    <option key="tbSelectorLSHoth" value="1">LS Hoth</option>
                    <option key="tbSelectorLSGeo" value="2">LS Geo</option>
                    <option key="tbSelectorLSRote" value="3">RoTE</option>
                </select>

                <select id="tbStarSelectorLS" value={selectedStarLS} onChange={(e) => onChangeSelectTBStar(e, false)} className="common-button truncate-select" style={{ marginTop: "3px" }}>
                    <option key="tbSelectorLSDefault" value="-1">Select LS TB Star Count</option>
                    {Object.entries(selectedStarMapLS).map(([starCount, payout]) => (
                        <option key={`tbSelectorLS-${starCount}`} value={starCount}>
                            {`${starCount} (${payout} crystals)`}
                        </option>
                    ))}
                </select>
            </CardRow>
        </CollapsibleCard>
    );
}
