import { WeaponTypeID } from "./equipment"

export const Gloves = [
    "one_inch_punch", "divine_fist", "bloodwing_knuckles", "frost_petal_hand", "buddha_s_palm", 
    "brasil_gauntlet", "white_claw_punch", "imperial_silk_gloves", "mask_of_the_phenix", "permafrost",
    "bloody_hand", "bloody_hand_crimson", "bloody_hand_dawn"
]
export type GloveID = typeof Gloves[number];

export const Tonfas = [
    "tactical_tonfa", "mai_sok", "plasma_tonfa", "holster_tonfa", "windrunner", "obsidian_jitte",
    "frozen_echo", "blade_tonfa", "blade_tonfa_crimson", "blade_tonfa_dawn"
]
export type TonfaID = typeof Tonfas[number];

export const Bats = [
    "vajra", "pakua_chang", "statue_of_soteria", "mallet", "spy_umbrella", "magic_stick",
    "monkey_king_bar", "ghost_hand", "rod_of_heart", "rod_of_heart_crimson", "rod_of_heart_dawn"
]
export type BatID = typeof Bats[number]

export const Whips = [
    "thunder_whip", "gleipnir", "plasma_whip", "cathod_lash", "ouranos", "sword_of_scales", 
    "bloody_nine_tails", "bloody_nine_tails_crimson", "bloody_nine_tails_dawn"
]
export type WhipID = typeof Whips[number]

export const Throws = [
    "incendiary_bomb", "david_s_sling", "smoke_bomb", "astrapē", "sticky_bomb", "ruthenium_marble",
    "grenade_of_antioch", "fireball", "dyadic_prism", "imugi_s_pearl", "chaser", "chaser_crimson", "chaser_dawn"
]
export type ThrowID = typeof Throws[number]

export const Shurikens = [
    "cards_of_tyranny", "mystic_jade_charm", "fuhma_shuriken", "azure_dagger", "flechette", "frost_venom_dart", "wind_and_fire_wheels",
    "death_rune", "sudarsana", "petal_torrent", "black_lotus_shuriken", "black_lotus_shuriken_crimson", "black_lotus_shuriken_dawn"
]
export type ShurikenID = typeof Shurikens[number]

export const Bows = [
    "ancient_bolt", "golden-ratio_bow", "twinbow", "jebe_s_altered_bow", "elemental_bow", "artemis",
    "argyrotoxus", "crimson_bow", "failnaught", "failnaught_crimson", "failnaught_dawn"
]
export type BowID = typeof Bows[number]

export const Crossbows = [
    "the_legend_of_the_general", "ballista", "sniper_crossbow", "poisoned_crossbow", "the_golden_ghost",
    "sharanga", "blood_half_moon", "blood_half_moon_crimson", "blood_half_moon_dawn"
]
export type CrossbowID = typeof Crossbows[number]

export const Pistols = [
    "elegance", "electron_blaster", "magnum-boa", "glock_48", "stapede", "devil_s_marksman", "molten_malachite",
    "kelte", "altair", "high_noon", "high_noon_crimson", "high_noon_dawn"
]
export type PistolID = typeof Pistols[number]

export const AssaultRifles = [
    "type_95", "ak-12", "xcr", "gold_rush", "agni", "judgement", "black_widow", "hellfire", "hellfire_crimson", "hellfire_dawn"
]
export type AssaultRifleID = typeof AssaultRifles[number]

export const SniperRifles = [
    "tac-50", "ntw-20", "polaris", "gauss_rifle", "intervention", "the_deadly_ray", "blackfire_cannon",
    "andromeda", "widow_maker", "widow_maker_crimson", "widow_maker_dawn"
]
export type SniperRifleID = typeof SniperRifles[number]

export const Hammers = [
    "fang_mace", "hammer_of_dagda", "hammer_of_thor", "weight_of_the_world", "bookmaster", "eveningstar",
    "squeaky_hammer", "peacebringer", "peacebringer_crimson", "peacebringer_dawn"
]
export type HammerID = typeof Hammers[number]

export const Axes = [
    "beam_axe", "santa_muerte", "scythe", "parashu", "harpe", "the_juggernaut", "axe_of_pangu", "paradise_lost",
    "scarlet_scythe", "scarlet_scythe_crimson", "scarlet_scythe_dawn"
]
export type AxeID = typeof Axes[number]

