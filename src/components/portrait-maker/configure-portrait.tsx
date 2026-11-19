import styled from "styled-components";
import { useState } from "react";

import { Alignment } from "../swgohPortrait";

import { usePortraitMakerCtx } from "../../ts/portrait-maker/context";

import { Card, CardRow } from "./card"

export default function ConfigurePortrait() {
    return (
        <Card>
            <AbilityAndRelic />
            <AlignmentSwitch />
            <GLSelect />
        </Card>
    )
}

function AbilityAndRelic() {
    const ctx = usePortraitMakerCtx();

    function updateZetas(value: number) {
        ctx.setZetas(value);
        ctx.notify();
    }

    function updateOmis(value: number) {
        ctx.setOmis(value);
        ctx.notify();
    }

    function updateRelic(value: number) {
        ctx.setRelic(value);
        ctx.notify();
    }

    return (
        <CardRow>
            <InputContainer>
                <AbilityOrRelic label="Zetas:" startValue={0} onChange={updateZetas} />
                <AbilityOrRelic label="Omis:" startValue={0} onChange={updateOmis} />
                <AbilityOrRelic label="Relic:" startValue={0} onChange={updateRelic} />
            </InputContainer>
        </CardRow>
    )
}

type AbilityOrRelicProps = {
    label: string;
    startValue: number;
    onChange: (value: number) => void;
};

function AbilityOrRelic({ label, startValue, onChange }: AbilityOrRelicProps) {
    return (
        <InputGroup>
            <label htmlFor={`abilityOrRelic_${label}_${startValue}`}>{label}</label>
            <InputWrapper>
                <input type="number" id={`abilityOrRelic_${label}_${startValue}`} min="-999" max="999" 
                defaultValue={startValue} onChange={(e) => onChange(Number(e.target.value))} 
                onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()} />
            </InputWrapper>
        </InputGroup>
    )
}

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
        margin-bottom: 8px;
        font-weight: bold;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    color: var(--text-dark);
`;

const InputWrapper = styled.span`
    display: inline-flex;
    align-items: center;

    input[type="number"] {
        width: 80px;
        padding: 10px 14px;

        border: 2px solid var(--button-hover);
        border-radius: 6px;

        background: var(--card-background-dark);
        color: var(--text-dark);

        font-size: 16px;
        outline: none;

        transition: border-color 0.2s, box-shadow 0.2s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    input[type="number"]:focus {
        box-shadow: 0 0 0 2px var(--button-hover);
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

function AlignmentSwitch() {
    const [alignment, setAlignment] = useState(1);
    const ctx = usePortraitMakerCtx();

    function onChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setAlignment(Number(e.target.value));

        ctx.setAlignment(convertAlignment(Number(e.target.value)));
        ctx.notify();
    }

    return (
        <CardRow>
            <AlignContainer>
                <label htmlFor="switch">Alignment:</label>
                <AlignSwitch type="range" min="0" max="2" defaultValue="1" step="1" 
                $alignment={alignment} onChange={(e) => onChange(e)} />
                <AlignSwitchVals>
                    <span>Dark</span>
                    <span>Neutral</span>
                    <span>Light</span>
                </AlignSwitchVals>
            </AlignContainer>
        </CardRow>
    )
}

function convertAlignment(input: number) {
    switch (input) {
        case 0:
            return Alignment.Darkside;
        case 2:
            return Alignment.Lightside;
        default:
            return Alignment.Neutral;
    }
}

const AlignContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 30px;

    font-size: 18px;
    font-weight: 600;
    color: var(--text-dark);
`;

const AlignSwitch = styled.input<{ $alignment: number }>`
    width: 200px;
    height: 6px;

    appearance: none;
    -webkit-appearance: none;

    background: var(--border-dark);
    border-radius: 999px;
    outline: none;

    --thumb-color: ${({ $alignment }) => {
        switch ($alignment) {
            case 0:
                return "#dc2626";
            case 2:
                return "#2563eb";
            default:
                return "var(--text-dark)";
        }
    }};

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;

        width: 18px;
        height: 18px;
        border-radius: 50%;

        background: var(--thumb-color);
        border: 2px solid rgba(255,255,255,0.15);

        cursor: pointer;

        transition:
            transform 0.15s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;

        background: var(--thumb-color);
        border: 2px solid rgba(255,255,255,0.15);

        cursor: pointer;

        transition:
            transform 0.15s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
    }

    &:hover::-webkit-slider-thumb {
        transform: scale(1.1);
        box-shadow: 0 0 10px var(--thumb-color);
    }

    &:hover::-moz-range-thumb {
        transform: scale(1.1);
        box-shadow: 0 0 10px var(--thumb-color);
    }

    &:active::-webkit-slider-thumb {
        transform: scale(1.15);
        box-shadow: 0 0 16px var(--thumb-color);
    }

    &:active::-moz-range-thumb {
        transform: scale(1.15);
        box-shadow: 0 0 16px var(--thumb-color);
    }

    @keyframes thumbPulseRed {
        0% {
            box-shadow: 0 0 10px 3px rgba(220, 38, 38, 0.45);
        }

        50% {
            box-shadow: 0 0 18px 7px rgba(220, 38, 38, 0.75);
        }

        100% {
            box-shadow: 0 0 10px 3px rgba(220, 38, 38, 0.45);
        }
    }

    @keyframes thumbPulseBlue {
        0% {
            box-shadow: 0 0 10px 3px rgba(37, 99, 235, 0.45);
        }

        50% {
            box-shadow: 0 0 18px 7px rgba(37, 99, 235, 0.75);
        }

        100% {
            box-shadow: 0 0 10px 3px rgba(37, 99, 235, 0.45);
        }
    }

    &::-webkit-slider-thumb {
        background: ${({ $alignment }) =>
        $alignment === 0
            ? "#dc2626"
            : $alignment === 2
                ? "#2563eb"
                : "var(--text-dark)"};

        animation: ${({ $alignment }) =>
        $alignment === 0
            ? "thumbPulseRed 4s infinite"
            : $alignment === 2
                ? "thumbPulseBlue 4s infinite"
                : "none"};
    }
`;

const AlignSwitchVals = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;

    color: var(--text-secondary-dark);

    span {
        font-size: 13px;
    }
`;

function GLSelect() {
    const ctx = usePortraitMakerCtx();

    function onChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        ctx.setIsGL(e.target.checked);
        ctx.notify();
    }

    return (
        <CardRow>
            <GLContainer>
                <GLButton type="checkbox" id="gl-checkbox" className="gl-checkbox-button" onChange={(e) => onChange(e)} />
                <GLCheckboxLabel htmlFor="gl-checkbox" className="gl-checkbox-label common-button">
                    <CheckBoxText className="checkbox-text">GL?</CheckBoxText>
                    <Checkmark className="checkbox-checkmark">&#10003;</Checkmark>
                </GLCheckboxLabel>
            </GLContainer>
        </CardRow>
    )
}

const CheckBoxText = styled.span`
    font-size: 18px;
`;

const Checkmark = styled.span`
    display: none;
`;

const GLContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

const GLButton = styled.input`
    display: none;

    &:checked + label .checkbox-checkmark {
        display: inline;
    }

    &:checked + label {
        background-color: #D4AF37;
        animation: pulseGL 6s infinite;
    }

    @keyframes pulseGL {
        0% {
            box-shadow: 0 0 14px 6px #FFD700;
        }

        50% {
            box-shadow: 0 0 24px 10px #fff3b0;
        }

        100% {
            box-shadow: 0 0 14px 6px #FFD700;
        }
    }
`;

const GLCheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;