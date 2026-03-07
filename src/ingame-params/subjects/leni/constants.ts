export default {
    "Q": {
        "damage": {
            "base": [40, 55, 70, 85, 100],
            "level": 18,
            "amp": 30
        },
        "heal": {
            "base": [10, 20, 30, 40, 50],
            "level": 2,
            "amp": 18
        },
        "cooldown": [11, 10, 9, 8, 7]
    },
    "W": {
        "damage": {
            "base": [20, 45, 70, 95, 120],
            "level": 10,
            "amp": 35
        },
        // 移動速度減少
        "slow": {
            "duration": 1.2,
            "center": 80,
            "outer": 40
        },
        // 味方に対する移動速度減少
        "ally_slow": {
            "duration": 0.15,
            "effect": 40
        },
        // 移動速度増加
        "movement_speed": {
            "duration": 1.5,
            "effect": {
                "base": [16, 17, 18, 19, 20],
                "level": 1
            }
        },
        "cooldown": [15, 14, 13, 12, 11]
    },
    "E": {
        "damage": {
            "base": [20, 40, 60, 80, 100],
            "level": 9,
            "amp": 35
        },
        // 気絶時間
        "stun": 0.6,
        // シールド持続時間
        "duration": 2.5,
        "shield": {
            "base": [50, 65, 80, 95, 110],
            "level": 5,
            "amp": 20
        },
        "cooldown": 9
    },
    "R": {
        // 的中時ダメージ
        "damage": {
            "base": [100, 150, 200],
            "level": 12,
            "amp": 40
        },
        // 壁ヒット時追加ダメージ
        "wall_damage": {
            "base": [40, 80, 120],
            "amp": 20,
            "targetMaxHP": 8
        },
        // 壁ヒット時移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 80
        },
        "cooldown": [20, 16, 12]
    },
    "T": {
        // クマさん持続時間
        "duration": 5,
        // クマさん追加ダメージ
        "damage": {
            "base": [20, 30, 40],
            "level": 5
        },
        // クマさん発動時基本スキルクールダウン減少
        "cooldown_reduction": [0.5, 0.75, 1]
    }
}