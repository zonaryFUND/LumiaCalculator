export default {
    "Q": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 70
        },
        // 的中時Wクールダウン減少
        "w_cooldown_reduction": 0.75,
        // W範囲内へ引き寄せられたときの的中ダメージ
        "pull_damage": {
            "base": [30, 55, 80, 105, 130],
            "amp": 45
        },
        // 引き寄せ的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 引き寄せ発生時Qクールダウン減少
        "pull_q_cooldown_reduction": 40,
        // ボタン最大設置数
        "max_buttons": 3,
        // ボタン持続時間
        "duration": 8,
        // ボタン複数ヒット時与ダメージ減少（元ダメージ比％）
        "prural_hit": 45,
        "cooldown": [6, 5.5, 5, 4.5, 4]
    },
    "W": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 70
        },
        // Q引き寄せ発生時範囲内固定ダメージ
        "pull_damage": {
            "base": [10, 15, 20, 25, 30]
        },
        // 範囲持続時間
        "duration": 5,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "E": {
        // 1UP持続時間
        "duration": 2.5,
        // 発動時不死時間
        "immortal": 0.5,
        // 発動時自己回復
        "heal": {
            "maxHP": {
                "base": 30,
                "amp": 0.75
            }
        },
        // 発動時移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": {
                "base": 40,
                "amp": 2
            }
        },
        "cooldown": [32, 29, 26, 23, 20]
    },
    "R": {
        // 発動時自己シールド
        "shield": {
            "base": [50, 85, 120],
            "amp": [25, 30, 35],
            "stack": [15, 20, 25]
        },
        // 発動時行動妨害免疫時間
        "cc_immune": 6,
        // エリア端接触時気絶時間
        "stun": 0.4,
        // 範囲内Q的中時持続時間延長
        "extend": 0.3,
        // 範囲内全体ダメージ発生周期
        "damage_threshold": 8,
        // 範囲内全体ダメージ
        "inner_damage": {
            "base": [50, 75, 100],
            "amp": 45
        },
        // 効果中Qクールダウン上書き
        "q_cooldown": [2.5, 2.25, 2],
        "cooldown": [80, 70, 60]
    },
    "T": {
        // K.O.スタック蓄積ダメージ基礎値
        "stack_base": {
            "base": [30, 60, 90],
            "amp": 15
        },
        // K.O.スタック1あたり蓄積ダメージ追加量
        "stack": {
            "base": [4, 8, 12],
            "amp": 3
        },
        // K.O.スタック持続時間
        "duration": 5
    }
}