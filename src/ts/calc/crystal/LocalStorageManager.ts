export interface ICalcSaveData {
    Version?: number;
    FleetPayout?: string;
    TBOptionData?: string;
    KesselRun?: string;
    NodeRefreshUnits?: string[];
    NodeRefreshSelected?: string[];
    GacLeague?: string;
    SelectedDothF?: string;
    SelectedPaw?: string;
    SelectedEb1?: string;
    SelectedEb2?: string;
    Marquee_Count?: string;
    Marquee_EPass?: string;
    Marquee_Stars?: string;
    EnergyRefresh?: IEnergyRefresh;
}

export interface IEnergyRefresh {
    Normal?: string;
    Cantina?: string;
    Mod?: string;
    Ship?: string;
    Conquest?: string;
}

export default class LocalStorageManager {
    data: ICalcSaveData;

    constructor() {
        const savedData = localStorage.getItem("crystalCalcSave");
        if (savedData === null) {
            this.data = this.newSession();
            console.log("Made new save");
            return;
        }

        this.data = JSON.parse(savedData);
        console.log("Found previous save");
    }

    public Clear() {
        console.log("Clearing session data");
        this.data = this.newSession();
        localStorage.removeItem("crystalCalcSave");
    }

    private newSession(): ICalcSaveData {
        return {
            Version: 1,
        }
    }

    public SaveSession() {
        localStorage.setItem("crystalCalcSave", JSON.stringify(this.data));
        console.log("Saved session");
    }
}
