import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import { Card, CardRow } from "./page";

import getManifest from "../../ts/asset-extractor/getManifest";

export interface ManifestProps {
    setSelectedAssetName: React.Dispatch<React.SetStateAction<string | null>>;
    assetVersion: string;
}

export default function Manifest({ setSelectedAssetName, assetVersion }: ManifestProps) {
    const [manifestEntries, setManifestEntries] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadManifest() {
            const manifestTemp = await getManifest(assetVersion);

            setManifestEntries(manifestTemp);
        }

        loadManifest();
    }, [assetVersion]);

    const items = useMemo(() => {
        return manifestEntries.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [manifestEntries, searchTerm]);

    return (
        <Card>
            <FullWidthRow>
                <ContentArea>
                    <h3 style={{color: "var(--text-dark)"}}>Select an asset to load:</h3>

                    <SearchInput type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                    <ListContainer>
                        {items.slice(0, 20).map((item, _) => (
                            <ListRowButton key={item} onClick={() => setSelectedAssetName(item)}>{item}</ListRowButton>
                        ))}
                    </ListContainer>
                </ContentArea>
            </FullWidthRow>
        </Card>
    )
}

const ContentArea = styled.div`
    width: 90%;
    max-width: 90%;
    flex: 0 0 90%;
`;

const FullWidthRow = styled(CardRow)`
    width: 100%;
    align-items: stretch;
`;

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ListRowButton = styled.button`
    width: 100%;
    box-sizing: border-box;

    padding: 10px 14px;

    background: var(--card-background-dark);
    border: 1px solid var(--border-dark);
    border-radius: 6px;

    color: var(--text-dark);
    text-align: left;

    cursor: pointer;

    overflow-wrap: anywhere;
    word-break: break-word;

    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
        border-color: var(--border-hover-dark);
        background: var(--button);
    }

    &:active {
        transform: scale(0.99);
    }
`;

const SearchInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 10px 14px;
    margin-bottom: 8px;

    border: 2px solid var(--button-hover);
    border-radius: 6px;

    background: var(--card-background-dark);
    color: var(--text-dark);

    font-size: 16px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--button-hover);
    }
`;
