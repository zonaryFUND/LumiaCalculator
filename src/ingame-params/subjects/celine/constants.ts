export default {
    "Q": {
        // 起爆時爆弾1つあたりダメージ
        "damage": {
            "base": [80,105,130,155,180],
            "amp": 42
        },
        // 複数個の爆弾ヒット時の2個目以降のダメージ減少（％）
        "multiple_bomb_damage_multiplier": 75,
        // 最大爆弾設置数
        "max_bomb": 4,
        "charge": {
            "time": {
                "constant": [7,6.5,6,5.5,5]
            },
            "max": 3
        }
    },
    "W": {
        // 爆発的中時爆弾1つあたりQクールダウン減少（％）
        "q_cooldown_reduction": [30,35,40,45,50],
        "cooldown": {
            "constant": 0.1
        }
    },
    "E": {
        "damage": {
            "base": [60,80,100,120,140],
            "amp": 60
        },
        "cooldown": {
            "constant": [12,11,10,9,8]
        }
    },
    "R": {
        // 融合爆弾最大レベル
        "max_level": 4,
        // 融合爆弾最大設置数
        "max_set": 3,
        // 作成された融合爆弾1レベルあたりクールダウン増加（秒）
        "cooldown_increase": 1.25,
        // 融合爆弾1レベルあたりダメージ
        "damage": {
            "base": [60,80,100,120,140],
            "amp": 36
        },
        // 4レベル融合爆弾爆発的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 75
        },
        "cooldown": {
            "constant": 1.25
        }
    },
    "T": {
        // 基本攻撃強化に必要なスキル使用回数
        "count": 3,
        // 基本攻撃追加スキルダメージ
        "damage": {
            "base": 50,
            "amp": [30,55]
        },
        // クールダウン減少からスキル増幅への変換率
        "cooldown_conversion": 1
    }
}