import styled from "styled-components";
import { useState, useEffect } from "react";

import { Page, Card, CardRow } from "../components/asset-extractor/page";
import Manifest from "../components/asset-extractor/manifest";
import AssetViewer from "../components/asset-extractor/asset-viewer";
import LoadingAssets from "../components/asset-extractor/loading-assets";

import HelpBtn from "../components/help-btn";

import getGithubVersion from "../ts/asset-extractor/getGithubVersion";

export default function AssetExtractorWeb() {
    const [assetVersion, setAssetVersion] = useState("");
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
    const [showManifest, setShowManifest] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [onClickGithubVersion, setOnClickGithubVersion] = useState(0);

    useEffect(() => {
        if (onClickGithubVersion === 0) return;

        async function getAV() {
            setAssetVersion(await getGithubVersion());
        }

        getAV();
    }, [onClickGithubVersion])

    return (
        <Page>
            <Card>
                <CardRow>
                    <h2 style={{ color: "var(--text-dark)" }}>SWGoH Asset Extractor Web</h2>
                </CardRow>
            </Card>
            <Card>
                <CardRow>
                    <Paragraph>
                        Asset Extractor Web is a tool to download and extract SWGoH assets from the browser. Yes, everything is done inside the browser.<br />
                        This is made possible by
                        <br /><a href="https://www.npmjs.com/package/@lego-fan9/asset-studio-web" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/@lego-fan9/asset-studio-web</a><br />
                        The reason it needs an NPM package is because the Unity bundle extraction is browser side. I spent way too much time making it browser side.
                    </Paragraph>
                </CardRow>
            </Card>
            <Card>
                <CardRow>
                    <Paragraph>
                        <b>Version Input:</b>
                    </Paragraph>
                </CardRow>
                <CardRow>
                    <InputRow>
                        <VersionInput type="text" placeholder="" onChange={(e) => setAssetVersion(e.target.value)} value={assetVersion} />
                        <HelpBtn text={`SWGoH assetVersion, you can obtain it from Comlink, or press the "Get Github Version" button`} />
                    </InputRow>
                </CardRow>
                <CardRow>
                    <VersionRow>
                        <button className="common-button" onClick={() => setShowManifest(true)} >Submit</button>
                        <button className="common-button" onClick={() => setOnClickGithubVersion(onClickGithubVersion + 1)} >Get Github Version</button>
                    </VersionRow>
                </CardRow>
            </Card>

            {showManifest && (
                <Manifest setSelectedAssetName={setSelectedAsset} assetVersion={assetVersion} />
            )}

            {selectedAsset && (
                <AssetViewer assetVersion={assetVersion} assetName={selectedAsset} setLoading={setShowLoading} />
            )}

            {showLoading && (
                <LoadingAssets />
            )}
        </Page>
    )
}

const Paragraph = styled.p`
    color: var(--text-dark);

    margin-top: 0px;
    margin-bottom: 0px;

    a {
        color: var(--text-dark);
        font-weight: bold;
        text-decoration: none;
        margin-right: 8px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const VersionInput = styled.input`
    flex: 1;
    min-width: 0;

    padding: 10px 14px;

    border: 2px solid var(--button-hover);
    border-radius: 6px;

    background: var(--card-background-dark);
    color: var(--text-dark);

    font-size: 16px;
    outline: none;

    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    margin: 0px 0;

    &:focus {
        box-shadow: 0 0 0 2px var(--button-hover);
    }

    @media (max-width: 600px) {
        width: 100%;
        box-sizing: border-box;
    }
`;

const VersionRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    @media (max-width: 600px) {
        flex-direction: column;

        button {
            width: 100%;
        }
    }
`;

const InputRow = styled.div`
    width: 40%;
    display: flex;
    gap: 0px;
    align-items: center;
    justify-content: center;
`;