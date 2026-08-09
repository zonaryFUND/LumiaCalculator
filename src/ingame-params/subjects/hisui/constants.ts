export default {
    "Q": {
        // 1撃目ダメージ
        "first_damage": {
            "base": [70, 75, 80, 85, 90],
            "additionalAttack": [70, 75, 80, 85, 90]
        },
        // 2撃目ダメージ
        "second_damage": {
            "base": [70, 85, 100, 115, 130],
            "additionalAttack": [100, 105, 110, 115, 120]
        },
        // 2撃目的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        "cooldown": {
            "constant": [10, 9.5, 9, 8.5, 8]
        }
    },
    "W": {
        // W1：一刀両断
        "W1": {
            // 1撃目ダメージ
            "first_damage": {
                "base": [15, 30, 45, 60, 75],
                "additionalAttack": 40
            },
            // 2撃目ダメージ
            "second_damage": {
                "base": [20, 40, 60, 80, 100],
                "additionalAttack": 85,
                "targetMaxHP": 3
            },
            // 的中時シールド
            "shield": {
                "base": [10, 15, 20, 25, 30],
                "additionalAttack": 30
            },
            // 複数対象的中時シールド増幅最大値（％）
            "shield_enhance": 50
        },
        // W2：一閃
        "W2": {
            "damage": {
                "base": [30, 50, 70, 90, 110],
                "additionalAttack": 100
            },
            // 最後に的中した対象へのダメージ
            "final_target_damage": {
                "base": [50, 80, 110, 140, 170],
                "additionalAttack": 140
            },
            // 最後に的中した対象へのエアボーン時間
            "airborne": 0.5
        },
        // W3：日輪乱舞
        "W3": {
            // 最初の連続ダメージ
            "first_damage": {
                "base": 10,
                "additionalAttack": [15, 20, 25, 30, 35]
            },
            // 最初のダメージ発動回数基礎値
            "count": 4,
            // 最初のダメージ発動回数最大値
            "max_count": 8,
            // 最初のダメージ的中時の与ダメージ比自己回復（％）
            "first_heal": 75,
            // 最後のダメージ
            "second_damage": {
                "base": [50, 80, 110, 140, 170],
                "additionalAttack": 100
            },
            // 最後のダメージ的中時の与ダメージ比自己回復（％）
            "second_heal": 75,
            // 野生動物に的中したときの回復量（元ダメージ比％）
            "animal_heal": 35
        }
    },
    "E": {
        "damage": {
            "base": [70, 100, 130, 160, 190],
            "additionalAttack": 110
        },
        "cooldown": {
            "constant": 15
        }
    },
    "R": {
        // 持続時間
        "duration": 15,
        // 基本攻撃射程増加
        "range": 1,
        // 効果時間中追加ダメージ
        "additional_damage": {
            "base": 20,
            "additionalAttack": [15, 30, 45]
        },
        // 再使用時1撃目ダメージ
        "first_damage": {
            "base": [80, 120, 160],
            "additionalAttack": 95
        },
        // 再使用時1撃目的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 再使用時2撃目ダメージ
        "second_damage": {
            "additionalAttack": [50, 70, 90],
            "targetMaxHP": 6
        },
        // 再使用時2劇目的中時処刑発動体力閾値（％）
        "execution_threshold": 10,
        "cooldown": [65, 55, 45]
    },
    "T": {
        // 基本攻撃速度基礎値
        "base_as": 0.8,
        // 1レベルあたりの攻撃速度増加
        "as_per_level": 0.025,
        // 攻撃速度ステータスを攻撃力へ変換する割合（追加攻撃速度％ -> 追加攻撃力％）
        "as_conversion": 0.15,
        // 剣の記憶スタック持続時間
        "duration": 5,
        // 剣の記憶スタック最大値
        "max_stack": 2,
        // 剣の記憶スタック消化時Q/Eクールダウン減少（％）
        "qe_cooldown_reduction": [10, 15, 20],
        // 剣の記憶スタック消化時移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": [10, 20, 30]
        }
    }
}