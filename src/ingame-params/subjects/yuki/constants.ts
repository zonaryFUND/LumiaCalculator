export default {
    "Q": {
        "damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 100,
            "basicAttackAmp": 100
        },
        // 双剣使用時の強化基本攻撃ダメージ
        "dual_sword_damage": {
            "base": [40, 60, 80, 100, 120],
            "attack": 150,
            "basicAttackAmp": 100
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // ボタン消費時気絶時間
        "stun": 0.5,
        "cooldown": 6
    },
    "W": {
        // 与ダメージ時クールダウン減少
        "cooldown_reduction": 1,
        // 服装整え時間
        "channeling": 1,
        // ダメージ減少
        "damage_reduction": {
            "base": 10,
            "attack": 18
        },
        // Eクールダウン減少
        "e_cooldown_reduction": 3,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        "damage": {
            "base": [40, 75, 110, 145, 180],
            "attack": 90
        },
        // 移動距離
        "distance": 2,
        // 攻撃速度減少
        "attack_speed_down": {
            "duration": 1,
            "effect": 60
        },
        // 的中時クールダウン減少
        "cooldown_reduction": 3,
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 切り裂きダメージ
        "damage": {
            "base": [200, 250, 300],
            "attack": 200
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 99
        },
        // 刻印発動固定ダメージ
        "mark_damage": {
            "targetMaxHP": {
                "base": [6, 10, 14],
                "attack": 5
            }
        },
        "cooldown": [90, 75, 60]
    },
    "T": {
        // ボタン消費追加ダメージ
        "damage": {
            "base": 40,
            "attack": [25, 35, 45]
        }
    }
}