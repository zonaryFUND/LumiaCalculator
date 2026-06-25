export default {
    "common": {
        // 一般スキルチャージ中の移動速度ペナルティ（％）
        "charging_slow_penalty": 15,
        // 一般スキルを発動しなかったりキャンセルした場合のクールダウン変換（％）
        "return_cooldown": 30
    },
    "Q": {
        // 最小ダメージ
        "min_damage": {
            "base": [80, 110, 140, 170, 200],
            "attack": 40,
            "targetMaxHP": 6
        },
        // 最大チャージ時ダメージ
        "max_damage": {
            "base": [160, 220, 280, 340, 400],
            "attack": 80,
            "targetMaxHP": 12
        },
        // 移動速度減少効果時間
        "slow_duration": 1,
        // 最小移動速度減少（％）
        "min_slow": 30,
        // 最大移動速度減少（％）
        "max_slow": 60,
        "cooldown": [5.5, 5, 4.5, 4, 3.5]
    },
    "W": {
        // 最小挑発時間
        "min_taunt": [0.4,0.5,0.6,0.7,0.8],
        // 最大挑発時間
        "max_taunt": [0.8,1.0,1.2,1.4,1.6],
        // 最小ダメージ
        "min_damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 10,
            "additionalMaxHP": 3
        },
        // 最大チャージ時ダメージ
        "max_damage": {
            "base": [40,60,80,100,120],
            "attack": 20,
            "additionalMaxHP": 6
        },
        // 被ダメージ減少効果時間（秒）
        "damage_reduction_duration": 2,
        // 被ダメージ減少量最大値（％）
        "max_damage_reduction": [20,22.5,25,27.5,30],
        "cooldown": [15,14,13,12,11]
    },
    "E": {
        // 最小ダメージ
        "min_damage": {
            "base": [60,80,100,120,140],
            "attack": 25,
            "additionalMaxHP": 10
        },
        // 最大チャージ時ダメージ
        "max_damage": {
            "base": [120,160,200,240,280],
            "attack": 50,
            "additionalMaxHP": 20
        },
        "cooldown": [16,15.5,15,14.5,14]
    },
    "R": {
        // 効果時間
        "duration": 7,
        // 自己回復総量
        "heal": {
            "maxHP": [30,45,60]
        },
        // 周囲ダメージ発生周期
        "tick": 0.5,
        // 1ティックあたり周囲ダメージ
        "damage": {
            "base": [10,15,20],
            "attack": 8,
            "additionalMaxHP": 3
        },
        "cooldown": [80,70,60]
    },
    "T": {
        // ハンバーガー拾得時自己回復量
        "heal": {
            "maxHP": [2,4,6]
        },
        // ハンバーガー最大生成数
        "amount": 3
    }
}