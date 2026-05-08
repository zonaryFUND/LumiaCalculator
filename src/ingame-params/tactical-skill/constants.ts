export default {
    // ブリンク
    "blink": {},
    // クエイク
    "quake": {
        "slow": [
            40,
            50
        ],
        "first_damage": {
            "base": [
                50,
                100
            ],
            "level": 10,
            "additionalMaxHP": 10
        },
        "dot_damage": {
            "base": 10,
            "level": 2,
            "additionalMaxHP": 2.5
        },
        "duration": 6,
        "tick": 0.5
    },
    // プロトコル違反
    "protocol_violation": {
        "hp_increase": {
            "base": [150, 200],
            "level": [15, 20]
        },
        "damage": {
            "level": [5, 8],
            "targetMaxHP": [8, 10]
        }
    },
    // 赤嵐
    "electric_shift": {},
    // 超越
    "force_field": {
        "duration": 3,
        "shield": {
            "base": [
                150,
                200
            ],
            "additionalMaxHP": [
                80,
                100
            ]
        },
        "tenacity": {
            "base": 10,
            "additionalMaxHP": 3
        }
    },
    // 強い絆
    "totem": {},
    // 無効化
    "nullification": {},
    // 
    "soul_stealer": {},
    // ストライダー - A13
    "the_strider": {
        "damage": {
            "base": [
                100,
                150
            ],
            "level": [
                5,
                10
            ]
        }
    },
    // 真実の刃
    "blader_of_truth": {
        "damage": {
            "base": 140,
            "level": 20
        },
        "second_damage": {
            "base": 50,
            "level": 10
        }
    },
    // 治癒の風
    "healing_wind": {
        "heal": {
            "base": [
                150,
                200
            ],
            "level": [
                8,
                12
            ]
        },
        "hot": {
            "duration": 3,
            "effect": {
                "base": 100,
                "level": 10
            }
        }
    },
    // ライトウィング
    "wings_of_light": {
        "duration": 6,
        "movement_speed": {
            "base": [15, 20],
            "level": 1
        },
        "attack_speed": 20,
        "slow": {
            "duration": 0.6,
            "effect": 10
        },
        "extend": 0.4,
        "cooldown": [50, 40]
    },
    // リパルサーミサイル
    "repulsor_missile": {
        "ammos": [5, 8],
        "damage": {
            "base": 10,
            "level": 1,
            "targetMaxHP": 0.6
        },
        "cooldown": [50, 40]
    },
    // プラズマダッシュ
    "plasma_dash": {
        "damage": {
            "base": [120, 150],
            "level": [5, 10]
        },
        "slow": {
            "duration": 1.5,
            "effect": 35
        },
        "defense_down": {
            "duration": 5,
            "effect": 10
        },
        "cooldown": [40, 30]
    }
}