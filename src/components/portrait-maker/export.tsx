import styled from "styled-components";
import { useState } from "react";

import { usePortraitMakerCtx } from "../../ts/portrait-maker/context";

import { Card, CardRow } from "./card";

export default function Export() {
    const ctx = usePortraitMakerCtx();

    const [displayMobileExport, setDisplayMobileExport] = useState(false);
    const [mobileExportLink, setMobileExportLink] = useState("");

    async function genImage(): Promise<string | null> {
        return await pngToWebp(await ctx.renderHighQuality());
    }

    async function exportPC() {
        const imgUrl = await genImage();
        if (!imgUrl) return;

        const a = document.createElement("a");
        a.href = imgUrl;
        a.download = "swgoh-portrait-maker.png";
        a.click();
    }

    async function exportMobile() {
        const imgUrl = await genImage();
        if (!imgUrl) return;

        setMobileExportLink(imgUrl);
        setDisplayMobileExport(true);
    }

    return (
        <>
            <Card>
                <CardRow>
                    <Container>
                        <ContainerItem className="common-button" onClick={() => exportPC()}>Export for PC</ContainerItem>
                        <ContainerItem className="common-button" onClick={() => exportMobile()}>Export for Mobile</ContainerItem>
                    </Container>
                </CardRow>
            </Card>
            {displayMobileExport && (
                <Card>
                    <CardRow>
                        <p style={{ color: "var(--text-dark)" }}>Tap and hold, then click Save Image<br />Note: if you edit the image after opening this window, hit Mobile Export again</p>
                    </CardRow>
                    <CardRow>
                        <img src={mobileExportLink} style={{ maxWidth: "100%" }} />
                    </CardRow>
                </Card>
            )}
        </>
    )
}

const Container = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px auto;
`;

const ContainerItem = styled.button`
    height: 50px;
    width: 140px;
    justify-content: center;
    align-items: center;
    display: flex;
`;

async function pngToWebp(pngUrl: string, quality = 0.9): Promise<string> {
    const img = new Image();
    img.src = pngUrl;

    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(
            new Error("Failed to load PNG")
        );
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context unavailable");

    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/webp", quality);
}