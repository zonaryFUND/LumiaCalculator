export default {
    "common": {
        // 基本攻撃射程上書き値
        "range": 4.8
    },
    "Q": {
        // 手裏剣投擲数
        "amount": 3,
        // 通過ダメージ
        "through_damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 45
        },
        // 着地点ダメージ
        "damage": {
            "base": [40, 60, 80, 100, 120],
            "attack": 55
        },
        // 移動速度減少時間
        "slow_duration": 1,
        // 移動速度減少（％）
        "slow": 30,
        // 秘技-生死の刻印保有者へヒットした際の追加刻印数
        "additional_stack": 2,
        "cooldown": [7, 6.5, 6, 5.5, 5]
    },
    "W": {
        // 移動速度増加（％）
        "movement_speed": [20, 25, 30, 35, 40],
        // 移動速度増加時間
        "ms_duration": 2,
        // 攻撃速度増加（％）
        "attack_speed": [15, 20, 25, 30, 35],
        // 攻撃速度増加時間
        "as_duration": 3,
        // 基本攻撃的中時クールダウン減少
        "cooldown_reduction": 1,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "E": {
        // 隠密状態時間
        "duration": 0.3,
        // 再使用可能時間
        "reuse": 4,
        "cooldown": [15, 14.5, 14, 13.5, 13]
    },
    "R": {
        // 基礎ダメージ
        "damage": {
            "base": [80, 160, 240],
            "attack": 80
        },
        // 失った体力比例ダメージ増加量（元ダメージ比％）
        "max_multiplier": 50,
        // ダメージ増加量が最大になる対象体力％
        "max_multiplier_threshold": 40,
        // 秘技-生死の刻印3スタックを持つ対象にダメージを与えた時のクールダウン減少
        "cooldown_reduction": [40, 60, 80],
        "cooldown": {
            "constant": [50, 40, 30]
        }
    },
    "T": {
        // 秘技-生死の刻印スタック持続時間
        "stack_duration": 6,
        // 秘技-生死の刻印最大スタック数
        "max_stack": 3,
        // 秘技-生死の刻印スタック消耗時ダメージ
        "damage": {
            "base": 30,
            "additionalAttack": 25,
            "targetMaxHP": {
                "base": [4, 7, 10],
                "additionalAttack": 5
            }
        }
    }
}