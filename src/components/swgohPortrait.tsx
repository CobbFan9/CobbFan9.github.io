import { useEffect } from "react";
import styled from "styled-components";

export interface SwgohPortraitPrefs {
    opts: SwgohPortraitOpts;
    onReady?: () => void;
}

export type SwgohPortraitOpts = {
    isGL: boolean;
    alignment: Alignment;
    relic: number;
    imageUrl: string;
    zetas: number;
    omis: number;
    zoom: number;
    offsetX: number;
    offsetY: number;
}

export enum Alignment {
    Neutral,
    Lightside,
    Darkside,
}

export default function SwgohPortrait({ opts, onReady }: SwgohPortraitPrefs) {
    console.log("Logging opts");
    console.log(opts);

    useEffect(() => {
        console.log("Calling onReady");
        onReady?.();
    }, [
        opts.imageUrl,
        opts.isGL,
        opts.alignment,
        opts.relic,
        opts.zetas,
        opts.omis,
        opts.zoom,
        opts.offsetX,
        opts.offsetY
    ]);

    return (
        <CollectionChar>
            <CharacterPortrait>
                <CharacterPortrait__Primary>
                    <Image imageUrl={opts.imageUrl} isGL={opts.isGL} alignment={opts.alignment} offsetX={opts.offsetX} offsetY={opts.offsetY} zoom={opts.zoom} />
                    <ZetaOmi zetas={opts.zetas} omis={opts.omis} />
                    <RelicBadge relic={opts.relic} alignment={opts.alignment} isGL={opts.isGL} />
                    <Frame alignment={opts.alignment} />
                </CharacterPortrait__Primary>
            </CharacterPortrait>
            <Stars />
        </CollectionChar>
    )
}

interface ZetaOmiPrefs {
    zetas: number;
    omis: number;
}

function ZetaOmi({ zetas, omis }: ZetaOmiPrefs) {
    return (
        <>
            {zetas !== 0 && (
                <CharacterPortrait__Zeta>{zetas}</CharacterPortrait__Zeta>
            )}
            {omis !== 0 && (
                <CharacterPortrait__Omi>{omis}</CharacterPortrait__Omi>
            )}
        </>
    )
}

interface ImagePrefs {
    imageUrl: string;
    isGL: boolean;
    alignment: Alignment;
    zoom: number;
    offsetX: number;
    offsetY: number;
}

function Image({ imageUrl, isGL, alignment, zoom, offsetX, offsetY }: ImagePrefs) {
    if (isGL) {
        return (
            <CharacterPortrait__ImageFrame className="character-portrait__image-frame-is-galactic-legend">
                <CharacterPortrait__Image src={imageUrl} $zoom={zoom} $offsetX={offsetX} $offsetY={offsetY} />
            </CharacterPortrait__ImageFrame>
        )
    } else {
        if (alignment === Alignment.Neutral) {
            return (
                <CharacterPortrait__ImageFrame>
                    <CharacterPortrait__Image src={imageUrl} $zoom={zoom} $offsetX={offsetX} $offsetY={offsetY} />
                </CharacterPortrait__ImageFrame>
            )
        } else if (alignment === Alignment.Darkside) {
            return (
                <CharacterPortrait__ImageFrame className="character-portrait__image-frame-alignment-2">
                    <CharacterPortrait__Image src={imageUrl} $zoom={zoom} $offsetX={offsetX} $offsetY={offsetY} />
                </CharacterPortrait__ImageFrame>
            )
        } else {
            return (
                <CharacterPortrait__ImageFrame className="character-portrait__image-frame-alignment-3">
                    <CharacterPortrait__Image src={imageUrl} $zoom={zoom} $offsetX={offsetX} $offsetY={offsetY} />
                </CharacterPortrait__ImageFrame>
            )
        }
    }
}

interface RelicBadgePrefs {
    relic: number;
    alignment: Alignment;
    isGL: boolean;
}

function RelicBadge({ relic, alignment, isGL }: RelicBadgePrefs) {
    if (relic != 0) {
        if (isGL) {
            return (
                <CharacterPortrait__RelicBadge $image="/portraitMakerImages/GL_relic_middle.webp">{relic}</CharacterPortrait__RelicBadge>
            )
        } else {
            if (alignment === Alignment.Neutral) {
                return (
                    <CharacterPortrait__RelicBadge $image="/portraitMakerImages/NL_relic_middle.webp">{relic}</CharacterPortrait__RelicBadge>
                )
            } else if (alignment === Alignment.Darkside) {
                return (
                    <CharacterPortrait__RelicBadge $image="/portraitMakerImages/DS_relic_middle.webp">{relic}</CharacterPortrait__RelicBadge>
                )
            } else {
                return (
                    <CharacterPortrait__RelicBadge $image="/portraitMakerImages/LS_relic_middle.webp">{relic}</CharacterPortrait__RelicBadge>
                )
            }
        }
    }
}

