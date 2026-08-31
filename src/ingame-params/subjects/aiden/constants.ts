export default {
    "Q": {
        // 雷撃ダメージ
        "damage": {
            "base": [70,100,130,160,190],
            "attack": 75,
            "basicAttackAmp": 100
        },
        // 基本攻撃時クールダウン減少（秒）
        "cooldown_reduction": 1.5,
        // 電磁砲（ハイパーチャージ中）ダメージ
        "range_damage": {
            "base": [70,100,130,160,190],
            "attack": 75,
            "basicAttackAmp": 100
        },
        // 電磁砲的中時移動速度減少
        "slow": {
            "duration": 0.6,
            "effect": [25,30,35,40,45]
        },
        // 電磁砲的中時クールダウン減少
        "range_cooldown_reduction": 50,
        "cooldown": {
            "constant": [5,4.5,4,3.5,3]
        }
    },
    "W": {
        // 最小ダメージ
        "damage": {
            "base": [40,50,60,70,80],
            "attack": 45
        },
        // 最大チャージ時ダメージ倍率
        "max_multiplier": 2,
        // 的中時移動速度減少
        "slow": {
            "duration": 0.8,
            "effect": 45
        },
        // 電場持続時間
        "field_duration": 2.5,
        // 電場的中時ダメージ
        "field_damage": {
            "base": [50,80,110,140,170],
            "attack": 50
        },
        // 電場的中時束縛時間
        "bind": [0.7,0.8,0.9,1,1.1],
        "cooldown": [15,14,13,12,11]
    },
    "E": {
        // バックステップダメージ
        "damage": {
            "base": [15,30,45,60,75],
            "attack": 20
        },
        // バックステップ使用後移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [8,11,14,17,20]
        },
        // ボルトラッシュダメージ
        "rush_damage": {
            "base": [55,85,115,145,175],
            "attack": 55
        },
        "cooldown": [16,15,14,13,12]
    },
    "R": {
        // 落雷1発目周囲ダメージ
        "first_damage": {
            "base": [60,90,120],
            "attack": 75
        },
        // 落雷1発目周囲的中時移動速度減少
        "first_slow": {
            "duration": 1,
            "effect": 40
        },
        // 落雷1発目中心ダメージ
        "center_damage": {
            "base": [80,130,180],
            "attack": 110
        },
        // 落雷1発目中心的中時気絶時間
        "stun": 1,
        // 落雷2発目ダメージ
        "second_damage": {
            "base": [70,115,150],
            "attack": 80
        },
        // 落雷2発目的中時移動速度減少
        "second_slow": {
            "duration": 1,
            "effect": 40
        },
        "cooldown": [80,70,60]
    },
    "T": {
        // ハイパーチャージ状態持続時間
        "duration": 10,
        // ハイパーチャージ状態攻撃速度ペナルティ
        "attack_speed": 15,
        // ハイパーチャージ状態致命打ダメージ量ペナルティ
        "critical_damage": 20,
        // ハイパーチャージ状態致命打確率から致命打ダメージ量変換率
        "critical_chance_convert": [0.2,0.3,0.4],
        // ハイパーチャージ状態基本攻撃射程距離
        "range": [4,4.5,5],
        // ハイパーチャージ状態終了時移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [10,13,16]
        }
    }
}