/**
 * 武器の種類を示す
 */
export type WeaponTypeID = "VFArm" | "Arcana" | "Camera" | "Guitar" | "Glove" | "Tonfa" | "Bat" | "Rapier" | "DirectFire" | "Bow" |
    "Hammer" | "Pistol" | "CrossBow" | "SniperRifle" | "DualSword" | "Nunchaku" | "Spear" | "OneHandSword" | "HighAngleFire" | "AssaultRifle" | 
    "Axe" | "Whip" | "TwoHandSword"

/**
 * 与えられた武器種の近接/遠隔を返す
 * @param id 武器種
 * @returns 近接か遠隔か
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