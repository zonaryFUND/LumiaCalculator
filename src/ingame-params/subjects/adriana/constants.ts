export default {
    "Q": {
        // 持続時間
        "duration": 2,
        // ダメージ発生周期
        "tick": 0.25,
        "damage": {
            "base": [35,45,55,65,75],
            "amp": [27,29,31,33,35]
        },
        "cooldown": 4
    },
    "W": {
        // オイル地帯持続時間
        "duration": 5,
        // 火炎地帯持続時間
        "flame_duration": 5,
        // オイル地帯移動速度減少
        "slow": 30,
        "cooldown": {
            "constant": 0.3
        },
        "charge": {
            "time": [13,12.5,12,11.5,11],
            "max": 2
        }
    },
    "E": {
        // 火炎地帯ダメージ発生周期
        "tick": 0.5,
        "damage": {
            "base": [26,32,38,44,50],
            "amp": 15
        },
        // 火炎地帯移動速度減少
        "slow": 30,
        // 火炎地帯持続時間
        "duration": 5,
        "cooldown": [18,17,16,15,14]
    },
    "R": {
        "damage": {
            "base": [140,170,200],
            "amp": 40
        },
        // 火炎地帯持続時間
        "duration": 5,
        "cooldown": {
            "constant": 1
        },
        "charge": {
            "time": [24,22,20],
            "max": 3
        }
    },
    "T": {
        // 火傷状態持続時間
        "duration": 4,
        // 火傷状態ダメージ総量
        "damage": {
            "base": [20,35,50],
            "amp": 40
        },
        // 火傷状態時防御力低下
        "defense_reduction": [6,9,12],
        // 火傷状態免疫時間
        "immune": 8
    }
}