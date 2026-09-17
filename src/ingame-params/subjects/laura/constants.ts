export default {
    "Q": {
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 50
        },
        // 再使用可能時間
        "reuse": 3,
        "cooldown": [4, 3.6, 3.2, 2.8, 2.4]
    },
    "W": {
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 50
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [20, 22.5, 25, 27.5, 30]
        },
        // ターゲット持続時間
        "target_duration": 4,
        // ターゲット対象攻撃時自己回復
        "heal": {
            "base": [18, 26, 34, 42, 50],
            "amp": 8
        },
        "cooldown": [10, 9.5, 9, 8.5, 8]
    },
    "E": {
        // 再使用可能時間
        "reuse": 1.5,
        "damage": {
            "base": [110, 145, 180, 215, 250],
            "amp": 75
        },
        // エアボーン時間
        "airborne": 0.55,
        "cooldown": [19, 17.5, 16, 14.5, 13]
    },
    "R": {
        // 引き寄せダメージ
        "first_damage": {
            "base": [50, 100, 150],
            "amp": 10
        },
        // シールド持続時間
        "shield_duration": 1,
        // シールド量
        "shield": {
            "base": [80, 110, 140],
            "amp": 15
        },
        // 爆発ダメージ
        "second_damage": {
            "base": [140,220,300],
            "amp": 90
        },
        // 引き寄せ追加的中1人あたりシールド増加量
        "additional_shield": {
            "base": [30, 40, 50],
            "amp": 10
        },
        // シールド追加効果最大発動数
        "max_additional_shield": 3,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 基本攻撃強化時攻撃速度増加（％）
        "attack_speed": 100,
        // 基本攻撃追加ダメージ
        "damage": {
            "base": [20,45,70],
            "amp": 30
        }
    }
}