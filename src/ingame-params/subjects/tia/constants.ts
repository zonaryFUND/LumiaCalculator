export default {
    "Q": {
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 50
        },
        // 黄色
        "y": {
            // 黄色付着時移動速度減少
            "slow": {
                "duration": 1,
                "effect": 30
            }
        },
        // 赤
        "r": {
            // 赤付着時移動速度減少
            "slow": {
                "duration": 1,
                "effect": 40
            }
        },
        // 青
        "b": {
            // 青付着時移動速度減少
            "slow": {
                "duration": 1,
                "effect": 20
            },
            // 中央的中時追加ダメージ
            "center_addition": {
                "base": [60, 90, 120, 150, 180]
            },
            // 中央的中時移動速度減少
            "center_slow": {
                "duration": 1,
                "effect": 70
            }
        },
        "cooldown": {
            "constant": 0.5
        }
    },
    "W": {
        // 黄色絵具のクールダウン
        "y": [8, 6.5, 5],
        // 赤色絵具のクールダウン
        "r": [6, 4.5, 3],
        // 青色絵具のクールダウン
        "b": [7, 5.5, 4],
        "cooldown": {
            "constant": 0.02
        }
    },
    "E": {
        "damage": {
            "base": [40, 90, 140, 190, 240],
            "amp": 80
        },
        "cooldown": {
            "constant": [13, 12, 11, 10, 9]
        }
    },
    "R": {
        "damage": {
            "base": [150, 250, 350],
            "amp": 100
        },
        // 基礎気絶時間
        "stun": [0.8, 1, 1.2],
        // 色が塗られている相手に対する気絶時間増加
        "stun_enhance": 0.5,
        "cooldown": [90, 70, 50]
    },
    "T": {
        // クールダウン減少 -> スキル増幅変換レシオ
        "cooldown_conversion": 1,
        // 赤黄：怒りのリス
        "yr": {
            "damage": {
                "base": [60, 115, 170, 225, 280],
                "amp": 160
            },
            // ダメージ分割時間
            "duration": 1.4,
            // ダメージ分割ティック数
            "count": 4
        },
        // 赤青：祝福のリス
        "rb": {
            // 自己回復量（与ダメージ比％）
            "heal": 170,
            // 移動速度増加
            "movement_speed": {
                "duration": 2,
                "effect": [20, 25, 30, 35, 40]
            },
            "damage": {
                "base": [40, 75, 110, 145, 180],
                "amp": 140
            }
        },
        // 青黄：魔法のリス
        "by": {
            "damage": {
                "base": [50, 90, 130, 170, 210],
                "amp": 95
            },
            // 束縛時間
            "bind": 1.25
        }
    }
}