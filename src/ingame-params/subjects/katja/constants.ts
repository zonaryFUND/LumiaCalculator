export default {
    "Q": {
        // 最小ダメージ
        "min_damage": {
            "base": [40, 80, 120, 160, 200],
            "attack": 70
        },
        // 最大ダメージ
        "max_damage": {
            "base": [60, 120, 180, 240, 300],
            "attack": 105
        },
        // 的中時攻撃速度増加
        "attack_speed": {
            "duration": 4,
            "effect": [20, 25, 30, 35, 40]
        },
        "cooldown": [7, 6, 5, 4, 3]
    },
    "W": {
        // 的中対象の可視時間
        "enemy_reveal": 1,
        // 波動残存時間
        "duration": 3,
        "cooldown": [30, 27, 24, 21, 18]
    },
    "E": {
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "attack": 100
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": [50, 55, 60, 65, 70]
        },
        // 的中時自己移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 40
        },
        "cooldown": [12, 11, 10, 9, 8]
    },
    "R": {
        // 1発目ダメージ
        "first_damage": {
            "base": [300, 450, 600],
            "attack": 150
        },
        // 2発目ダメージ
        "second_damage": {
            "base": [350, 500, 650],
            "attack": 180
        },
        // 3発目ダメージ
        "third_damage": {
            "base": [400, 700, 1000],
            "attack": 200
        },
        // 非発動時クールダウン返還（％）
        "cooldown_return": 35,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 灰色の死神：次の基本攻撃強化時間
        "duration": 5,
        // 灰色の死神：基本攻撃追加ダメージ
        "damage": {
            "base": [50, 75, 100],
            "attack": [30, 45, 60]
        },
        // ボーナス：獲得クレジット
        "credit": 4
    }
}