import styled from "styled-components";
import { useState } from "react";

import { usePortraitMakerCtx } from "../../ts/portrait-maker/context";

import { Card, CardRow } from "./card";

export default function Export() {
    const ctx = usePortraitMakerCtx();

    const [displayMobileExport, setDisplayMobileExport] = useState(false);
    const [mobileExportLink, setMobileExportLink] = useState("");

    function genImage(): string | null {
        const canvas = ctx.canvasRef.current;
        if (!canvas) return null;

        return canvas.toDataURL("image/webp", 0.9);
    }

    function exportPC() {
        const imgUrl = genImage()
        if (!imgUrl) return;

        const a = document.createElement("a");
        a.href = imgUrl;
        a.download = "swgoh-portrait-maker.webp";
        a.click();
    }

    function exportMobile() {
        const imgUrl = genImage()
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
                        <p style={{ color: "var(--text-dark)" }}>Tap and hold, then click Save Image</p>
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