export default {
    "Q": {
        "damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 70
        },
        // 使用可能回数
        "count": 3,
        // 酸拳発動時酔いゲージ消費量
        "bac": 40,
        // 酔拳発動時ダメージ
        "enhanced_damage": {
            "base": [40, 65, 90, 115, 140],
            "attack": 85
        },
        "cooldown": [13, 12.5, 12, 11.5, 11]
    },
    "W": {
        // 飲酒時間
        "cast": 0.8,
        // 酔いゲージ獲得量
        "bac": 45,
        // 飲酒中被ダメージ減少（％）
        "damage_reduction": [45, 50, 55, 60, 65],
        // 基本攻撃時クールダウン減少
        "cooldown_reduction": 0.5,
        // 次の基本攻撃時ダメージ増加最大値
        "basic_attack_amp": 0.2,
        "cooldown": [9, 8, 7, 6, 5]
    },
    "E": {
        "damage": {
            "base": [50, 100, 150, 200, 250],
            "attack": 100
        },
        // 移動速度減少
        "slow": {
            "duration": 2,
            // 通常時移動速度減少効果（％）
            "effect": [25, 27.5, 30, 32.5, 35],
            // 酔拳発動時移動速度減少効果（％）
            "enhanced_effect": [45, 50, 55, 60, 65]
        },
        // 酔拳発動時酔いゲージ消費量
        "bac": 40,

        "cooldown": [10, 9.5, 9, 8.5, 8]
    },
    "R": {
        // 制圧時間
        "supression": 1.2,
        // 飛びつき後攻撃回数
        "count": 4,
        // 飛びつき後攻撃1回あたり最小ダメージ
        "min_damage": {
            "base": [20, 70, 120],
            "attack": 70,
            "gauge": 50
        },
        // 飛びつき後攻撃1回あたり最大ダメージ
        "max_damage": {
            "base": [30, 105, 180],
            "attack": 105,
            "gauge": 75
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 猛虎清拳発動時攻撃速度増加（％）
        "attack_speed": 40,
        // 猛虎清拳発動時の追加基本攻撃ダメージ
        "damage": {
            "attack": [35, 45, 55],
            "basicAttackAmp": 1
        },
        // 猛虎清拳を発動するのに必要なスキル使用前酔いゲージ最小値
        "threshold": 40,
        // 酔いゲージ最大値
        "max": 100,
        // 泥酔状態持続時間
        "drunk_duration": 5,
        "alcohol_drink": {
            // 酒系アイテム使用後バフ持続時間（分）
            "duration": 15,
            // 酒系アイテム使用後攻撃力上昇
            "attack": 1
        }
    }
}