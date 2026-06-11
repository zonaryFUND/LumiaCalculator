export default {
    // 超再生
    "healing_factor": {
        "enhance": 10,
        "adaptive": {
            "base": 1,
            "level": 0.5
        },
        "duration": 2
    },
    // 増幅ドローン
    "amplification_drone": {
        "duration": 4.5,
        "movement_speed": {
            "base": 10,
            "level": 0.6
        },
        "skill_damage_amp": {
            "base": 8,
            "level": 0.5
        },
        "cooldown": 30
    },
    // 治癒ドローン
    "healing_drone": {
        "range": 4,
        "threshold": 40,
        "duration": 3,
        "heal": {
            "lostHP": {
                "base": 3,
                "level": 0.3
            }
        },
        "cooldown": 30,
        "multiple_reduction": 50
    },
    // 献身
    "sentinel": {
        "range": 8,
        "duration": 6,
        "cooldown": 6,
        "shield_amp": {
            "threshold": 30,
            "effect": 1.5
        },
        "max_shield": 35,
        "shield": {
            "base": 40,
            "level": 5
        }
    },
    // 狩りの戦慄
    "thrill_of_the_hant": {
        "damage_increase": 20,
        "heal_min": {
            "base": 60,
            "attack": 5,
            "amp": 3
        },
        "heal_max_multiplier": 3,
        "movement_speed": {
            "effect": 12,
            "duration": 2
        },
        "cooldown": 3
    },
    // イバラの棘
    "thorn_shackles": {
        "effect": 5,
        "duration": 5,
        "cooldown": 2,
        "healing_reduction": 20
    },
    // 威圧感
    "power_of_intimidation": {
        "range": 3,
        "damage_increase": 4,
        "max_stack": 3,
        "effect_decline": 25
    },
    // サボテン爆弾
    "blast_cactus": {
        "duration": 5,
        "cooldown": 8,
        "damage": {
            "base": [
                10,
                20,
                30,
                40,
                50,
                60,
                60,
                70,
                70,
                80,
                80,
                90,
                90,
                100,
                100,
                110,
                120,
                130,
                140,
                150
            ],
            "targetMaxHP": 5
        },
        "unexploded_decline": 70,
        "animal_damage": 150
    },
    //　コイントス
    "coin_toss": {
        "coin": [
            7,
            12
        ]
    },
    // キャンピングガイド
    "camping_guide": {
        "movement_speed": {
            "effect": 0.8,
            "duration": 5
        }
    },
    // 後方支援
    "logistics": {
        "amount": 2
    },
    // 割引券
    "penny_pitcher": {
        "amount": 20
    }
}