export const Chests = [
    "cardinal_robes", "sunset_armor", "covert_agent_uniform", "optical_camouflage_suit", "rocker_s_jacket", "crusader_armor", "amazoness_armor", "dragon_dobok",
    "commander_s_armor", "butler_s_suit", "eod_suit", "tuxedo", "high_priest_robes", "changpao", "turnout_coat", "doctor_s_gown",
    "mythril_armor", "battle_suit", "blazing_dress",
    "mythril_crop", "kabana", "holy_orders", "áo_dài", "phantom_jacket", "guardian_suit", "elegant_gown", "beautiful_garnment", "specter", "blood_cloak",
    "omertà", "shooting_star_jacket", "couturier", "tactical_armor", "elf_dress", "titan_armor", "the_revenant", "racing_suit", "ghost_bride_s_dress", 
    "inquisitor", "ghillie_suit", "spectral_jacket", "wisdom_robes",
    "bikini", "queen_of_hearts", "burgundy_47"
]
export type ChestID = typeof Chests[number];

export const Heads = [
    "virtuous_outlaw", "crystal_tiara", "motorcycle_helmet", "tactical_ops_helmet", "helm_of_banneret", "imperial_crown", "imperial_burgonet", "mohawk_headgear",
    "vigilante", "diadem", "cowboy_hat", "plasma_helmet", "harmony_in_full_bloom", "welding_helmet", "mythril_helm", "laurel_wreath", "crusader_helmet", "elysian_halo",
    "fallen_pegasus", "persona", "sultan_s_turban", "racing_helmet", "the_star_of_the_wilds", "astronaut_s_helmet", "dwarf_s_helmet", "twilight",
    "gpnvg", "the_black_death", "cyberstalker", "blaster_helmet", "commander_headset", "tactical_visor", "the_dragon_s_fury", "celestial_echo",
    "blue_flames", "bunny_hat", "legatus",
    "chinese_opera_mask", "blood_crown"
]
export type HeadID = typeof Heads[number]

export const Arms = [
    "corrupting_touch", "sword_stopper", "draupnir", "vital_sign_sensor", "creed_of_the_knight", "sheath_of_shah_jahan", "burnished_aegis",
    "tindalos_band", "nightingale", "plasma_arc", "smart_band", "minuteman_armband", "sports_watch", "music_box", "schrödinger_s_box", "laced_quiver",
    "mythril_shield", "cube_watch",
    "tellurian_timepiece", "bracelet_of_skadi", "radar", "auto_arms", "centipede_s_pauldron", "tindalos_monarch", "shield_of_kings",
    "dragon_scale", "chain_of_thorns", "nightmare_nails", "helix", "mythril_armband", "moonlight_pendant", "magic_lamp",
    "claddagh_ring", "smash_totem", "pharaoh_s_artifact", "emerald_tablet", "psyche_s_blade", "burning_heart",
    "solar_system_miniature", "eye_of_horus", "sultan_adorned", "mythril_quiver",
    "dice_of_destiny",
    "prominence", "bloodripper", "necronomicon"
]
export type ArmID = typeof Arms[number]

export const Legs = [
    "hiking_boots", "glacier_crampons", "feather_boots", "marverick_runner", "straitjacket_sneakers", "bucephalus", "eod_boots", "white_rhinos",
    "tachyon_brace", "scv", "stellar_steps", "cowboy_boots", "gladiator",
    "delta_red",
    "mythril_boots", "glacial_shoes", "iron_maiden", "boots_of_hermes", "blade_boots", "alexander", "legs_of_steel",
    "galaxy_steps", "wild_walkers", "mirage_lace-ups", "racing_boots", "taproot", "red_shoes"
]
export type LegID = typeof Legs[number]

export type ArmorID = ChestID | HeadID | ArmID | LegID;