import { createContext, useContext } from "react";

import LocalStorageManager from "./LocalStorageManager";

export let CrystalCalcCtx = createContext<CrystalCalcContext | undefined>(undefined);

export type CrystalCalcContext = {
    CrystalsCounted: Record<string, number>;
    SetCrystalsCounted: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    LocalStorageManager: LocalStorageManager;
}

export function useCrystalCalcCtx() {
    const ctx = useContext(CrystalCalcCtx);

    if (!ctx) {
        throw new Error(
            "useCrystalCalcCtx must be used within CrystalCalcProvider"
        );
    }

    return ctx;
}
