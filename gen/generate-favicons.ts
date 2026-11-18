
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateFavicons(): Promise<void> {
    const folder = process.argv[2];

    if (!folder) {
        console.error("Usage: gen/generate-favicons.ts <folder>");
        process.exit(1);
    }

    const folderPath = path.resolve(folder);
    const source = path.join(folderPath, "favicon.webp");

    if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
        throw new Error(`Folder not found: ${folderPath}`);
    }

    if (!fs.existsSync(source)) {
        throw new Error(`favicon.webp not found in: ${folderPath}`);
    }

    const pngPath = path.join(folderPath, "favicon.png");
    const icoPath = path.join(folderPath, "favicon.ico");

    await sharp(source)
        .resize(528, 528, { fit: "contain" })
        .png()
        .toFile(pngPath + ".tmp");

    fs.renameSync(pngPath + ".tmp", pngPath);

    const sizes = [16, 32, 48, 64, 128];
    const pngBuffers: Buffer[] = [];

    for (const size of sizes) {
        const buffer = await sharp(source)
            .resize(size, size, { fit: "contain" })
            .png()
            .toBuffer();

        pngBuffers.push(buffer);
    }

    const header = Buffer.alloc(6 + sizes.length * 16);

    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(sizes.length, 4);

    let offset = header.length;

    sizes.forEach((size, index) => {
        const entry = 6 + index * 16;

        header.writeUInt8(size, entry);
        header.writeUInt8(size, entry + 1);
        header.writeUInt8(0, entry + 2);
        header.writeUInt8(0, entry + 3);
        header.writeUInt16LE(1, entry + 4);
        header.writeUInt16LE(32, entry + 6);
        header.writeUInt32LE(pngBuffers[index].length, entry + 8);
        header.writeUInt32LE(offset, entry + 12);

        offset += pngBuffers[index].length;
    });

    fs.writeFileSync(
        icoPath,
        Buffer.concat([header, ...pngBuffers])
    );

    console.log("Favicons generated successfully:");
    console.log(`  ${pngPath}`);
    console.log(`  ${icoPath}`);
}

generateFavicons().catch((error: unknown) => {
    console.error(
        "Failed to generate favicons:",
        error instanceof Error ? error.message : error
    );
    process.exitCode = 1;
});
