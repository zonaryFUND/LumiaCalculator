export default {
    "Q": {
        // 1回目ダメージ
        "first_damage": {
            "base": [20,40,60,80,100],
            "amp":30
        },
        // 2回目ダメージ
        "second_damage": {
            "base": [40,75,110,145,180],
            "amp": 35
        },
        // 使用中の自身の移動速度増加
        "movement_speed": {
            "duration": 0.5,
            "effect": 15
        },
        "cooldown": [7,6,5,4,3]
    },
    "W": {
        "damage": {
            "base": [80,110,140,170,200],
            "targetHP": {
                "base": 8,
                "amp": 2
            }
        },
        // 的中時獲得自己シールド
        "shield": {
            "duration": 2.5,
            "amount": {
                "base": [50,75,100,125,150],
                "amp": 35
            }
        },
        // 複数ヒット時追加シールド比率(追加1人あたり)
        "additional_shield": 20,
        // 複数ヒット時追加シールド比率最大値
        "additional_shield_max": 40,
        // 座標維持時間
        "coordinates": 5,
        "cooldown": [11,10,9,8,7]
    },
    "E": {
        "damage": {
            "base": [70,85,100,115,130],
            "amp": 40
        },
        "cooldown": [13,12.5,12,11.5,11]
    },
    "R": {
        // 対象指定不可状態時間
        "untargetable": 0.7,
        "damage": {
            "base": [150,275,400],
            "amp": 85
        },
        // 的中時移動速度減少
        "slow": {
            "duration": 0.2,
            "effect": 99
        },
        // 座標維持時間
        "coordinates": 5,
        "cooldown": [80,70,60]
    },
    "T": {
        // 追加スキルダメージ
        "damage": {
            "base": [30,65,100],
            "amp": 40
        },
        // 対象防御力低下効果
        "defense_reduction": {
            "duration": 4,
            "effect": [4,7,10]
        },
        // スキル的中時Tクールダウン減少
        "cooldown_reduction": 2.5,
        "cooldown": {
            "constant": [12,9,6]
        }
    }
}