import type { RefObject } from "react";
import React from "react";
import { createContext, useContext } from "react";

import type { SwgohPortraitOpts } from "../../components/swgohPortrait";
import { Alignment } from "../../components/swgohPortrait";

export let PortraitMakerCtx = createContext<PortraitMakerContext | undefined>(undefined);

export type PortraitMakerContext = {
    isGL: boolean;
    setIsGL: React.Dispatch<React.SetStateAction<boolean>>;

    alignment: Alignment;
    setAlignment: React.Dispatch<React.SetStateAction<Alignment>>;

    relic: number;
    setRelic: React.Dispatch<React.SetStateAction<number>>;

    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;

    zetas: number;
    setZetas: React.Dispatch<React.SetStateAction<number>>;

    omis: number;
    setOmis: React.Dispatch<React.SetStateAction<number>>;

    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;

    offsetX: number;
    setOffsetX: React.Dispatch<React.SetStateAction<number>>;

    offsetY: number;
    setOffsetY: React.Dispatch<React.SetStateAction<number>>;

    debugMode: boolean;
    setDebugMode: React.Dispatch<React.SetStateAction<boolean>>;

    canvasRef: RefObject<HTMLCanvasElement | null>;
    canvasCtxRef: RefObject<CanvasRenderingContext2D | null>;
    renderRef: RefObject<HTMLDivElement | null>;

    renderContent: SwgohPortraitOpts | null;
    setRenderContent: (opts: SwgohPortraitOpts) => void;

    subscribe: (cb: () => void) => () => void;
    notify: () => void;

    versionRef: number
    setVersionRef: React.Dispatch<React.SetStateAction<number>>;

    notifyReady: () => void;
}

export function usePortraitMakerCtx() {
    const ctx = useContext(PortraitMakerCtx);

    if (!ctx) {
        throw new Error(
            "usePortraitMakerCtx must be used within PortraitMakerProvider"
        );
    }

    return ctx;
}

export const useBooleanCtx = (ref: RefObject<boolean>, subscribe: (cb: () => void) => () => void) => {
    return React.useSyncExternalStore(
        subscribe,
        () => ref.current!
    );
};

export const useNumberCtx = (ref: RefObject<number>, subscribe: (cb: () => void) => () => void) => {
    return React.useSyncExternalStore(
        subscribe,
        () => ref.current!
    );
};

export const useStringCtx = (ref: RefObject<string>, subscribe: (cb: () => void) => () => void) => {
    return React.useSyncExternalStore(
        subscribe,
        () => ref.current!
    );
};

export const useAlignmentCtx = (ref: RefObject<Alignment>, subscribe: (cb: () => void) => () => void) => {
    return React.useSyncExternalStore(
        subscribe,
        () => ref.current!
    );
};
