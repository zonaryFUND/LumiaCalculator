export default {
    "Q": {
        "cooldown": [9, 8.5, 8, 7.5, 7]
    },
    "Q1": {
        // ダメージ発生周期
        "tick": 0.12,
        // 基礎ダメージ
        "damage": {
            "base": [8, 16, 24, 32, 40],
            "amp": 14
        },
        // 強化ダメージが発生するティック番号
        "enhance": [1, 5, 10],
        // 強化ダメージ
        "enhanced_damage": {
            "base": [20, 30, 40, 50, 60],
            "amp": 25
        },
        // Q2が発動可能になる強化ダメージ的中回数閾値
        "Q2_enable_enhanced_attack": 2,
        // 発動中移動速度減少ペナルティ
        "movement_speed_penalty": 15
    },
    "Q2": {
        // 中央部ダメージ
        "center_damage": {
            "base": [50, 80, 110, 140, 170],
            "amp": 85
        },
        // 中央的中時移動速度減少
        "slow": {
            "duration": 1.2,
            "effect": 55
        },
        // 外側ダメージ
        "outer_damage": {
            "base": [50, 70, 90, 110, 130],
            "amp": 60
        }
    },
    "W": {
        "cooldown": [12, 11, 10, 9, 8]
    },
    "W1": {
        // 持続時間
        "duration": 0.8,
        // 発動中移動速度減少ペナルティ
        "movement_speed_penalty": 15
    },
    "W2": {
        "damage": {
            "base": [70, 115, 160, 205, 250],
            "amp": 85
        },
        // 移動速度増加（％）
        "movement_speed": 100
    },
    "E": {
        "cooldown": [10, 9.5, 9, 8.5, 8]
    },
    "E1": {
        // 絡め捕り的中時最小ダメージ
        "first_min_damage": {
            "base": [10, 25, 40, 55, 70],
            "amp": 30
        },
        // 絡め捕り的中時最大ダメージ
        "first_max_damage": {
            "base": [30, 50, 70, 90, 110],
            "amp": 50
        },
        // 突進最小ダメージ
        "second_min_damage": {
            "base": [20, 30, 40, 50, 60],
            "amp": 20
        },
        // 突進最大ダメージ
        "second_max_damage": {
            "base": [40, 60, 80, 100, 120],
            "amp": 50
        },
        // 発動中移動速度減少ペナルティ
        "movement_speed_penalty": 15
    },
    "E2": {
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 75
        },
        // エアボーン時間
        "airborne": 0.75
    },
    "R": {
        // 非戦闘状態気合スタック消失周期
        "focus_disappear": 3,
        "damage": {
            "base": [100, 225, 350],
            "amp": 60
        },
        // 的中時シールド持続時間
        "shield_duration": 4,
        "shield": {
            "base": [40, 100, 160],
            "amp": 50
        },
        // 発動後基本攻撃的中時QWEクールダウン減少
        "cooldown_reduction": 1,
        // 鍛錬の成果スタック保有時攻撃速度増加（％）
        "attack_speed": [20, 30, 40],
        "cooldown": 6
    },
    "T": {
        // 非戦闘時鍛錬の成果スタック獲得数
        "stack_gain": [2, 3, 4],
        // 追加の鍛錬の成果スタック獲得に必要な休憩時間
        "rest": 2,
        // 休憩時鍛錬の成果スタック追加獲得数
        "additional_stack_gain": [3, 5, 7],
        // 鍛錬の成果保有時R使用後基本攻撃追加ダメージ
        "damage": {
            "amp": [20, 40, 60]
        }
    }
}