interface FramePrefs {
    alignment: Alignment;
}

function Frame({ alignment }: FramePrefs) {
    if (alignment === Alignment.Neutral) {
        return (
            <>
                <CharacterPortrait__RFrame $image="/portraitMakerImages/NL_relic.webp" />
                <CharacterPortrait__RFrame_Right $image="/portraitMakerImages/NL_relic.webp" />
            </>
        )
    } else if (alignment === Alignment.Darkside) {
        return (
            <>
                <CharacterPortrait__RFrame $image="/portraitMakerImages/DS_relic.webp" />
                <CharacterPortrait__RFrame_Right $image="/portraitMakerImages/DS_relic.webp" />
            </>
        )
    } else {
        return (
            <>
                <CharacterPortrait__RFrame $image="/portraitMakerImages/LS_relic.webp" />
                <CharacterPortrait__RFrame_Right $image="/portraitMakerImages/LS_relic.webp" />
            </>
        )
    }
}

function Stars() {
    return (
        <CharacterPortrait__Footer>
            <CharacterPortrait__Stars>
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
                <CharacterPortrait__Star />
            </CharacterPortrait__Stars>
        </CharacterPortrait__Footer>
    )
}

const CollectionChar = styled.div`
    position: relative;
    height: 110px;
    padding: 10px 0;

    &:after,
    &:before {
        display: table;
        content: "";
        clear: both;
    }
`;

const CharacterPortrait = styled.div`
    margin: 15px auto 10px;
    width: 132px;
    display: block;
    display: inline-block;
    position: relative;
    border-radius: 50%;
`;

const CharacterPortrait__Primary = styled.div`
    position: relative;
    margin: 0 auto;
    width: 80px;
    height: 80px;
`;

const CharacterPortrait__ImageFrame = styled.div`
    left: -4%;
    top: -5%;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    border: 4px solid #333;
    background-color: #000;
    width: 80px;
    height: 80px;
    border-width: 3px;
`;

const CharacterPortrait__Image = styled.img<{
    $zoom: number;
    $offsetX: number;
    $offsetY: number;
}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    transform:
        translate(${({ $offsetX }) => $offsetX}px,
                  ${({ $offsetY }) => $offsetY}px)
        scale(${({ $zoom = 0 }) => 1 + $zoom / 100})
`;

const CharacterPortrait__Zeta = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: 50% transparent url(/portraitMakerImages/zeta.png) no-repeat;
    background-size: contain;
    width: 38px;
    height: 38px;
    position: absolute;
    z-index: 4;
    top: 41px;
    left: -10px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    text-shadow: -1px -1px 0 #7028c9, 2px -1px 0 #7028c9, 2px 2px 0 #7028c9, -1px 2px 0 #7028c9, 2px 3px 0 #7028c9, 1px 3px 0 #7028c9, 2px 3px 0 #7028c9;
`;

const CharacterPortrait__Omi = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: 50% transparent url(/portraitMakerImages/omi.png) no-repeat;
    background-size: contain;
    width: 38px;
    height: 38px;
    position: absolute;
    z-index: 4;
    top: 41px;
    right: -10px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, 2px 2px 0 #000, -1px 2px 0 #000;
`;

const CharacterPortrait__RelicBadge = styled.div<{ $image: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${({ $image }) => $image});
    background-size: 100%;
    width: 44px;
    height: 44px;
    position: absolute;
    top: 48px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 4;
    color: #fff;
    text-align: center;
    font-weight: 700;
    text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, 2px 2px 0 #000, -1px 2px 0 #000;
`;

const CharacterPortrait__RFrame = styled.div<{ $image: string }>`
    position: absolute;
    z-index: 2;
    width: 58px;
    height: 112px;
    background-image: url(${({ $image }) => $image});
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-104%, -50%);
    transform: translate(-104%, -50%);
`;

const CharacterPortrait__RFrame_Right = styled.div<{ $image: string }>`
    position: absolute;
    z-index: 2;
    width: 58px;
    height: 112px;
    background-image: url(${({ $image }) => $image});
    left: 50%;
    top: 50%;
    -webkit-transform: rotateY(180deg) translate(-4%, -50%);
    transform: rotateY(180deg) translate(-4%, -50%);
`;

const CharacterPortrait__Footer = styled.div`
    margin-top: .25rem;
    position: relative;
    height: 14px;
`;

const CharacterPortrait__Stars = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
`;

const CharacterPortrait__Star = styled.div`
    background: center 0 transparent url(/portraitMakerImages/star.png) no-repeat;
    background-size: 100%;
    width: 14px;
    height: 14px;
`;