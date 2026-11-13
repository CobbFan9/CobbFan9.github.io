export interface ICalcSaveData {
    Version?: number;
    FleetPayout?: string;
    TBOptionData?: string;
    KesselRun?: string;
    NodeRefreshUnits?: string[];
    NodeRefreshSelected?: string[];
    GacLeague?: string;
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
