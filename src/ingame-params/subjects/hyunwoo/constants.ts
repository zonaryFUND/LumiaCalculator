export default {
    "Q": {
        "damage": {
            "base": [50, 100, 150, 200, 250],
            "additionalAttack": 60,
            "amp": 85
        },
        // 移動速度減少
        "slow": {
            "duration": 2,
            "effect": 40
        },
        // 自身の移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [11, 12, 13, 14, 15]
        },
        "cooldown": [9, 8, 7, 6, 5]
    },
    "W": {
        // 防御力上昇時間
        "duration": 2.5,
        // 防御力上昇量
        "defense": {
            "base": [14, 21, 28, 35, 42],
            "defense": 10
        },
        // 妨害効果免疫時間
        "cc_immune": 1,
        "cooldown": [15, 14, 13, 12, 11]
    },
    "E": {
        // 的中時ダメージ
        "damage": {
            "base": 0,
            "additionalAttack": 80,
            "amp": 55,
            "targetHP": [6, 9, 12, 15, 18]
        },
        // 壁ヒット時追加ダメージ
        "wall_damage": {
            "base": [80, 115, 150, 185, 220],
            "additionalAttack": 75,
            "amp": 90
        },
        // 壁ヒット時気絶時間
        "stun": 1.3,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "R": {
        // 最大チャージに達するまでの時間
        "max_charge": 1.2,
        // 最小チャージ時ダメージ
        "min_damage": {
            "base": [100, 140, 180],
            "additionalAttack": 35,
            "amp": 75
        },
        // 最大チャージ時ダメージ
        "max_damage": {
            "base": [300, 420, 540],
            "additionalAttack": 105,
            "amp": 225
        },
        // 防御力減少
        "defense_down": {
            "duration": 5,
            "effect": [10, 15, 20]
        },
        // 最大チャージ時気絶時間
        "stun": 0.5,
        // 最大チャージ時スキル発動後ディレイ
        "max_later_delay": 0.35,
        // 発動失敗時クールダウン返還（％）
        "cooldown_payback": 50,
        "cooldown": [60, 55, 50]
    },
    "T": {
        // ドッグファイト活性化に必要なスタック数
        "stack_threshold": [10, 9, 8],
        // ドッグファイト活性化後次の攻撃追加ダメージ
        "damage": {
            "base": [40, 70, 100],
            "attack": 60,
            "amp": 40
        },
        // ドッグファイト活性化後次の攻撃時回復量
        "heal": {
            "maxHP": [5, 8, 11]
        },
        // ドッグファイト活性化後Wクールダウン減少
        "w_cooldown_reduction": 2
    }
}