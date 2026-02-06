export default {
    "DualSwordsQ": {
        // 1発目（振り下ろし）ダメージ
        "first_damage": {
            "base": [20,40,60,80,100],
            "additionalAttack": [90,100,110,120,130],
            "targetMaxHP": {
                "base": [1,1.5,2,2.5,3],
                "additionalAttack": 4
            }
        },
        // 2発目（引き裂き）ダメージ
        "second_damage": {
            "base": [20,50,80,110,140],
            "additionalAttack": [90,100,110,120,130]
        },
        "cooldown": [10,9.5,9,8.5,8],
        "vp_cost": [60,55,50,45,40]
    },
    "DualSwordsW": {
        "damage": {
            "base": [50,80,110,140,170],
            "additionalAttack": 100
        },
        // 最初に的中した対象へのダメージ増加量（％）
        "first_hit_enhancement": 100,
        // 最初に的中した対象への防御力減少
        "defense_down": {
            "duration": 4,
            "effect": [8,10,12,14,16]
        },
        "cooldown": 10,
        "vp_cost": 30
    },
    "DualSwordsE": {
        "damage": {
            "base": [40,70,100,130,160],
            "additionalAttack": [60,70,80,90,100]
        },
        // 的中時移動速度減少
        "slow": {
            "duration": 0.75,
            "effect": 80
        },
        // 連携攻撃的中時移動速度減少
        "combo_slow": {
            "duration": 0.75,
            "effect": 80
        },
        "cooldown": 11,
        "vp_cost": 40
    },
    "DoubleBladedSwordQ": {
        // 1発目ダメージ
        "first_damage": {
            "base": [40,65,90,115,140],
            "attack": 80
        },
        // 2発目ダメージ
        "second_damage": {
            "base": [40,65,90,115,140],
            "attack": 80
        },
        // 的中あたり回復量
        "heal": {
            "base": 30,
            "additionalAttack": [30,35,40,45,50]
        },
        "cooldown": [10,9.5,9,8.5,8],
        "vp_cost": [60,55,50,45,40]
    },
    "DoubleBladedSwordW": {
        // 振り回し持続時間
        "duration": 1,
        // ダメージ発生周期
        "tick": 0.125,
        // 1ティックあたりダメージ
        "damage": {
            "base": [10,20,30,40,50],
            "attack": 40
        },
        "cooldown": [20,19.5,19,18.5,18],
        "vp_cost": 30
    },
    "DoubleBladedSwordE": {
        "damage": {
            "base": [30,50,70,90,110],
            "additionalAttack": 70
        },
        "shield": {
            "duration": 1.5,
            "effect": {
                "base": [50,70,90,110,130],
                "additionalAttack": 110
            }
        },
        // 連携攻撃的中時対象1人あたりシールド
        "combo_shield": {
            "base": [30,50,70,90],
            "additionalAttack": 50
        },
        // 連携攻撃的中によるシールド獲得最大人数
        "max_combo_hit": 4,
        "cooldown": 11,
        "vp_cost": 40
    },
    "R": {
        // 感知状態持続時間
        "duration": 15,
        // 気力回復増加
        "vp_regen": 2.5,
        // 攻撃速度増加
        "attack_speed": [20,25,30],
        // 感知範囲
        "detect_range": 8,
        // 感知マーク解除範囲
        "undetect_range": 30,
        // エンドレスチェイスダメージ
        "damage": {
            "base": [100,200,300],
            "additionalAttack": 100,
            "gauge": 2
        },
        // エンドレスチェイス的中時気力回復
        "vp_heal": [40,50,60],
        "cooldown": [90,75,60]
    },
    "T": {
        "dual_swords": {
            // 双剣使用時基本攻撃速度増加
            "attack_speed": 15,
            // 双剣使用時基本攻撃1回あたり基本攻撃ダメージ
            "damage": {
                "attack": 80,
                "basicAttackAmp": 100
            },
            // 双剣使用時スキル使用後基本攻撃1回あたり追加スキルダメージ
            "additional_damage": {
                "base": [5,15,25],
                "additionalAttack": [15,20,25]
            },
            // 双剣使用時スキル使用後基本攻撃1回あたり基本スキルクールダウン減少
            "cooldown_reduction": [5,7.5,15],
            // 双剣使用時スキル使用後基本攻撃1回あたり気力回復
            "vp_heal": 15
        },
        "double_bladed_sword": {
            // 両剣使用時基本攻撃射程増加
            "range": 0.8,
            // 両剣使用時基本攻撃ダメージ
            "damage": {
                "attack": 100,
                "basicAttackAmp": 100
            },
            // 両剣使用時スキル使用後追加スキルダメージ
            "additional_damage": {
                "base": [10,30,50],
                "additionalAttack": [30,40,50]
            },
            // 両剣使用時スキル使用後基本攻撃時基本スキルクールダウン減少
            "cooldown_reduction": [10,15,20],
            // 両剣使用時スキル使用後基本攻撃時気力回復
            "vp_heal": 30
        },
        // シフト状態持続時間
        "shift_duration": 2.5,
        // シフト状態時基本スキル使用時与ダメージ比自己回復量
        "heal": {
            "base": 8,
            "additionalAttack": 4
        },
        // シフト状態時基本スキル使用時気力回復
        "vp_heal": 30,
        // シフト状態時基本スキル使用時与ダメージ比自己回復量（動物対象時の元効果に対する率）
        "animal_heal": 30
    },
    "D": {
        // 連携使用時到着地点ダメージ
        "damage": {
            "attack": [70,90,110,130]
        },
        // 連携使用時与ダメージ比自己回復量
        "heal": {
            "base": 8,
            "additionalAttack": 4
        },
        // 連続使用時気力コスト増大ペナルティ発生しきい値（秒）
        "reuse_threshold": 5,
        // 連携使用時気力コスト増大ペナルティ（元コスト比）
        "vp_cost_increase": 100,
        // 連携使用時与ダメージ比自己回復（動物対象時の元効果に対する率）
        "animal_heal": 30,
        "cooldown": {
            "constant": 0.2
        },
        "vp_cost": 40
    }
}