
function extractDefaultImages(record: Record<string, Record<"default", string>>): Record<string, string> {
    return Object.entries(record).reduce((prev, [key, value]) => {
        const pathComponents = key.split("/");
        const imageName = pathComponents[pathComponents.length - 1].split(".")[0];
        return {
            ...prev,
            [imageName]: value.default
        }
    }, {});
}

const subjectImages = import.meta.glob<Record<"default", string>>("resources/subjects/*.webp", {eager: true});
const weaponSkillImages = import.meta.glob<Record<"default", string>>("resources/weapon-skills/*.webp", {eager: true});
const weaponImages = import.meta.glob<Record<"default", string>>("resources/weapons/**/*.webp", {eager: true});
const chestImages = import.meta.glob<Record<"default", string>>("resources/armors/chest/*.webp", {eager: true});
const headImages = import.meta.glob<Record<"default", string>>("resources/armors/head/*.webp", {eager: true});
const armImages = import.meta.glob<Record<"default", string>>("resources/armors/arm/*.webp", {eager: true});
const legImages = import.meta.glob<Record<"default", string>>("resources/armors/leg/*.webp", {eager: true});

const skillImageModules = import.meta.glob<{default: string}>("resources/skills/**/*.webp", {eager: true});
const skillImages = Object.entries({...skillImageModules, ...weaponSkillImages}).reduce((images, [key, m]) => {
    const pathComponents = key.split("/");
    const imageName = pathComponents[pathComponents.length - 1].split(".")[0];
    return {
        ...images,
        [imageName]: m.default
    }
}, {} as {
    [skillCode: number]: string
});

const Images = {
    subject: extractDefaultImages(subjectImages),
    weapon: extractDefaultImages(weaponImages),
    chest: extractDefaultImages(chestImages),
    head: extractDefaultImages(headImages),
    arm: extractDefaultImages(armImages),
    leg: extractDefaultImages(legImages),
    skill: skillImages
}

export default Images;