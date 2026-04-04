export default {
    "Q": {
        // 基本ダメージ
        "damage": {
            "base": [40,70,100,130,160],
            "attack": 90
        },
        // 爪スタック持続時間
        "stack_duration": 8,
        // 強化ダメージ
        "enhanced_damage": {
            "base": [60,105,150,195,240],
            "attack": 135
        },
        // 強化時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // 強化時自己回復
        "heal": {
            "base": [40,65,90,115,140],
            "attack": 60
        },
        // 最大スタック保持中の命中時Eクールダウン減少（％）
        "e_cooldown_reduction": 50,
        "cooldown": [5,4.25,3.5,2.75,2]
    },
    "W": {
        // 尻尾的中時ダメージ
        "damage": {
            "base": [60,90,120,150,180],
            "attack": 80
        },
        // 本能的撤退使用可能時間
        "reuse_time": 4,
        // 本能的撤退ダメージ
        "second_damage": {
            "base": [30,55,80,105,130],
            "attack": 60
        },
        // 対象指定不可時間
        "untargettable": 0.5,
        // 本能的撤退使用時Eクールダウン減少(%)
        "e_cooldown_reduction": 50,
        "cooldown": [14,13.5,13,12.5,12]
    },
    "E": {
        // 移動速度増加
        "movement_speed": {
            "duration": 3,
            "effect": [4,5,6,7,8]
        },
        // 敵に向かって移動するときの移動速度増加
        "additional_movement_speed": [2,3,4,5,6],
        "damage": {
            "base": [40,60,80,100,120],
            "additionalAttack": 55
        },
        "cooldown": [14,13,12,11,10]
    },
    "R": {
        "shield": {
            "duration": 1.5,
            "effect": {
                "base": [150,200,250],
                "attack": 80
            }
        },
        "damage": {
            "base": [150,225,300],
            "attack": 120
        },
        // 移動速度減少
        "slow": {
            "duration": 0.7,
            "effect": 80
        },
        "cooldown": [60,50,40]
    },
    "T": {
        // 「最後の足掻き」効果
        "last_ditch": {
            // 不死身効果時間
            "undying": 1.5,
            // 操作不能時間
            "uncontrollable": 4,
            // 攻撃速度増加
            "attack_speed": 30,
            // 移動速度増加
            "movement_speed": 50,
            // 追加ダメージ
            "additional_damage": {
                "targetMaxHP": 6
            },
            // 敵に攻撃された時の1スタックあたり移動速度減少
            "movement_speed_penalty": {
                "duration": 4,
                "effect": 8
            },
            // 移動速度減少最大スタック数
            "penalty_max_stack": 10,
        },
        // 「VF吸収」効果
        "vf_absorption": {
            // 吸収可能時間
            "duration": 4,
            // ダメージ/回復発生周期
            "effect_period": 0.25,
            "damage": {
                "base": [6,13,20],
                "additionalAttack": 10
            },
            "heal": {
                "base": [7,11,15],
                "additionalAttack": 12
            }
        }
    }
}