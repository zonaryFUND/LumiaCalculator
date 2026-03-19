export default {
    "Q": {
        // 1回目1発あたりダメージ
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 40
        },
        // 再使用可能時間
        "reuse": 3,
        // 再使用時ダメージ
        "reuse_damage": {
            "base": [70, 115, 160, 205, 250],
            "amp": 70
        },
        // 再使用的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 25
        },
        // 的中時Wクールダウン減少
        "w_cooldown_reduction": 1,
        "gauge_cost": 50,
        "cooldown": {
            "constant": 1
        }
    },
    "W": {
        "damage": {
            "base": [50, 70, 90, 110, 130],
            "amp": 35
        },
        // 移動速度減少
        "slow": {
            "duration": 0.5,
            "effect": [10, 12.5, 15, 17.5, 20]
        },
        // ターゲットマーク持続時間
        "duration": 5,
        "cooldown": [11, 10.5, 10, 9.5, 9]
    },
    "E": {
        // 次の基本攻撃強化持続時間
        "duration": 5,
        // 基本攻撃追加ダメージ
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 30
        },
        "reuse_cost_increase": {
            // 再使用時にコストが重くなる効果の時間
            "threshold": 3.5,
            // 再使用時にコストが重くなる効果の増加量
            "amount": 25
        },
        // 最大増加コスト
        "max_cost": 50,
        "gauge_cost": 50,
        "cooldown": {
            "constant": 3
        }
    },
    "R": {
        // 対象指定不可状態時間
        "duration": 1,
        // ダメージ発生周期
        "tick": 0.125,
        // 1ティックあたりダメージ
        "damage": {
            "base": [30, 50, 70],
            "amp": 20
        },
        // 飛翔中の移動速度減少ペナルティ（％）
        "movement_speed_penalty": 60,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // エネルギー最大値
        "max_energy": [200, 250, 300],
        "energy_regain": {
            // エネルギー回復周期
            "tick": 0.25,
            // 1ティックあたりエネルギー回復量
            "amount": 3
        },
        // リチャージ状態になるエネルギー閾値
        "recharge_threshold": 50,
        // リチャージ状態持続時間
        "recharge_duration": 4,
        // ターゲットマーク対象にダメージを与えたときの追加ダメージ
        "mark_damage": {
            "base": [40, 60, 80],
            "amp": 20
        },
        // ターゲットマークが付いている対象への転移ダメージ（元追加ダメージ比％）
        "target_damage": 100,
        // ターゲットマークが付いていない対象への転移ダメージ（元追加ダメージ比％）
        "splash_damage": 50,
        // ターゲットマークが付いている対象攻撃時のエネルギー獲得量
        "energy_syphon": 25,
        // 野生動物に対してエネルギー獲得効果が発動したときの獲得量（元エネルギー獲得量比％）
        "animal_energy_syphon_ratio": 50
    }
}