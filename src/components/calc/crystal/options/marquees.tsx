import { useEffect, useState } from "react";

import { CardRow, CardHeader } from "../page"
import { CollapsibleCard } from "../collapsibleCard";

import { useCrystalCalcCtx } from "../../../../ts/calc/crystal/context";

import { marqueeNoEpMap, marqueeEpMap } from "./lotsOfDataThatIDidntLikeInOtherFiles";

export default function MarqueeOption() {
    const ctx = useCrystalCalcCtx();

    const [marqueeCount, setMarqueeCount] = useState("-1");
    const [ePass, setEPass] = useState("-1");
    const [stars, setStars] = useState("-1");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        function defInit() {
            setMarqueeCount(ctx.LocalStorageManager.data.Marquee_Count ?? "-1");
            setEPass(ctx.LocalStorageManager.data.Marquee_EPass ?? "-1");
            setStars(ctx.LocalStorageManager.data.Marquee_Stars ?? "-1")
        }

        defInit()
        setReady(true);
    }, []);

    useEffect(() => {
        function setLocalStorage() {
            ctx.LocalStorageManager.data.Marquee_Count = marqueeCount;
            ctx.LocalStorageManager.data.Marquee_EPass = ePass;
            ctx.LocalStorageManager.data.Marquee_Stars = stars;
            ctx.LocalStorageManager.SaveSession();
        }

        function calc() {
            let marqueeCost: number | undefined = undefined;
            if (ePass === "0") {
                marqueeCost = marqueeEpMap[stars];
            } else {
                marqueeCost = marqueeNoEpMap[stars];
            }

            if (marqueeCost === undefined || marqueeCount === "0" || marqueeCount === "-1") {
                console.warn(`Failed to calc marqueeCost. ${ePass} ${stars}`);
                ctx.SetCrystalsCounted(prev => ({
                    ...prev,
                    "Expense_Marquee_Marquees": 0
                }));

                return;
            }

            if (marqueeCount === "2") {
                marqueeCost *= 2
            }

            ctx.SetCrystalsCounted(prev => ({
                ...prev,
                "Expense_Marquee_Marquees": (marqueeCost / 28) * -1
            }));
        }

        if (!ready) return;
        calc();
        setLocalStorage();
    }, [marqueeCount, ePass, stars, ready]);

    function onMarqueeCountSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setMarqueeCount(e.target.value);
    }

    function onStarSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setStars(e.target.value);
    }

    function onEpSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setEPass(e.target.value);
    }

    return (
        <CollapsibleCard title="Marquees">
            <CardHeader>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Marquees</h2>
                <p style={{ marginBottom: "0px", marginTop: "5px" }}>What costs do you have from Marquees?</p>
            </CardHeader>

            <CardRow>
                <h3 style={{ marginBottom: "0px", marginTop: "20px" }}>How many Marquees are you rushing?</h3>
                <select id="marqueeCountSelector" value={marqueeCount} onChange={onMarqueeCountSelect} className="common-button truncate-select" style={{ marginTop: "10px" }}>
                    <option key="marqueeCountSelectorDefault" value="-1">Select Marquee Upgrade Count</option>
                    <option key="marqueeCountSelector0" value="0">Zero</option>
                    <option key="marqueeCountSelector1" value="1">One</option>
                    <option key="marqueeCountSelector2" value="2">Two</option>
                </select>

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>What is your star goal?</h3>
                <select id="starSelector" value={stars} onChange={onStarSelect} className="common-button truncate-select" style={{ marginTop: "10px" }}>
                    <option key="starSelectorDefault" value="-1">Select Star Goal</option>
                    <option key="starSelector3" value="0">3 star (no packs)</option>
                    {Object.entries(marqueeNoEpMap).map(([goal, cost]) => (
                        <option key={`starSelector_${goal}`} value={goal}>
                            {`${goal} (${cost} crystals, no EP)`}
                        </option>
                    ))}
                </select>

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>Do you buy the Episode Pass?</h3>
                <select id="epSelector" value={ePass} onChange={onEpSelect} className="common-button truncate-select" style={{ marginTop: "10px" }}>
                    <option key="epSelectorNo" value="-1">No</option>
                    <option key="epSelectorYes" value="0">Yes</option>
                </select>
            </CardRow>
        </CollapsibleCard>
    )
}