export default {
    "Q": {
        "damage": {
            "base": [70, 105, 140, 175, 210],
            "amp": 75
        },
        // 輝くロマンダメージ
        "enhanced_damage": {
            "base": [80, 115, 150, 185, 220],
            "amp": 80
        },
        // 輝くロマン的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        "cooldown": [5, 4.5, 4, 3.5, 3]
    },
    "W": {
        "damage": {
            "base": [60, 80, 100, 120, 140],
            "amp": 45
        },
        // 複数弾的中時ダメージ
        "multiple_hit_damage": 20,
        "cooldown": [8, 7.5, 7, 6.5, 6]
    },
    "E": {
        // 水晶消費時クールダウン減少量
        "cooldown_reduction": 15,
        // 輝くロマン使用可能時間
        "q_enhance_duration": 4,
        "cooldown": [13, 12, 11, 10, 9]
    },
    "R": {
        "damage": {
            "base": [140,230,320],
            "amp": 80
        },
        // 水晶付与対象的中時気絶時間
        "stun": 0.8,
        "cooldown": [70,60,50]
    },
    "T": {
        // 水晶持続時間
        "crystal_duration": 4,
        "damage": {
            "base": [30,70,110],
            "amp": 50     
        },
        // 水晶消費時移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": [10,20,30]
        },
        // 水晶付与対象基本攻撃時攻撃速度増加
        "attack_speed": 60
    }
}