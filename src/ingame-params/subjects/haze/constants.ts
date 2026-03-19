export default {
    "Q": {
        "damage": {
            "base": [80, 115, 150, 185, 220],
            "amp": 85
        },
        "cooldown": {
            "constant": 2.5
        },
        "charge": {
            "time": [10, 9, 8, 7, 6],
            "max": 2
        }
    },
    "Q2": {
        // 斉射時間
        "cast": 0.5,
        "damage": {
            "base": [40, 80, 120, 160, 200],
            "amp": 65,
            "amp_per_ammo": 3
        }
    },
    "Q3": {
        "damage": {
            "base": [80, 105, 130, 155, 180],
            "amp": 40
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // 遠距離の対象に的中したときの元ダメージ比強化（％）
        "enhance": 50,
        "cooldown": {
            "constant": 0.6
        }
    },
    "W": {
        "damage": {
            "base": [80, 120, 160, 200, 240],
            "amp": 70
        },
        // 気絶時間
        "stun": 0.65,
        // E/R効果中に使用したときのそれらのスキルのクールダウン減少追加（％）
        "er_cooldown_reduction": 20,
        "cooldown": [15, 14, 13, 12, 11]
    },
    "E": {
        // 持続時間
        "duration": 5,
        // サブマシンガン装弾数
        "ammo": 40,
        // 弾1つあたりダメージ
        "damage": {
            "base": [8, 11, 14, 17, 20],
            "amp_per": 25
        },
        // 基本攻撃的中時効果の発生頻度（弾）
        "effect_count": 8,
        // 弾を全消費せず再使用したときのクールダウン返還最大値（％）
        "max_cooldown_reduction": 20,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "R": {
        // 切り替え時ダメージ
        "switch_damage": {
            "base": [30, 60, 90],
            "amp": 30
        },
        // 切り替え時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // 持続時間
        "duration": 12,
        // ロケットランチャー装弾数
        "ammo": 4,
        // 持続時間中の自身の移動速度減少
        "movement_speed_penalty": 0.3,
        // 的中対象の後ろへの範囲ダメージ
        "area_damage": {
            "base": [80, 130, 180],
            "amp": 40
        },
        // 弾を全消費せず再使用したときのクールダウン返還最大値（％）
        "max_cooldown_reduction": 20,
        // 持続時間中基本攻撃射程
        "basic_attack_range": 6.5,
        // 持続時間中基本攻撃速度
        "attack_speed": 1,
        // 持続時間中の視界増加
        "vision": 2,
        "cooldown": [30, 24, 18]
    },
    "T": {
        // スキル使用後の銃取り出し時間
        "swap_time": 0.75,
        // 銃取り出し後の基本攻撃追加ダメージ
        "damage": {
            "base": [60, 90, 120],
            "amp": 60
        },
        // 銃取り出し後基本攻撃追加ダメージ発生時の移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": [6, 18, 30]
        }
    }
}