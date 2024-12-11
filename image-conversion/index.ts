import sharp from "sharp";
import fs from "fs";
import path from "path";

async function convertImages(base: string, width: number | null, height: number | null) {
    const dirents = await fs.promises.readdir(base, { withFileTypes: true });
    return await Promise.all([
        ...dirents.filter(e => e.isDirectory()).map(e => convertImages(path.join(base, e.name), width, height)),
        ...dirents
            .filter(e => e.isFile())
            .filter(f => path.extname(f.name).toLowerCase() == ".png")
            .map(f => {
                sharp(path.join(base, f.name))
                    .resize(width, height)
                    .toFormat("webp")
                    .toFile(path.join(base, path.parse(f.name).name + ".webp"))
                    .then(_ => {
                        return fs.promises.unlink(path.join(base, f.name))
                    })
            })  
    ])
}

await convertImages("../resources/subjects", 100, null);
await convertImages("../resources/weapon-skills", 80, 80);
await convertImages("../resources/skills", 80, 80);
await convertImages("../resources/weapons", 128, null);
await convertImages("../resources/armors", 128, null);
