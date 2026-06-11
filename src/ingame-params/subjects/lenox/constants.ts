export default {
    "Q": {
        "damage": {
            "base": [80, 115, 150, 185, 220],
            "amp": 50
        },
        // 外周的中時追加ダメージ
        "additional_damage": {
            "maxHP": [4, 6, 8, 10, 12]
        },
        // 的中時1スタックあたりクールダウン減少
        "cooldown_reduction": 0.5,
        // 的中時スタック最大値
        "max_stack": 2,
        "cooldown": 3
    },
    "W": {
        // 振り回し攻撃ダメージ
        "first_damage": {
            "base": [20, 35, 50, 65, 80],
            "amp": 35
        },
        // 振り回し攻撃移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 20
        },
        // 引き寄せ攻撃ダメージ
        "second_damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 60
        },
        "cooldown": [16, 15, 14, 13, 12]
    },
    "E": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 50,
            "targetMaxHP": 5
        },
        // 移動速度減少
        "slow": {
            "duration": 1.25,
            "effect": [30, 35, 40, 45, 50]
        },
        "cooldown": 9
    },
    "R": {
        // 1回的中あたりダメージ
        "damage": {
            "base": [70, 135, 200],
            "amp": 40
        },
        // 青い蛇持続時間
        "duration": [4, 4.5, 5],
        // 青い蛇ダメージ発生周期
        "tick": 0.23,
        // 移動距離比例固定ダメージ
        "move_damage": [15, 20, 25],
        // 2回的中時移動距離比例固定ダメージ
        "enhanced_move_damage": [30, 40, 50],
        "cooldown": [80, 70, 60]
    },
    "T": {
        // スキル的中時Tクールダウン減少（％）
        "cooldown_reduction": 10,
        // 発動時シールド量
        "shield": {
            "maxHP": [7, 10, 13]
        },
        // シールド持続時間
        "duration": 3,
        "fishing": {
            // 釣り時追加アイテム（一般）確率
            "common": 85,
            // 釣り時追加アイテム（高級）確率
            "uncommon": 14,
            // 釣り時追加アイテム（レア）確率
            "rare": 1
        },
        "cooldown": {
            "constant": [15, 13, 11]
        }
    }
}