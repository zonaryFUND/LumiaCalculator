export default {
    "Q": {
        "damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 80
        },
        // 的中時クールダウン減少（％）
        "cooldown_reduction": 35,
        "cooldown": [7, 6, 5, 4, 3]
    },
    "W": {
        // 範囲内移動速度減少（％）
        "slow": 35,
        // 再起動までの時間（秒）
        "launch": 1,
        "damage": {
            "base": [70, 100, 130, 160, 190],
            "amp": 80
        },
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        // 符ダメージ
        "damage": {
            "base": [60, 95, 130, 165, 200],
            "amp": 60
        },
        // 移動ダメージ
        "second_damage": {
            "base": [60, 80, 100, 120, 140],
            "amp": 55
        },
        "cooldown": [13, 12.5, 12, 11.5, 11]
    },
    "R": {
        // 召喚時ダメージ
        "first_damage": {
            "base": [50, 100, 150],
            "amp": 30
        },
        // 符持続時間
        "duration": 10,
        // 符的中時ダメージ
        "card_damage": {
            "base": [80, 105, 130],
            "amp": 50
        },
        // 召喚中の自己移動速度減少（％）
        "movement_speed_penalty": 10,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 恐怖時間
        "fear": [0.9, 1.1, 1.3],
        // 追加ダメージ
        "damage": {
            "amp": [10, 20, 30]
        },
        // 再び恐怖状態になるまでの免疫時間
        "fear_immune": 6,
        // 追加ダメージ最小値
        "minimum_additional_damage": 1
    }
}