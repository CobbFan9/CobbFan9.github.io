import { useRef, useState } from "react";
import styled from "styled-components";

import { toPng } from "html-to-image";

import type { PortraitMakerContext } from "../ts/portrait-maker/context";
import { PortraitMakerCtx, usePortraitMakerCtx } from "../ts/portrait-maker/context"

import type { SwgohPortraitOpts } from "../components/swgohPortrait";
import { Alignment } from "../components/swgohPortrait";

import { Card, CardRow } from "../components/portrait-maker/card";
import UploadImage from "../components/portrait-maker/upload-image";
import ConfigurePortrait from "../components/portrait-maker/configure-portrait";
import GenerateButton from "../components/portrait-maker/generate";
import CanvasView from "../components/portrait-maker/canvas-view";
import MovePanel from "../components/portrait-maker/move-panel";
import Export from "../components/portrait-maker/export";
import Renderer from "../components/portrait-maker/render-div";

export default function PortraitMaker() {
    const [isGL, setIsGL] = useState(false);
    const [alignment, setAlignment] = useState<Alignment>(Alignment.Neutral);
    const [relic, setRelic] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [zetas, setZetas] = useState<number>(0);
    const [omis, setOmis] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(0);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);
    const [debugMode, setDebugMode] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const renderRef = useRef<HTMLDivElement | null>(null);
    const [renderContent, setRenderContent] = useState<SwgohPortraitOpts | null>(null);
    const [versionRef, setVersionRef] = useState<number>(0);

    const diffListeners = useRef(new Set<() => void>());
    const subscribe = (cb: () => void) => {
        diffListeners.current.add(cb);

        return () => {
            diffListeners.current.delete(cb);
        };
    };

    const notify = () => {
        setVersionRef(prev => prev + 1);
        for (const cb of diffListeners.current) {
            cb();
        }
    };

    const renderToCanvas = async () => {
        console.log("Got render ready");

        if (!ctx.renderRef.current || !ctx.canvasRef.current || !ctx.canvasCtxRef.current) return;
        console.log("Doing render");

        const param = {
            cacheBust: true,
        }

        const png = await toPng(ctx.renderRef.current, param);
        console.log(png);

        const img = new Image();
        img.src = png;

        await new Promise(resolve => (img.onload = resolve));

        ctx.canvasRef.current.width = img.width;
        ctx.canvasRef.current.height = img.height;

        ctx.canvasCtxRef.current.clearRect(0, 0, ctx.canvasRef.current.width, ctx.canvasRef.current.height);
        ctx.canvasCtxRef.current.drawImage(img, 0, 0);
        console.log("Finished render")
    };

    const notifyReady = () => {
        renderToCanvas()
    }

    let ctx: PortraitMakerContext = {
        isGL,
        setIsGL,
        alignment,
        setAlignment,
        relic,
        setRelic,
        imageUrl,
        setImageUrl,
        zetas,
        setZetas,
        omis,
        setOmis,
        zoom,
        setZoom,
        offsetX,
        setOffsetX,
        offsetY,
        setOffsetY,
        debugMode,
        setDebugMode,
        subscribe: subscribe,
        notify: notify,
        canvasRef: canvasRef,
        canvasCtxRef: canvasCtxRef,
        renderRef: renderRef,
        renderContent: renderContent,
        setRenderContent: setRenderContent,
        versionRef: versionRef,
        setVersionRef,
        notifyReady: notifyReady,
    }

    const [showAll, setShowAll] = useState(false);

    const showAllSetter = () => {
        setShowAll(true);
    };

    return (
        <PortraitMakerCtx.Provider value={ctx}>
            <Page>
                <Card>
                    <CardRow>
                        <h2 style={{ color: "var(--text-dark)" }}>SWGoH Portrait Maker</h2>
                    </CardRow>
                </Card>
                <UploadImage />
                <ConfigurePortrait />
                <GenerateButton onAdd={showAllSetter} />

                {showAll && (
                    <>
                        <CanvasView />
                        <MovePanel />
                        <Export />
                        <DebugMode />
                        <Renderer />
                    </>
                )}

            </Page>
        </PortraitMakerCtx.Provider>
    );
}

const Page = styled.div`
    padding-top: 7px;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
`;

function DebugMode() {
    const ctx = usePortraitMakerCtx();

    function onClick() {
        ctx.setDebugMode(true);
        ctx.notify();
    }

    return (
        <button className="common-button" onClick={() => onClick()}>Debug Mode</button>
    )
}
