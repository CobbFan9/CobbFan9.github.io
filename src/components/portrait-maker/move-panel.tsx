import styled from "styled-components";

import { usePortraitMakerCtx } from "../../ts/portrait-maker/context";

import { Card, CardRow } from "./card";

export default function MovePanel() {
    const ctx = usePortraitMakerCtx();

    function changeZoom(amount: number) {
        ctx.setZoom(prev => prev + amount);
        ctx.notify();
    }

    function changeX(amount: number) {
        ctx.setOffsetX(prev => prev + amount);
        ctx.notify();
    }

    function changeY(amount: number) {
        ctx.setOffsetY(prev => prev + amount);
        ctx.notify();
    }

    function reset() {
        ctx.setZoom(0);
        ctx.setOffsetX(0);
        ctx.setOffsetY(0);
        ctx.notify();
    }

    return (
        <Card>
            <CardRow>
                <ZoomContainer>
                    <ZoomItem className="common-button" onClick={() => changeZoom(5)}>In</ZoomItem>
                    <ZoomItem className="common-button" onClick={() => changeZoom(-5)}>Out</ZoomItem>
                </ZoomContainer>
                <GridContainer>
                    <GridItem id="upButton" className="common-button" onClick={() => changeY(-5)}>Up</GridItem>
                    <GridItem id="downButton" className="common-button" onClick={() => changeY(5)}>Down</GridItem>
                    <GridItem id="leftButton" className="common-button" onClick={() => changeX(5)}>Left</GridItem>
                    <GridItem id="rightButton" className="common-button" onClick={() => changeX(-5)}>Right</GridItem>
                </GridContainer>
                <Reset className="common-button" onClick={() => reset()}>Reset</Reset>
            </CardRow>
        </Card>
    )
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 50px 50px 50px;
    grid-template-rows: 50px 50px 50px;
    gap: 5px;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    width: max-content;
    place-items: center;

    #upButton {
        grid-column: 2;
        grid-row: 1;
    }

    #downButton {
        grid-column: 2;
        grid-row: 3;
    }

    #leftButton {
        grid-column: 1;
        grid-row: 2;
    }

    #rightButton {
        grid-column: 3;
        grid-row: 2;
    }
`;

const GridItem = styled.button`
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const ZoomContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px auto;
`;

const ZoomItem = styled.button`
    height: 50px;
    width: 60px;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const Reset = styled.button`
    margin-top: 15px;
    height: 50px;
    width: 90px;
    justify-content: center;
    align-items: center;
    display: flex;
`;