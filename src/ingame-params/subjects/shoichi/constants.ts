export default {
    "Q": {
        "damage": {
            "base": [50, 85, 120, 155, 190],
            "amp": 65
        },
        // 非強化Q的中時クールダウン減少
        "cooldown_reduction": 3,
        // Q強化効果持続時間
        "enhance_duration": 10,
        "cooldown": 8
    },
    "W": {
        "damage": {
            "base": [40, 60, 80, 100, 120],
            "amp": 60
        },
        "cooldown": [16, 15, 14, 13, 12]
    },
    "E": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 65
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [30, 35, 40, 45, 50]
        },
        // 協商刻印持続時間
        "duration": 5,
        // 協商刻印を付与した相手に対する与ダメージ増加（％）
        "damage_increase": 25,
        // 協商刻印を付与した相手に短剣が的中したときのクールダウン減少
        "cooldown_reduction": 1,
        // 協商刻印を付与した相手を倒したときのクールダウン減少
        "kill_cooldown_reduction": 90,
        "cooldown": [13, 12, 11, 10, 9]
    },
    "R": {
        // 鞄振り回しダメージ
        "damage": {
            "base": [50, 150, 250],
            "amp": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // 短剣ダメージ
        "knife_damage": {
            "base": [10, 40, 70],
            "amp": 25
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 不当利得スタック持続時間
        "duration": 5,
        // 不当利得スタック最大値
        "max_stack": 5,
        // 不当利得スタック最大時基本攻撃追加ダメージ
        "basic_attack_damage": {
            "base": [10, 20, 30],
            "amp": 45,
            "targetMaxHP": [2, 3, 4]
        },
        // 短剣拾得時に投げられる射程範囲
        "knife_range": 5,
        // 短剣拾得時投げナイフダメージ
        "knife_damage": {
            "base": [60, 90, 120],
            "amp": 30
        }
    }
}