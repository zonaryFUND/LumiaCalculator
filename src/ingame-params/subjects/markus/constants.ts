export default {
    "Q": {
        // 基本攻撃強化回数
        "count": 3,
        // 攻撃速度増加
        "attack_speed": [20, 40, 60, 80, 100],
        // 追加ダメージ
        "damage": {
            "base": [10, 20, 30, 40, 50],
            "additionalMaxHP": 18
        },
        // 追加与ダメージ比自己回復（％）
        "heal": 130,
        // 持続時間
        "duration": 5,
        // 敵に向かって移動するときの移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [4, 6, 8, 10, 12]
        },
        "cooldown": [7, 6, 5, 4, 3]
    },
    "W": {
        "damage": {
            "base": [60, 115, 170, 225, 280],
            "attack": 60,
            "additionalMaxHP": 10
        },
        // エアボーン時間
        "airborne": 0.8,
        // R範囲内に使用したときの投げ飛ばし距離
        "r_combo_knockback": 3,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "E": {
        // 移動距離
        "distance": 5,
        "damage": {
            "base": [60, 105, 150, 195, 240],
            "attack": 70
        },
        // ノックバック距離
        "knockback": 4,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "R": {
        // 地殻変動持続時間
        "tectonic_rift": 3,
        "damage": {
            "base": [150, 300, 450],
            "attack": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 90
        },
        // 防御力減少
        "defense_down": {
            "duration": 4,
            "effect": 15
        },
        // ショック状態発動時クールダウン減少
        "cooldown_reduction": 3,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 壁/別対象的中時追加ダメージ
        "damage": {
            "base": [20, 60, 100],
            "targetMaxHP": 10
        },
        // 壁/別対象的中時気絶時間
        "stun": 0.6,
        // 壁/別対象的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 30
        },
        // ショック状態持続時間
        "shock": 4,
        // ショック状態対象への飛びつき可能距離
        "shock_range": 6.5,
        // 一撃発動時基本攻撃追加ダメージ
        "additional_damage": {
            "base": [50, 80, 110],
            "attack": 80
        }
    }
}