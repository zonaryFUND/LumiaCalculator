export default {
    "Q": {
        // 最大チャージまでの時間
        "channeling": 1.5,
        // チャージ中移動速度減少ペナルティ
        "movement_speed_penalty": 20,
        // 基礎ダメージ
        "damage": {
            "base": [50, 90, 130, 170, 210],
            "amp": 75
        },
        // 回復時間
        "heal_duration": 2.5,
        // 総回復量
        "heal": {
            "base": [20, 40, 60, 80, 100],
            "amp": 15
        },
        // スクリーンから発生するエネルギー砲ダメージ
        "screen_damage": {
            "base": [70, 110, 150, 190, 230],
            "amp": 80
        },
        // スクリーンから発生するエネルギー砲回復量
        "screen_heal": {
            "base": [40, 60, 80, 100, 120],
            "amp": 15
        },
        "cooldown": [13, 12, 11, 10, 9]
    },
    "W": {
        // スクリーン持続時間
        "duration": 7,
        // スクリーンを通過した基本攻撃追加ダメージ
        "damage": {
            "base": [40, 50, 60, 70, 80],
            "amp": 26
        },
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "E": {
        // Q/E的中後の基本攻撃射程増加
        "range_increase": 1,
        // 的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": [2, 4, 6, 8, 10]
        },
        // 標的持続時間
        "target_duration": 4,
        // 標的攻撃時追加ダメージ
        "damage": {
            "base": [30, 60, 90, 120, 150],
            "amp": 60
        },
        // 標的攻撃時束縛時間
        "bind": [0.9, 0.95, 1, 1.05, 1.1],
        "cooldown": [14, 13, 12, 11, 10]
    },
    "R": {
        // エネルギーフィールド持続時間
        "duration": 4,
        // エネルギーフィールド上移動速度増加
        "movement_speed": {
            "base": [50, 70, 90],
            "amp": 2
        },
        "damage": {
            "base": [100, 230, 360],
            "amp": 90
        },
        // ハイパーチャージ状態持続時間
        "hypercharge_duration": 8,
        // ハイパーチャージ中攻撃速度増加（％）
        "attack_speed": [40, 60, 80],
        // ハイパーチャージ中Q最大チャージまでの時間
        "hypercharge_q_charge": 0.5,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 茂みから離れるときの隠密状態持続時間
        "hide": 2.5,
        // 隠密状態効果中の移動速度増加（％）
        "movement_speed": [10, 15, 20],
        // 茂みから離れるときのシールド持続時間
        "shield_duration": 2.5,
        // 茂みから離れるときのシールド量
        "shield": {
            "maxHP": [10, 15, 20]
        },
        // 基本攻撃的中時Qクールダウン減少
        "q_cooldown_reduction": [20, 40, 60],
        // 基本攻撃的中時WEクールダウン減少
        "cooldown_reduction": [2, 6, 10],
        "cooldown": {
            "constant": [10, 8, 6]
        }
    }
}