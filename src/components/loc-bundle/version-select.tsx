import styled from "styled-components";
import { useEffect, useState } from "react";

import { Card, CardRow } from "./page"

import { useLocBundleContext } from "../../ts/loc-bundle/context";
import { Load } from "../../ts/loc-bundle/loader";

type VersionSelectProps = {
    onAdd: () => void;
};

export default function VersionSelect({ onAdd }: VersionSelectProps) {
    const ctx = useLocBundleContext();

    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (!shouldLoad) return;

        async function runLoader() {
            const result = await Load(
                ctx.SelectedVersionNew.current,
                ctx.SelectedVersionOld.current
            );

            ctx.Diff.current = result;
            ctx.notify();

            onAdd();

            setShouldLoad(false);
        }

        runLoader();
    }, [shouldLoad]);

    function onNewVersionSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const selected = ctx.LocVersions.find(
            v => v.version === e.target.value
        );

        if (selected) {
            ctx.SelectedVersionNew.current = selected;
        }
    }

    function onOldVersionSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        const selected = ctx.LocVersions.find(
            v => v.version === e.target.value
        );

        if (selected) {
            ctx.SelectedVersionOld.current = selected;
        }
    }

    function onClickLoadVersions() {
        setShouldLoad(true);
    }

    return (
        <Card>
            <CardRow>
                <InputLabel htmlFor="loc-bundle-ver-select">Select Newer Localization Version:</InputLabel>
                <InputSpan>
                    <select id="loc-bundle-ver-select" defaultValue={"Latest"} onChange={onNewVersionSelection} className="common-button">
                        {ctx.LocVersions.map((version) => (
                            <option key={version.version} value={version.version}>
                                {`${version.version} - ${new Date(version.date).toLocaleDateString()}`}
                            </option>
                        ))}
                    </select>
                </InputSpan>
            </CardRow>
            <CardRow>
                <InputLabel htmlFor="loc-bundle-old-ver-select">Select Older Localization Version:</InputLabel>
                <InputSpan>
                    <select id="loc-bundle-old-ver-select" defaultValue={"Latest"} onChange={onOldVersionSelection} className="common-button">
                        {ctx.LocVersions
                            .filter(version => version.includeInOld === true)
                            .map((version) => (
                                <option key={version.version} value={version.version}>
                                    {`${version.version} - ${new Date(version.date).toLocaleDateString()}`}
                                </option>
                            ))}
                    </select>
                </InputSpan>
            </CardRow>
            <CardRow>
                <button id="load-loc-versions" onClick={onClickLoadVersions} className="common-button">Load Localization Bundles</button>
            </CardRow>
        </Card>
    )
}

const InputLabel = styled.label`
    margin-right: 7px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-dark);
    letter-spacing: 0.01em;
`;

const InputSpan = styled.span`
    display: inline-flex;
    align-items: center;
    position: relative;
    gap: 4px;
    border-radius: 8px;
    padding: 2px 6px 2px 2px;

    @media (max-width: 600px) {
        width: 80%;
    }

    input[type="text"],
    input[type="number"],
    select {
        padding: 10px 14px;

        border: 2px solid var(--button-hover);
        border-radius: 6px;

        background: var(--card-background-dark);
        color: var(--text-dark);

        font-size: 16px;
        outline: none;

        transition: border-color 0.2s, box-shadow 0.2s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

        margin: 6px 0;
    }

    input[type="text"]:focus,
    input[type="number"]:focus,
    select:focus {
        box-shadow: 0 0 0 2px var(--button-hover);
    }

    select {
        width: 416px;
        height: 41.6px;
    }

    @media (max-width: 600px) {
        input[type="text"],
        input[type="number"],
        select {
            width: 100%;
            box-sizing: border-box;
        }
    }
`;