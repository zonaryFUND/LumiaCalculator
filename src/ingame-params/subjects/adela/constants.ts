export default {
    "Q": {
        // ポーンダメージ
        "pawn_damage": {
            "base": [60,100,140,180,220],
            "amp": 65
        },
        // 3スタック獲得時移動速度増加
        "movement_speed": [4,5,6,7,8],
        // クイーンダメージ
        "queen_damage": {
            "base": [80,125,170,215,260],
            "amp": 80
        },
        // クイーン的中時気絶時間
        "stun": 1,
        // スタック喪失までのQ連続未使用時間
        "stack_reset": 6,
        // ポーン・クイーンの持続時間
        "duration": 6,
        "cooldown": {
            "constant": [2.4,2.2,2,1.8,1.6]
        }
    },
    "W": {
        "damage": {
            "base": [20,60,100,140,180],
            "amp": 80
        },
        "pawn_queen": {
            // 押し出されたポーン・クイーンのダメージ
            // Qダメージに対する割合
            "damage": 35,
            // 押し出されたポーン・クイーン的中時のエアボーン時間
            "airborne": 0.75
        },
        "rook": {
            // 押し出されたルークのダメージ
            // Eダメージに対する割合
            "damage": 35,
            // 押し出されたルーク的中時のエアボーン時間
            "airborne": 1.25
        },
        // ナイトの持続時間
        "duration": 6,
        "cooldown": {
            "constant": 3
        },
        "charge": {
            "max": 2,
            "time": [17,16,15,14,13]
        }
    },
    "E": {
        "damage": {
            "base": [50,90,130,170,210],
            "amp": 75
        },
        // 経路上ポーン・クイーンのダメージ
        // Qダメージに対する割合
        "pawn_queen": 35,
        "knight": {
            // 経路上ナイトのダメージ
            "damage": 40,
            // 経路上ナイト的中時の移動速度減少
            "slow": {
                "duration": 1.5,
                "effect": 40
            }
        },
        // 再発動可能時間
        "reuse": 4,
        "duration": 6,
        "cooldown": [12,11.5,11,10.5,10]
    },
    "R": {
        // 無敵状態時間
        "channel": 2,
        "damage": {
            "base": [150,275,400],
            "amp": 95
        },
        // 配置された駒1つあたりの追加固定ダメージ
        "per_piece": {
            "targetMaxHP": 3.5
        },
        // 配置された駒の着地時再発動ダメージ割合（元ダメージに対する割合）
        "other_pieces": 40,
        "cooldown": [80,70,60]
    },
    "T": {
        // 基本攻撃射程距離増加
        "additional_attack_range": 2.5,
        // 固定攻撃速度
        "attack_speed": 0.66,
        // 攻撃速度0.01あたりのスキル増幅獲得値
        "amp_per_as": [0.1, 0.35, 0.6]
    }
}