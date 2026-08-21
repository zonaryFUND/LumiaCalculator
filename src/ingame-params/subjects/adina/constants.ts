export default {
    "Q": {
        "damage": {
            "base": [60,85,110,135,160],
            "amp": 60
        },
        // 太陽追加効果（追加ダメージ）
        "sun": {
            "base": 30,
            "amp": 25
        },
        // 月追加効果（気絶時間）
        "moon": 0.7,
        // 星追加効果（移動速度増加エリア作成）
        "star": {
            "duration": 4,
            "movement_speed": 20
        },
        // 太陽コンジャンクション効果（追加持続ダメージ）
        "conjunction": {
            "duration": 2,
            "damage": {
                "targetMaxHP": 10
            }
        },
        "cooldown": [6,5.5,5,4.5,4]
    },
    "W": {
        "damage": {
            "base": [70,90,110,130,150],
            "amp": 60
        },
        // 移動速度減少
        "slow": {
            "duration": 1.2,
            "effect": 35
        },
        // 太陽追加効果（追加ダメージ）
        "sun": {
            "base": 30,
            "amp": 25
        },
        // 月追加効果（気絶時間）
        "moon": 1.25,
        // 星追加効果（シールド付与）
        "star": {
            "duration": 2,
            "shield": {
                "base": [60,90,120,150,180],
                "amp": 35
            }
        },
        // 月コンジャンクション効果
        "conjunction": {
            // 1撃目気絶時間
            "stun": 1.25,
            // 2撃目移動速度減少
            "slow": {
                "duration": 2.5,
                "effect": 60
            }
        },
        "cooldown": [9,8.5,8,7.5,7]
    },
    "E": {
        // 天体付与時ダメージ
        "damage": {
            "base": [40,60,80,100,120],
            "amp": 40
        },
        // 天体落下時ダメージ
        "drop_damage": {
            "base": [40,60,80,100,120],
            "amp": 40
        },
        // 太陽追加効果（追加ダメージ）
        "sun": {
            "base": 20,
            "amp": 15
        },
        // 月追加効果（気絶時間）
        "moon": 1,
        // 星追加効果（与ダメージ比回復量）
        "star": 35,
        // 星コンジャンクション効果（回復エリア持続時間）
        "conjunction": 4,
        "cooldown": [10,9.5,9,8.5,8]
    },
    "R": {
        // Q太陽コンジャンクション効果（追加ダメージ）
        "sun_conjunction": {
            "base": [90,150,210,270],
            "amp": 100
        },
        // W月コンジャンクション効果（1発あたりダメージ）
        "moon_conjunction": {
            "base": [50,90,130,170],
            "amp": 45
        },
        // E星コンジャンクション効果（秒間回復量）
        "star_conjunction": {
            "heal": {
                "base": [20,30,40,50],
                "amp": 6
            }
        },
        "cooldown": {
            "constant": 0.1
        }
    },
    "T": {
        // スターゲイザー状態持続時間
        "duration": 3,
        // 移動速度増加
        "movement_speed": {
            "base": [7,10,13],
            "amp": 1
        }
    }
}