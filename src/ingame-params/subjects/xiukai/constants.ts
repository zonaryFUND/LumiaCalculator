export default {
    "Q": {
        "damage": {
            "base": [80, 120, 160, 200, 240],
            "amp": 70,
            "targetHP": 25
        },
        // 移動速度減少
        "slow": [30, 35, 40, 45, 50],
        "cooldown": 6
    },
    "W": {
        "heal": {
            "base": [40, 60, 80, 100, 120],
            "maxHP": 4,
            "stack": 1
        },
        // 防御力増加
        "defense": {
            "duration": 2.5,
            "effect": [16, 19, 22, 25, 28]
        },
        "charge": {
            "time": [16, 15, 14, 13, 12],
            "max": 2
        },
        "cooldown": {
            "constant": 4
        }
    },
    "E": {
        // ウォック突進ダメージ
        "first_damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 70,
            "maxHP": 7
        },
        // ウォック突進的中時エアボーン時間
        "airborne": 1,
        // 再使用可能時間
        "reuse": 3,
        // ウォック落としダメージ
        "second_damage": {
            "base": [60, 95, 130, 165, 200],
            "amp": 70,
            "maxHP": 9
        },
        // ウォック落とし的中時移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [30, 32.5, 35, 37.5, 40]
        },
        "cooldown": [18, 16, 14, 12, 10]
    },
    "R": {
        // 炎まき散らし時間
        "duration": 3,
        // 炎まき散らし回数
        "count": 6,
        // 炎1回あたりダメージ
        "damage": {
            "base": [60, 95, 130],
            "amp": 50,
            "maxHP": 5
        },
        // 移動速度減少
        "slow": {
            "duration": 0.4,
            "effect": [40, 50, 60]
        },
        "healing_reduction": {
            // 治癒減少時間
            "duration": 5,
            // 1スタックあたり治癒減少効果
            "effect": 10,
            // 最大治癒減少スタック数
            "max_stack": 3
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 製作した食べ物・飲み物の回復量増加（元回復量比％）
        "food": 20,
        // 料理人の情熱スタック最大値
        "max_stack": 100,
        // 料理完成ごとの料理人の情熱スタック獲得数
        "stack_gain": {
            // 高級
            "uncommon": 6,
            // レア
            "rare": 9,
            // 英雄
            "epic": 12,
            // 伝説
            "legendary": 15
        },
        // 料理人の情熱1スタックあたり最大体力
        "max_hp": [1, 2, 3]
    }
}