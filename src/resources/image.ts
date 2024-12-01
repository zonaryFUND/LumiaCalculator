
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

const subjectImages = import.meta.glob<Record<"default", string>>("resources/subjects/*.png", {eager: true});
const weaponSkillImages = import.meta.glob<Record<"default", string>>("resources/weapon-skills/*.png", {eager: true});
const weaponImages = import.meta.glob<Record<"default", string>>("resources/weapons/**/*.png", {eager: true});
const chestImages = import.meta.glob<Record<"default", string>>("resources/armors/chest/*.png", {eager: true});
const headImages = import.meta.glob<Record<"default", string>>("resources/armors/head/*.png", {eager: true});
const armImages = import.meta.glob<Record<"default", string>>("resources/armors/arm/*.png", {eager: true});
const legImages = import.meta.glob<Record<"default", string>>("resources/armors/leg/*.png", {eager: true});

const skillImageModules = import.meta.glob<{default: string}>("resources/skills/**/*.png", {eager: true});
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