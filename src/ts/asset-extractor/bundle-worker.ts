import { AssetsManager, ExportTexture2D, Texture2D } from "@lego-fan9/asset-studio-web";
import type { RequestEnvelopePayload, InitPayload } from "./RequestEnvelope";
import { RequestEnvelope } from "./RequestEnvelope";
import type { ImageType } from "./imageType";

let assetsManager: AssetsManager | null = null

self.onmessage = async (e: MessageEvent<RequestEnvelopePayload>) => {
    const { type, payload } = e.data;

    let realPayload

    switch (type) {
        case "init":
            realPayload = payload as InitPayload

            assetsManager = new AssetsManager();
            assetsManager.LoadFile(realPayload.buffer, realPayload.name);

            console.log(assetsManager);

            self.postMessage(new RequestEnvelope("init_done", true));

            break;
        case "images":
            if (assetsManager === null) {
                console.log("Had a null assetsManager on image export");

                break;
            }

            let imageList: ImageType[] = [];

            for (var serFile of assetsManager.loadedAssetsFiles) {
                for (var obj of serFile.ObjectList) {
                    if (obj.classID === 28) {
                        const texObj = obj as Texture2D
                        const tex = await ExportTexture2D(texObj)
                        if (tex !== null) {
                            imageList.push({data: tex, name: texObj.m_Name} satisfies ImageType)
                        }
                    }
                }
            }

            self.postMessage(new RequestEnvelope("images_done", imageList))

            break;
        default:
            console.log(`Unknown message type: ${type}`);
    }
}

export {};