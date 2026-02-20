export default {
    "Q": {
        "damage": {
            "base": [40, 80, 120, 160, 200],
            "attack": 110
        },
        // 移動速度減少
        "slow": {
            "duration": 0.75,
            "effect": 50
        },
        // もう一つの可能性基礎ダメージ
        "variable_damage": {
            "base": [40, 80, 120, 160, 200],
            "attack": 110
        },
        // もう一つの可能性ダメージが強化される対象体力（％）
        "enhance_target_hp_threshold": 20,
        // もう一つの可能性強化ダメージ
        "enhanced_damage": {
            "base": [100, 150, 200, 250, 300],
            "attack": 200
        },
        "cooldown": [4.5, 4, 3.5, 3, 2.5]
    },
    "W": {
        "damage": {
            "base": [60, 85, 110, 135, 160],
            "attack": 90
        },
        "shield": {
            "duration": 2.5,
            "effect": {
                "base": [50, 70, 90, 110, 130],
                "attack": 100
            }
        },
        // もう一つの可能性ダメージ
        "variable_damage": {
            "base": [60, 85, 110, 135, 160],
            "attack": 90
        },
        // もう一つの可能性的中時自己回復量最小値
        "heal": {
            "base": [20, 30, 40, 50, 60],
            "attack": 60
        },
        // もう一つの可能性最大回復量（最小値比）
        "heal_max_multiplier": 1.5,
        // もう一つの可能性回復効果が最大になる自身の体力（％）
        "heal_max_hp": 40,
        // もう一つの可能性が野生動物に的中したときの回復量（元回復量比）
        "animal_target_heal": 50,
        "cooldown": [8, 7.5, 7, 6.5, 6]
    },
    "E": {
        "damage": {
            "base": [60, 80, 100, 120, 140],
            "attack": 80
        },
        // 防御力減少
        "defense_down": {
            "duration": 3,
            "effect": 15
        },
        // もう一つの可能性ダメージ
        "variable_damage": {
            "base": [60, 80, 100, 120, 140],
            "attack": 80
        },
        // もう一つの可能性的中時エアボーン時間
        "airborne": 0.8,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "R": {
        "damage": {
            "base": [80, 160, 240],
            "attack": 90
        },
        // 1撃目移動速度減少
        "slow": {
            "duration": 1,
            "effect": 75
        },
        // 3つの可能性ダメージ
        "second_damage": {
            "base": [50, 100, 150],
            "attack": 50
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // もう一つの可能性発動に必要なスタック数
        "max_stack": 4,
        // もう一つの可能性発動時移動速度増加
        "movement_speed": {
            "duration": 1.5,
            "effect": [8, 18, 28]
        }
    }
}