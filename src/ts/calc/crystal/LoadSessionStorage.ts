export interface ICalcSaveData {
    Version?: number;
    FleetPayout?: string;
}

const sessionStorageIdentifier = "crystalCalcSave";

export function LoadSession(makeNew: boolean = false): ICalcSaveData | undefined {
    const savedData = localStorage.getItem(sessionStorageIdentifier);

    if (savedData !== null) {
        const parsed: ICalcSaveData = JSON.parse(savedData);

        console.log("Loaded a save from session storage!");

        return parsed
    }

    if (makeNew) {
        return NewSession();
    }

    return undefined;
}

export function SaveSession(input: ICalcSaveData) {
    localStorage.setItem(sessionStorageIdentifier, JSON.stringify(input));
    console.log("Saved session storage!");
}

export function NewSession(): ICalcSaveData {
    return {
        Version: 1,
    }
}