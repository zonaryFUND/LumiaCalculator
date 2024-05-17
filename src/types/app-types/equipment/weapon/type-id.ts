export type WeaponTypeID = "vf_prosthetic" | "arcana" | "camera" | "guitar" | "glove" | "tonfa" | "bat" | "rapier" | "shuriken" | "bow" |
    "hammer" | "pistol" | "crossbow" | "sniper_rifle" | "dual_swords" | "nunchaku" | "spear" | "dagger" | "throw" | "assault_rifle" | 
    "axe" | "whip" | "two-handed_sword"

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