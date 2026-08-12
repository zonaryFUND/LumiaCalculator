export default {
    // ステラチャージ
    "stellar_charge": {
        "time_bound": 5,
        "max_stack": 3,
        "duration": 5,
        "damage": {
            "base": 30,
            "level": 2
        },
        "cooldown_reduction": 35,
        "cooldown": 15,
        "animal_damage_multiplier": 2,
        "animal_cooldown_reduction": 15
    },
    // 鬼火
    "ghost_light": {
        "threshold": {
            "hp": 30,
            "time": 3
        },
        "damage": {
            "base": 50,
            "level": 10,
            "additionalAttack": 70,
            "amp": 20
        },
        "healing_reduction": 30,
        "duration": 5,
        "cooldown_acceleration": 5,
        "cooldown": 30
    },
    // 霹靂
    "red_sprite": {
        "damage": {
            "base": 30,
            "level": 2,
            "additionalAttack": 45,
            "amp": 26
        },
        "cooldown": 10,
        "damage_amp": {
            "range": 5,
            "effect": 20
        },
        "transport": {
            "range": 4,
            "damage_reduction": 20
        },
        "cooldown_reduction": {
            "single_target": 12,
            "aoe": 5,
            "dot": 2
        }
    },
    // 渦流
    "syphon_maelstorm": {
        "time_bound": 3,
        "threshold": 2,
        "duration": 2.5,
        "movement_speed": {
            "melee": 10,
            "range": 5
        },
        "damage": {
            "level": 5,
            "additionalAttack": 80,
            "amp": 40
        },
        "heal": {
            "additionalAttack": 70,
            "amp": 20,
            "maxHP": 7,
            "lostHP": 10
        },
        "additional_heal_per_hit": 40,
        "additional_heal_max": 80,
        "overheal_duration": 5,
        "cooldown": 20
    },
    // サーキュラーシステム
    "circular_system": {
        "heal": {
            "base": 10,
            "level": 1,
            "maxHP": 0.3
        },
        "duration": 3
    },
    // 傷の悪化
    "open_wounds": {
        "damage": {
            "base": 10,
            "level": 2,
            "targetHP": 8
        },
        "duration": 2,
        "cooldown": 10
    },
    // 速射
    "quick_draw": {
        "time_bound": 3,
        "duration": 5,
        "adaptive": {
            "base": 2,
            "level": 0.5
        },
        "attack_speed": 15,
        "cooldown": 15
    },
    // 徹甲弾
    "stopping_power": {
        "armor_penetration": {
            "effect": 6,
            "duration": 4
        },
        "cooldown": 12
    },
    // 力の蓄積
    "power_crescendo": {
        "adaptive": [
            0,
            1,
            2,
            3,
            4,
            6,
            8,
            10,
            12,
            14,
            16,
            16,
            16
        ]
    },
    // オーバーウォッチ
    "overwatch": {
        "cooldown": 5,
        "threshold": 40,
        "adaptive": 5
    },
    // R_echarger
    "r_echarger": {
        "effect": 15,
        "r_buff": {
            "duration": 5,
            "adaptive": {
                "base": 5,
                "level": 0.5
            }
        },
        "cooldown": 20
    },
    // 極上のコレクション
    "celestial_collection": {
        "all_heroic": {
            "adaptiveForce": 2
        },
        "legendary": {
            1: {
                "adaptiveForce": 3
            },
            2: {
                "defense": 2
            },
            3: {
                "maxHP": 40
            },
            4: {
                "movement_speed": 1
            },
            5: {
                "armor_penetration_ratio": 1
            }
        },
        "mythic": {
            1: {
                "omnisyphon": 3
            },
            "2_or_more": {
                "tenacity": 5
            }
        }
    }
}