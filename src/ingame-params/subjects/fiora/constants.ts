export default {
    "Q": {
        "damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 75
        },
        // 先端ヒット時追加ダメージ
        // ツールチップ表記の都合上、このダメージは追加分だけを記述している
        // パッチノートにおいては合計値が記載されており、減算した結果を記述する必要がある
        "additional_damage": {
            "base": [50, 95, 140, 185, 230],
            "amp": 15
        },
        // 先端ヒット時移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 40
        },
        "cooldown": [8, 7, 6, 5, 4]
    },
    "W": {
        "damage": {
            "base": [30, 65, 100, 135, 170],
            "amp": 30
        },
        "cooldown": [7, 6, 5, 4, 3]
    },
    "E": {
        "damage": {
            "base": [70, 105, 140, 175, 210],
            "amp": 55
        },
        // 的中時再使用可能時間
        "reuse": 4,
        "cooldown": 8.5
    },
    "R": {
        // 1,2段目ダメージ
        "damage": {
            "base": [100, 160, 220],
            "amp": 45
        },
        // 1,2段目的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 70
        },
        // 3段目ダメージ
        "finish_damage": {
            "base": [160, 270, 380],
            "amp": 80
        },
        // 3段目的中時気絶時間
        "stun": 0.75,
        "cooldown": [70, 60, 50]
    },
    "T": {
        // トゥシェ刻印最大値
        "max_stack": 4,
        // 刻印消化時追加ダメージ
        "damage": {
            "base": [20, 60, 100],
            "amp": 45
        },
        // 刻印消化時回復量
        "heal": {
            "base": [20, 40, 60],
            "amp": 25
        },
        // 刻印消化時移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [15, 20, 25]
        },
        // 刻印消化時Qクールダウン減少
        "q_cooldown_reduction": 80,
        // 刻印消化時Q以外のクールダウン減少
        "cooldown_reduction": 50
    }
}