export default {
    "Q": {
        "damage": {
            "base": [40, 75, 110, 145, 180],
            "amp": 40,
            "maxHP": 7
        },
        // パターン持続時間
        "duration": 5,
        // パターン効果中対象的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": [10, 15, 20, 25, 30]
        },
        "cooldown": [5, 4.5, 4, 3.5, 3]
    },
    "W": {
        // 持続時間
        "duration": 1.25,
        // 移動速度増加
        "movement_speed": [10, 14, 18, 22, 26],
        // 被ダメージ減少（％）
        "damage_decline": [31, 32, 33, 34, 35],
        // 爆発時ダメージ
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 45,
            "additionalMaxHP": 10
        },
        "cooldown": {
            "constant": 4
        },
        // 基本攻撃的中時チャージ時間減少
        "charge_time_reduction": 1.5,
        "charge": {
            "time": [26, 25, 24, 23, 22],
            "max": 2
        }
    },
    "E": {
        // シールド持続時間
        "shield_duration": 2.5,
        "shield": {
            "base": [60, 90, 120, 150, 180],
            "amp": 40,
            "maxHP": 7
        },
        // 再使用後攻撃速度増加
        "attack_speed": {
            "duration": 4,
            "effect": [20, 25, 30, 35, 40]
        },
        // 再使用ダメージ
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 50,
            "additionalMaxHP": 10
        },
        // 再使用的中時挑発時間
        "taunt": [0.7, 0.8, 0.9, 1, 1.1],
        // 再使用可能時間
        "reuse": 3,
        "cooldown": [18, 17, 16, 15, 14]
    },
    "R": {
        // 制圧時間
        "supression": 0.5,
        // 対象体力回復
        "heal": {
            "base": [50, 150, 250],
            "amp": 35,
            "targetLostHP": 10
        },
        "cooldown": [90, 75, 60]
    },
    "T": {
        // 基本攻撃追加ダメージ
        "damage": {
            "base": 30,
            "additionalMaxHP": [5, 8, 11]
        },
        // 味方の服アップグレード可能レベル
        "level": [6, 11, 16, 20]
    }
}