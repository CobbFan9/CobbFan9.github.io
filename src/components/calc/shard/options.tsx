import { useState, useEffect } from "react";
import styled from "styled-components";

import { Card, CardRow, CardHeader } from "./page";

interface OptionsProps {
    setTimeTo7: React.Dispatch<React.SetStateAction<number>>;
}

export default function Options({ setTimeTo7 }: OptionsProps) {
    const [starGoal, setStarGoal] = useState("-1");
    const [shardsObtained, setShardsObtained] = useState("0");
    const [accelerated, setAccelerated] = useState("-1");
    const [currentStar, setCurrentStar] = useState("-1");
    const [simsPerDay, setSimsPerDay] = useState("1");

    useEffect(() => {
        function calc() {
            const shardsSpent = starLevelReqs[currentStar] ?? 0;
            const shardGoal = starLevelReqs[starGoal] ?? 330;
            const shardsOwned = shardsSpent + Number(shardsObtained);
            const shardsNeeded = shardGoal - Number(shardsOwned);

            const simsNeeded = shardsNeeded / (1 / 3);
            const timeNeeded = simsNeeded / Number(simsPerDay);

            if (accelerated === "1") {
                setTimeTo7(timeNeeded * 2);
            } else {
                setTimeTo7(timeNeeded);
            }
        }

        if (Number(simsPerDay) <= 0) return;
        calc();
    }, [starGoal, shardsObtained, accelerated, currentStar, simsPerDay]);

    return (
        <Card>
            <CardRow>
                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>What star are you trying to reach?</h3>
                <select id="starGoalSelector" value={starGoal} onChange={(e) => setStarGoal(e.target.value)} className="common-button truncate-select" style={{ marginTop: "6px" }}>
                    <option key="starGoalSelectorDefault" value="-1">Select Star Goal</option>
                    {Object.entries(starLevelReqs).map(([starCount, _]) => (
                        <option key={`starGoalSelector-${starCount}`} value={starCount}>
                            {`${starCount}`}
                        </option>
                    ))}
                </select>

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>What is your current star?</h3>
                <select id="currentStarSelector" value={currentStar} onChange={(e) => setCurrentStar(e.target.value)} className="common-button truncate-select" style={{ marginTop: "6px" }}>
                    <option key="starGoalSelectorDefault" value="-1">Select Current Star</option>
                    {Object.entries(starLevelReqs).map(([starCount, _]) => (
                        <option key={`starGoalSelector-${starCount}`} value={starCount}>
                            {`${starCount}`}
                        </option>
                    ))}
                </select>

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>Is the unit accelerated?</h3>
                <select id="acceleratedSelector" value={accelerated} onChange={(e) => setAccelerated(e.target.value)} className="common-button truncate-select" style={{ marginTop: "6px" }}>
                    <option key="acceleratedSelectorDefault" value="-1">Select Accelerated</option>
                    <option key="acceleratedSelectorNo" value="0">No</option>
                    <option key="acceleratedSelectorYes" value="1">Yes</option>
                </select>

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>How many shards do you have right now?</h3>
                <NumberInput type="number" id={"shardsObtainedSelector"} min="0" max="330" style={{ marginTop: "6px" }}
                    value={shardsObtained} onChange={(e) => setShardsObtained(e.target.value)}
                    onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()} className="common-button" />

                <h3 style={{ marginBottom: "0px", marginTop: "25px" }}>How many sims will you do per day?</h3>
                <NumberInput type="number" id={"simsPerDaySelector"} min="1" max="100" style={{ marginTop: "6px" }}
                    value={simsPerDay} onChange={(e) => setSimsPerDay(e.target.value)}
                    onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()} className="common-button" />
            </CardRow>
        </Card>
    )
}

const starLevelReqs: Record<string, number> = {
    "0": 0,
    "1": 10,
    "2": 25,
    "3": 50,
    "4": 80,
    "5": 145,
    "6": 230,
    "7": 330
}

const NumberInput = styled.input`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    width: 100px;
    padding: 10px 14px;
    border: 2px solid var(--button-hover);
    border-radius: 6px;
    background: var(--card-background-dark);
    color: var(--text-dark);
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;