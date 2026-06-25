export default {
    "Q": {
        // 飛剣ダメージ
        "damage": {
            "base": [60, 70, 80, 90, 100],
            "attack": 60
        },
        // 飛剣持続時間
        "duration": 2,
        // 飛剣持続ダメージ発生周期
        "tick": 0.4,
        // 飛剣持続ダメージ
        "dot_damage": {
            "base": [20, 35, 50, 65, 80],
            "attack": 40
        },
        // 飛剣回収時Eクールダウン減少医
        "e_cooldown_reduction": 60,
        // 回収した飛剣持続時間
        "retrieve_duration": 2.5,
        // 回収した飛剣による持続ダメージ発生周期
        "retrieve_tick": 0.5,
        // 回収した飛剣持続ダメージ
        "retrieve_dot_damage": {
            "base": [30, 35, 40, 45, 50],
            "attack": 25
        },
        "cooldown": [12, 11, 10, 9, 8]
    },
    "W": {
        // 行動妨害免疫時間
        "cc_immune": 0.75,
        "damage": {
            "base": [50, 70, 90, 110, 130],
            "attack": 90
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 70
        },
        // 移動不可効果を防御したときの龍雲残影剣スタック獲得数
        "stack_gain": 3,
        // 移動不可効果を防御したときの強化ダメージ
        "enhanced_damage": {
            "base": [100, 130, 160, 190, 220],
            "attack": 100
        },
        // 移動不可効果を防御したときの気絶時間
        "stun": 1,
        "cooldown": [21, 19.5, 18, 16.5, 15]
    },
    "E": {
        // 突進ダメージ
        "damage": {
            "base": [60, 70, 80, 90, 100],
            "attack": 55
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // 突進経路の剣落下ダメージ
        "second_damage": {
            "base": [60, 90, 120, 150, 180],
            "attack": 70
        },
        "cooldown": [14, 13.5, 13, 12.5, 12]
    },
    "R": {
        // 領域展開時ダメージ
        "damage": {
            "base": [80, 155, 230],
            "attack": 60
        },
        // 領域持続時間
        "duration": 7,
        // 領域内剣落下追加ダメージ
        "additional_damage": {
            "base": [10, 20, 30],
            "attack": [10, 15, 20]
        },
        // 領域内剣落下強化に必要な回数
        "enhance_count": 5,
        // 領域内剣落下強化ダメージ
        "enhance_damage": {
            "base": [20, 40, 60],
            "attack": [20, 30, 40]
        },
        // 領域内剣落下強化時移動速度減少
        "slow": {
            "duration": 0.5,
            "effect": 30
        },
        // 範囲外へEで移動した際の剣追跡ダメージ
        "e_chase_damage": {
            "base": [100, 200, 300],
            "attack": 75
        },
        // 範囲外へEで移動した際の剣追跡の複数的中時2ヒット目以降のダメージ減少（元ダメージ比％）
        "second_chase_decline": 80,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 龍雲残影剣スタック最大値
        "max_stack": 3,
        // 龍雲残影剣スタック消費基本攻撃追加ダメージ
        "damage": {
            "base": [20, 40, 60],
            "attack": [20, 30, 40]
        },
        // 龍雲残影剣スタック消費基本攻撃時QEクールダウン減少
        "qe_cooldown_reduction": 1.5,
        // 龍雲残影剣スタック消費基本攻撃時自己回復量
        "heal": {
            "base": [20, 35, 50],
            "attack": 40
        },
        // 動物対象に龍雲残影剣スタック消費基本攻撃時の回復量倍率（元回復量比％）
        "animal_heal": 60
    }
}