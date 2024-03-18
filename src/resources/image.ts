function importImages(context: __WebpackModuleApi.RequireContext): any {
    return context.keys().reduce((images: any, path) => {
        const key = path.substring(path.lastIndexOf("/") + 1).split(".").slice(0, -1).join(".");
        images[key] = context(path);
        return images
    }, {}) as any
}

const subjectContext = require.context("resources/subjects", false, /\.png$/);
const subjectImages = importImages(subjectContext)

const weaponContext = require.context("resources/weapons", true, /\.png$/);
const weaponImages = importImages(weaponContext);

const chestContext = require.context("resources/armors/chest", true, /\.png$/);
const chestImages = importImages(chestContext);

const headContext = require.context("resources/armors/head", true, /\.png$/);
const headImages = importImages(headContext);

const armContext = require.context("resources/armors/arm", true, /\.png$/);
const armImages = importImages(armContext);

const legContext = require.context("resources/armors/leg", true, /\.png$/);
const legImages = importImages(legContext);

const Images = {
    subject: subjectImages,
    weapon: weaponImages,
    chest: chestImages,
    head: headImages,
    arm: armImages,
    leg: legImages
}

export default Images;