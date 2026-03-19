export default {
    "Q": {
        "damage": {
            "base": [50,80,110,140,170],
            "amp": 40,
            "maxHP": 5
        },
        // 気絶時間
        "stun": 0.7,
        "cooldown": 7
    },
    // 通常W：先制対応
    "W": {
        "damage": {
            "base": [20,50,80,110,140],
            "amp": 55,
            "targetMaxHP": 2.5
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        "cooldown": [7,6.5,6,5.5,5]
    },
    // 盾展開中W（EW）：緊急鎮火
    "W2": {
        // 持続時間
        "duration": 2,
        // ダメージ発生周期
        "tick": 0.25,
        // 1ティックあたりダメージ
        "damage": {
            "base": [10,20,30,40,50],
            "amp": 25,
            "maxHP": 0.5
        },
        // 移動速度減少効果最大値
        "slow_max": 40,
        "cooldown": 7
    },
    // 通常E：縦防御
    "E": {
        // 盾持続時間
        "duration": 4,
        // ダメージ免疫効果時間
        "invulnerable": 0.5,
        // 被ダメージ減少量（％）
        "damage_reduction": {
            "base": [20,24,28,32,36],
            "amp": 3
        },
        "cooldown": [16,15,14,13,12]
    },
    // 盾展開中E（EE）：盾突進
    "E2": {
        "damage": {
            "base": [60,85,110,135,160],
            "amp": 60,
            "maxHP": 10
        },
        "cooldown": 2
    },
    "R": {
        // 自分に使用時効果
        "self": {
            "shield": {
                "base": [100,150,200],
                "amp": 50,
                "lostHP": 20
            },
            // シールド持続時間
            "duration": 2.5,
            // 発動後水爆弾発動までの時間
            "channel": 0.55,
            "damage": {
                "base": [70,150,230],
                "amp": 40,
                "maxHP": 10
            },
            // 移動速度減少
            "slow": {
                "duration": 1,
                "effect": 50
            }
        },
        // 味方に使用時効果
        "ally": {
            "shield": {
                "base": [100,200,300],
                "amp": 50,
                "targetLostHP": 15
            },
            // シールド持続時間
            "duration": 2.5,
            // 発動後移動までの時間
            "channel": 3,
            // 攻撃半径
            "range": 5,
            "damage": {
                "base": [70,150,230],
                "amp": 40,
                "maxHP": 10
            },
            // エアボーン時間
            "airborne": 0.75
        },
        "cooldown": [80,70,60]
    },
    "T": {
        // 自己回復周期
        "heal_period": 5,
        // 自己回復量
        "heal": {
            "maxHP": [1,2,3],
            "amp": 18
        },
        // 蘇生時間短縮量（秒）
        "revive": [0.5,0.75,1],
        // 蘇生時追加体力回復
        "additional_heal": {
            "targetMaxHP": {
                "base": [5,10,15],
                "amp": 3
            }
        }
    }
}