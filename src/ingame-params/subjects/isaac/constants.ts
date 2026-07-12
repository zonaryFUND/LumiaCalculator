export default {
    "Q": {
        "damage": {
            "base": [20, 60, 100, 140, 180],
            "attack": 70
        },
        "cooldown": [10, 9, 8, 7, 6]
    },
    "W": {
        "damage": {
            "base": [30, 40, 50, 60, 70],
            "attack": 65
        },
        // このスキルで強化した攻撃が搾取効果を発動させたときのクールダウン減少（％）
        "cooldown_reduction": 25,
        "cooldown": [9, 7.5, 6, 4.5, 3]
    },
    "E": {
        // 再使用可能時間
        "time_bound": 2.5,
        "damage": {
            "base": [30, 60, 90, 120, 150],
            "attack": 60
        },
        // 的中時気絶時間
        "stun": 0.65,
        // 的中時防御力減少
        "defense_down": {
            "duration": 3,
            "effect": 10
        },
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 基礎ダメージ
        "damage": {
            "base": [120, 180, 240],
            "attack": 100
        },
        // 搾取スタックがある対象に的中したときの追加ダメージ
        "additionalDamage": {
            "stack": [2, 5, 8],
            "attack": 5
        },
        // 搾取スタックがある対象に当たったときの移動速度減少（％）
        "slow": 99,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 搾取効果発動に必要なスタック数宇
        "threshold": 3,
        // 搾取効果発動時追加ダメージ
        "damage": {
            "base": [20, 30, 40],
            "attack": 60,
            "targetMaxHP": [4, 5, 6]
        },
        // 搾取効果発動時移動速度増加（％）
        "movement_speed": [6, 18, 30],
        // 搾取効果発動時移動速度増加時間
        "duration": 2,
        // 搾取効果発動時自己回復量
        "heal": [120, 140, 160],
        // 野生動物に対して搾取効果が発動したときの回復量（元回復量比％）
        "animal": 70
    }
}