export const Daggers = [
    "carnwennan", "mount_slicer", "vibroblade", "damascus_steel_thorn", "maharaja", "highlander_dirk", "fragarach",
    "eclipse", "soul_reaper", "scarlet_dagger", "scarlet_dagger_crimson", "scarlet_dagger_dawn"
]
export type DaggerID = typeof Daggers[number]

export const TwoHandedSwords = [
    "thuận_thiên", "arondight", "excalibur", "monohoshizao", "hovud", "arcane_edge", "laevateinn","aurora_longsword",
    "almas", "chained_nightmare", "dáinsleif", "dáinsleif_crimson", "dáinsleif_dawn"
]
export type TwoHandedSwordID = typeof TwoHandedSwords[number]

export const DualSwords = [
    "divine_dual_swords", "asura", "deadly_butterfly", "dioscuri", "starsteel_twin_swords", "lioigor_zahr",
    "spring_and_autumn", "phantom_blade", "phantom_blade_crimson", "phantom_blade_dawn"
]
export type DualSwordID = typeof DualSwords[number]

export const Spears = [
    "eighteen_foot_spear", "lance_of_poseidon", "fangtian_huaji", "dragon_guandao", "gentian_silver_gun", "cosmic_bident",
    "blazing_lance", "star_hunter", "spear_of_longinus", "spear_of_longinus_crimson", "spear_of_longinus_dawn"
]
export type SpearID = typeof Spears[number]

export const Nunchakus = [
    "vibro_nunchaku", "blue_3", "cerberus", "crimson_red_lovers", "hydra", "hydra_crimson", "hydra_dawn"
]
export type NunchakuID = typeof Nunchakus[number]

export const Rapiers = [
    "sword_of_justice", "durendal_mk2", "volticletto", "red_panther", "esprit", "mistilteinn", "meteor_claymore",
    "joyeuse", "eye_of_argos", "nosferatu", "nosferatu_crimson","nosferatu_dawn"
]
export type RapierID = typeof Rapiers[number]

export const Guitars = [
    "bohemian", "stairwaytoheaven", "purplehaze", "satisfaction", "thewall", "teenspirit", "wonderfultonight",
    "cpt_pepper", "heartbreaker", "heartbreaker_crimson", "heartbreaker_dawn"
]
export type GuitarID = typeof Guitars[number]

export const Cameras = [
    "mirrorless", "laser_designator", "vicg", "instant_camera", "cannon_camera", "ultraviolet",
    "vision_flex", "vision_flex_crimson", "vision_flex_dawn"
]
export type CameraID = typeof Cameras[number]

export const Arcanas = [
    "the_hermit", "the_hierophant", "temperance", "the_star", "the_moon", "the_empress",
    "the_death", "the_death_crimson", "the_death_dawn"
]
export type ArcanaID = typeof Arcanas[number]

export const VFProsthetics = [
    "deathadder_queen", "black_mamba_king", "alpha_sidewinder", "deathadder_queen_mt", "deathadde_rqueen_fc",
    "black_mamba_king_tl", "black_mamba_king_fc", "alpha_sidewinder_ml" ,"alpha_sidewinder_fc",
    "deathadder_queen_vbs", "black_mamba_king_vbs", "alpha_sidewinder_vbs"
]
export type VFProstheticID = typeof VFProsthetics[number]

export type WeaponID = GloveID | TonfaID | BatID | WhipID | ThrowID | ShurikenID | BowID | CrossbowID |PistolID | AssaultRifleID | SniperRifleID | HammerID | AxeID | DaggerID | TwoHandedSwordID | DualSwordID | SpearID | NunchakuID | RapierID |
GuitarID | CameraID | ArcanaID | VFProstheticID

export function WeaponIDsForType(type: WeaponTypeID): string[] {
    switch (type) {
        case "arcane": return Arcanas;
        case "assault_rifle": return AssaultRifles;
        case "axe": return Axes;
        case "bat": return Bats;
        case "bow": return Bows;
        case "camera": return Cameras;
        case "crossbow": return Crossbows;
        case "dagger": return Daggers;
        case "dual_swords": return DualSwords;
        case "glove": return Gloves;
        case "guitar": return Guitars;
        case "hammer": return Hammers;
        case "nunchaku": return Nunchakus;
        case "pistol": return Pistols;
        case "rapier": return Rapiers;
        case "shuriken": return Shurikens;
        case "sniper_rifle": return SniperRifles;
        case "spear": return Spears;
        case "throw": return Throws;
        case "tonfa": return Tonfas;
        case "two-handed_sword": return TwoHandedSwords;
        case "vf_prosthetic": return VFProsthetics;
        case "whip": return Whips;
    }
}