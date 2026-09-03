export default {
    "Q": {
        // 風の刃1発あたりダメージ
        "damage": {
            "base": [50, 65, 80, 95, 110],
            "amp": 40
        },
        // 風の刃2発目以降的中時ダメージ（元ダメージ比％）
        "second_hit": 60,
        // 竜巻ダメージ発生周期
        "vortex_tick": 0.5,
        // 竜巻持続時間
        "vortex_duration": 2,
        // 竜巻1ティックあたりダメージ
        "vortex_damage": {
            "base": [40, 60, 80, 100, 120],
            "amp": 40
        },
        "cooldown": [7, 6.5, 6, 5.5, 5]
    },
    "W": {
        // 通常ダメージ
        "damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [31, 32, 33, 34, 35]
        },
        // 強化ダメージ
        "enhanced_damage": {
            "base": [100, 135, 170, 205, 240],
            "amp": 85
        },
        "cooldown": [9, 8.5, 8, 7.5, 7]
    },
    "E": {
        // スキル的中時クールダウン減少
        "cooldown_reduction": 0.9,
        // 風雲地帯持続時間
        "duration": 5,
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 50
        },
        "cooldown": {
            "constant": [11, 10.5, 10, 9.5, 9]
        }
    },
    "R": {
        // 鶴召喚寺ダメージ
        "damage": {
            "base": [50, 100, 150],
            "amp": 45
        },
        // 鶴召喚的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 45
        },
        // 鶴が飛びあがるまでの時間
        "second_attack": 1,
        // 鶴飛び上がりダメージ
        "second_damage": {
            "base": [100, 200, 300],
            "amp": 70,
            "targetMaxHP": 10
        },
        // 鶴飛び上がり的中時エアボーン時間
        "airborne": 0.7,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 風雲地帯移動速度増加（％）
        "movement_speed": 10,
        // シールド持続時間
        "shield_duration": 2.5,
        // 強化Q/E使用時シールド
        "shield": {
            "base": [40, 70, 100],
            "amp": 25
        }
    }
}