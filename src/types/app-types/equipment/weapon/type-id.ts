//export type WeaponTypeID = "vf_prosthetic" | "arcana" | "camera" | "guitar" | "glove" | "tonfa" | "bat" | "rapier" | "shuriken" | "bow" |
//    "hammer" | "pistol" | "crossbow" | "sniper_rifle" | "dual_swords" | "nunchaku" | "spear" | "dagger" | "throw" | "assaultrifle" | 
//    "axe" | "whip" | "twohandsword"

export type WeaponTypeID = "VFArm" | "Arcana" | "Camera" | "Guitar" | "Glove" | "Tonfa" | "Bat" | "Rapier" | "DirectFire" | "Bow" |
    "Hammer" | "Pistol" | "CrossBow" | "SniperRifle" | "DualSword" | "Nunchaku" | "Spear" | "OneHandSword" | "HighAngleFire" | "AssaultRifle" | 
    "Axe" | "Whip" | "TwoHandSword"

/*
export function SanitizeApiWeaponName(apiName: string): WeaponTypeID {
    const lowercase = apiName.toLowerCase();
    if (lowercase == "highanglefire") return "throw";
    if (lowercase == "directfire") return "shuriken";
    if (lowercase == "assaultrifle") return "assaultrifle";
    if (lowercase == "sniperrifle") return "sniper_rifle";
    if (lowercase == "onehandsword") return "dagger";
    if (lowercase == "twohandsword") return "twohandsword";
    if (lowercase == "dualsword") return "dual_swords";
    if (lowercase == "vfarm") return "vf_prosthetic";
    return lowercase as WeaponTypeID;
}
    */

export function meleeOrRange(id: WeaponTypeID): "melee" | "range" {
    return id == "VFArm" ||
        id == "Glove" ||
        id == "Tonfa" ||
        id == "Bat" ||
        id == "Rapier" ||
        id == "Hammer" ||
        id == "DualSword" ||
        id == "Nunchaku" || 
        id == "Spear" ||
        id == "OneHandSword" ||
        id == "Axe" ||
        id == "Whip" ||
        id == "TwoHandSword" ?
        "melee" : "range";
}