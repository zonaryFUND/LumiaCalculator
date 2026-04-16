export default {
    "Q": {
        "damage": {
            "attack": [120, 130, 140, 150, 160]
        },
        // 接続が維持されるスピアの最大個数
        "max": 2,
        // スピアとの接続が維持される最大距離
        "range": 9,
        // 接続が切れたスピアの持続時間
        "duration": 2.5,
        // 複数対象的中時の2番目以降の対象ダメージ（元ダメージ比％）
        "second_damage": {
            "attack": [94, 103, 112, 121, 130]
        },
        "cooldown": {
            "constant": 0.75
        }
    },
    "W": {
        "damage": {
            "base": [70, 95, 120, 145, 170],
            "attack": 30,
            "amp": 75,
            "criticalChance": 65
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // 的中時装填ゲージ獲得量
        "gauge": [30, 35, 40, 45, 50],
        // 的中1つあたりEクールダウン減少
        "e_cooldown_reduction": [0.5, 0, 75, 1, 1.25, 1.5],
        // 複数ヒット時の2本目以降ダメージ減少（元ダメージ比％）
        "damage_reduction": 20,
        "cooldown": {
            "constant": 2.5
        }
    },
    "E": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "attack": 50,
            "amp": 60
        },
        "cooldown": [20, 19, 18, 17, 16]
    },
    "R": {
        // 効果範囲
        "range": 5,
        // 設置時ダメージ
        "first_damage": {
            "base": [50, 100, 150],
            "attack": 50,
            "amp": 70
        },
        // 効果範囲内移動速度減少
        "slow": [40, 45, 50],
        // 巨大スピア持続時間
        "duration": 3,
        // 引っ張りダメージ
        "second_damage": {
            "base": [80, 170, 260],
            "attack": 80,
            "amp": 90
        },
        // 引っ張り対象気絶時間
        "stun": 1,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 攻撃速度最大値
        "max_attack_speed": 1.1,
        // 最大値を超える攻撃速度0.01ごとのスキル増幅変換
        "amp_conversion": 1,
        // 装填ゲージチャージ時間
        "charge_time": [13, 11, 9],
        // 装填ゲージ非最大時基本攻撃ダメージ
        "damage": {
            "base": [5, 10, 15],
            "attack": 3,
            "amp": 3
        },
        // 装填ゲージ最大時基本攻撃ダメージ
        "full_charge_damage": {
            "base": [10, 25, 40],
            "attack": 100,
            "amp": 25,
            "targetMaxHP": [4, 8, 12]
        },
        // 装填ゲージ最大時基本攻撃的中時移動速度減少
        "slow": {
            "duration": 0.5,
            "effect": 99
        }
    }
}