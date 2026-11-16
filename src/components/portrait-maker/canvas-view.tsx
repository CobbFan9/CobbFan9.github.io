import { useEffect } from "react";
import styled from "styled-components";

import { usePortraitMakerCtx } from "../../ts/portrait-maker/context";

import { Card, CardRow } from "./card";

export default function CanvasView() {
    const ctx = usePortraitMakerCtx();

    useEffect(() => {
        if (!ctx.canvasRef.current) return;

        ctx.canvasCtxRef.current = ctx.canvasRef.current.getContext("2d");
    }, []);

    return (
        <Card>
            <CardRow>
                <Canvas ref={ctx.canvasRef} />
            </CardRow>
        </Card>
    )
}

const Canvas = styled.canvas`
    width: 160px;
    height: 160px;
    border: 1px solid #ccc;
`;