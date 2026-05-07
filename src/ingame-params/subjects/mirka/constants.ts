export default {
    "Q": {
        "damage": {
            "base": [60, 95, 130, 165, 200],
            "amp": 50,
            "maxHP": 6
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 強化Q（クラッシュハンマーEX）
        "enhance": {
            // 追加ダメージ
            "additional_damage": {
                "gauge": 20
            },
            // 気絶時間
            "stun": 0.65,
            // 余震
            "after_effect": {
                // ダメージ発生周期
                "tick": 0.5,
                // ダメージ発生回数
                "count": 2,
                // 1ティックあたりダメージ
                "damage": {
                    "base": [10, 20, 30, 40, 50],
                    "targetMaxHP": 4
                },
                // 移動速度減少
                "slow": {
                    "duration": 1,
                    "effect": 40
                }
            }
        },
        "cooldown": {
            "constant": 2
        },
        "charge": {
            "time": [10, 9.5, 9, 8.5, 8],
            "max": 2
        }
    },
    "W": {
        // シールド持続時間
        "duration": 2.5,
        "shield": {
            "base": [70, 90, 110, 130, 150],
            "amp": 20,
            "maxHP": [9, 10, 11, 12, 13]
        },
        // シールド吸収ダメージあたりのリパルスゲージ獲得量増加
        "impluse_gain_increase": {
            // リパルスゲージ獲得量増加（％）
            "defense": 30
        },
        "cooldown": 10
    },
    "E": {
        // 阻止不可状態時間
        "cc_immune": 0.45,
        // 被ダメージ減少（％）
        "damage_decline": 60,
        // バックステップラッシュダメージ
        "first_damage": {
            "base": [40, 60, 80, 100, 120],
            "amp": 50,
            "targetMaxHP": 12
        },
        // 再使用可能時間
        "reuse": 3,
        // パワーヒットダメージ
        "second_damage": {
            "base": [70, 95, 120, 145, 170],
            "amp": 55,
            "maxHP": 7
        },
        // 強化E（パワーヒットEX）
        "enhance": {
            // 追加ダメージ
            "additional_damage": {
                "gauge": 33
            },
            // ノックバック距離
            "knockback": 2.5
        },
        "cooldown": [14, 13.5, 13, 12.5, 12]
    },
    "R": {
        // キャスト時間
        "channel": 1,
        // 着地地点変更可能時間
        "movable_duration": 2,
        "damage": {
            "base": [150, 250, 350],
            "amp": 90,
            "targetMaxHP": 15
        },
        // エアボーン時間
        "airborne": 0.8,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // リパルスゲージ最大値（最大体力％）
        "max_hp_ratio": 30,
        // 敵に移動不可状態を与えたときのリパルスゲージ獲得量（最大値％）
        "gauge_gain": 50,
        // 敵に移動不可状態を与えたときの基本スキルクールダウン減少（秒）
        "cooldown_reduction": [4, 7, 10],
        // 敵に移動不可状態を与えた時の追加継続ダメージ
        "dot": {
            // 継続ダメージ時間
            "duration": 3,
            // ダメージ発生周期
            "tick": 1,
            // 1ティックあたりダメージ
            "value": {
                "base": [10, 15, 20],
                "targetMaxHP": [0.8, 1.6, 2.4]
            }
        }
    }
}