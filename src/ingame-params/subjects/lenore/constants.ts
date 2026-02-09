export default {
    "Q": {
        "damage": {
            "base": [70, 90, 110, 130, 150],
            "amp": 60
        },
        // 強化時ダメージ増加（元ダメージ比）
        "additional_damage": 35,
        // 同一対象に連続ヒット時の与ダメージ減少（％）
        "same_target_reduction": 55,
        "cooldown": [7, 6.5, 6, 5.5, 5]
    },
    "W": {
        "shield": {
            "duration": 2.5,
            "effect": {
                "base": [70, 85, 100, 115, 130],
                "amp": 30
            }
        },
        "damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 60
        },
        // 束縛時間
        "bind": 0.33,
        "enhance": {
            // 強化時シールド量増加（％）
            "shield": 30,
            // 強化時移動速度増加
            "movement_speed": {
                "duration": 2,
                "effect": 30
            }
        },
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "E": {
        "damage": {
            "base": [60, 95, 130, 165, 200],
            "amp": 75
        },
        // 強化時移動速度減少
        "enhance_slow": {
            "duration": 1.5,
            "effect": 90
        },
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 音波持続時間
        "duration": 3,
        // 音波ダメージ発動間隔
        "damage_tick": 0.25,
        // 音波1ティックあたりダメージ
        "damage": {
            "base": [10, 15, 20],
            "amp": 3
        },
        // 1スタックあたり移動速度減少（％）
        "slow": 3,
        // 移動速度減少スタック最大数
        "max_stack": 12,
        // 爆発ダメージ
        "finish_damage": {
            "base": [150, 225, 300],
            "amp": 65
        },
        // 精神異常時間
        "insane": [1.3, 1.4, 1.5],
        // 精神異常対象の攻撃速度増加（％）
        "insane_attack_speed": 200,
        "cooldown": [90, 80, 70]
    },
    "T": {
        // 悲鳴スタック獲得可能になる敵体力（％）
        "stack_gain_threshold": 50,
        // 悲鳴スタック獲得時追加ダメージ
        "additional_damage": {
            "base": [10, 30, 50],
            "amp": 20,
            "stack": 2
        },
        // 悲鳴スタック -> アッチェレランドへの変換レシオ
        "stack_conversion": 1,
        // アッチェレランド1あたりのクールダウン減少
        "cdr_per_accelerando": 2,
        // アッチェレランドによって獲得できるクールダウン減少の最大値
        "max_cdr": 40,
        // アッチェレランドによるクールダウン減少が最大値を上回る場合の余剰分の究極技クールダウン減少への変換レシオ
        "r_cdr_conversion": 3,
        // アッチェレランドによる究極技クールダウン減少の最大値
        // この値はツールチップには記載されておらず、8.0パッチノートにのみ記載されている
        "max_rcdr": 50,
        "cooldown": {
            "constant": [9, 8, 7]
        }
    }
}