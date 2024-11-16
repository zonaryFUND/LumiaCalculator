export type WeaponTypeID = "vf_prosthetic" | "arcana" | "camera" | "guitar" | "glove" | "tonfa" | "bat" | "rapier" | "shuriken" | "bow" |
    "hammer" | "pistol" | "crossbow" | "sniper_rifle" | "dual_swords" | "nunchaku" | "spear" | "dagger" | "throw" | "assault_rifle" | 
    "axe" | "whip" | "two-handed_sword"

export function SanitizeApiWeaponName(apiName: string): WeaponTypeID {
    const lowercase = apiName.toLowerCase();
    if (lowercase == "highanglefire") return "throw";
    if (lowercase == "directfire") return "shuriken";
    if (lowercase == "assaultrifle") return "assault_rifle";
    if (lowercase == "sniperrifle") return "sniper_rifle";
    if (lowercase == "onehandsword") return "dagger";
    if (lowercase == "twohandsword") return "two-handed_sword";
    if (lowercase == "dualsword") return "dual_swords";
    if (lowercase == "vfarm") return "vf_prosthetic";
    return lowercase as WeaponTypeID;
}

export function meleeOrRange(id: WeaponTypeID): "melee" | "range" {
    return id == "vf_prosthetic" ||
        id == "glove" ||
        id == "tonfa" ||
        id == "bat" ||
        id == "rapier" ||
        id == "hammer" ||
        id == "dual_swords" ||
        id == "nunchaku" || 
        id == "spear" ||
        id == "dagger" ||
        id == "axe" ||
        id == "whip" ||
        id == "two-handed_sword" ?
        "melee" : "range";
}