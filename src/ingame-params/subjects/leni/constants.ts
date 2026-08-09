export default {
    "Q": {
        "damage": {
            "base": [50,70,90,110,130],
            "level": 8,
            "amp": 60
        },
        "heal": {
            "base": [10, 20, 30, 40, 50],
            "level": 2,
            "amp": 20
        },
        "cooldown": [12,11, 10, 9, 8]
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
                "base": [12,14,16,18,20],
                "amp": 2
            }
        },
        "cooldown": [16, 15, 14, 13, 12]
    },
    "E": {
        "damage": {
            "base": [20, 40, 60, 80, 100],
            "level": 5,
            "amp": 45
        },
        // 気絶時間
        "stun": 0.5,
        // シールド持続時間
        "duration": 2.5,
        "shield": {
            "base": [50, 65, 80, 95, 110],
            "level": 3,
            "amp": 20
        },
        "cooldown": 9
    },
    "R": {
        // 的中時ダメージ
        "damage": {
            "base": [100, 150, 200],
            "level": 8,
            "amp": 55
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
        "cooldown": [20,18,16]
    },
    "T": {
        // クマさん持続時間
        "duration": 5,
        // クマさん追加ダメージ
        "damage": {
            "base": [15,25,35],
            "level": 2,
            "amp": 10
        },
        // クマさん発動時基本スキルクールダウン減少
        "cooldown_reduction": [0.5, 0.75, 1]
    }
}