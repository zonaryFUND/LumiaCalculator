export default {
    "Q": {
        // 1段目ダメージ
        "Q1_damage": {
            "base": [40, 65, 90, 115, 140],
            "amp": 50,
            "maxHP": 6
        },
        // 1段目的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 再使用可能時間
        "reuse": 4,
        // 2段目ダメージ
        "Q2_damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 50,
            "maxHP": 7
        },
        "hp_cost_percent": 2,
        "cooldown": [6, 5.5, 5, 4.5, 4]
    },
    "W": {
        // 苦痛スタック1あたりのQ/Eクールダウン減少（秒）
        "qe_cooldown_reduction_per_stack": 0.8,
        // 最大チャージ時間
        "charge_duration_max": 0.8,
        // チャージ中被ダメージ減少
        "damage_reduction": {
            "duration": 1,
            "effect": 50
        },
        // チャージ中自己回復発生周期
        "heal_tick": 0.2,
        // チャージ中1ティックあたり自己回復量
        "heal": {
            "lostHP": 3
        },
        // 最小チャージ時ダメージ
        "min_damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 50,
            "maxHP": 8
        },
        // 最大チャージ時ダメージ
        "max_damage": {
            "base": [120, 165, 210, 255, 300],
            "amp": 75,
            "maxHP": 12
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // 最大苦痛スタック数
        "max_stack": 5,
        // 最大チャージ時束縛時間
        "max_charge_bind": 0.8,
        // 終了時自己回復
        "finish_heal": {
            "base": [20, 40, 60, 80, 100],
            "amp": 30,
            "maxHP": 6,
            "stack": [8, 11, 14, 17, 20]
        },
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        "damage": {
            "base": [60, 85, 110, 135, 160],
            "amp": 55,
            "maxHP": 6
        },
        // 気絶時間
        "stun": 0.6,
        "hp_cost_percent": 2,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "R": {
        // 的中時束縛時間
        "bind": 0.8,
        "damage": {
            "base": [75, 150, 225],
            "amp": 40,
            "targetHP": 15
        },
        // 的中後再使用可能時間
        "duration": 6,
        // 再使用可能になる的中対象体力（％）
        "reuse_threshold": 25,
        // 再使用後移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 50
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 基本攻撃被ダメージ減少
        "reduction": {
            "base": [2, 6, 10],
            "amp": 1,
            "maxHP": 0.3
        }
    }
}