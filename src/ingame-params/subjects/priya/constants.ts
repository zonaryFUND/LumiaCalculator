export default {
    "Q": {
        // 通常ダメージ
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 70
        },
        // 満開的中時チャージ時間減少
        "charge_reduction": 50,
        // 満開ダメージ
        "bloomed_damage": {
            "base": [60, 80, 100, 120, 140],
            "amp": 60
        },
        "cooldown": {
            "constant": 1
        },
        "charge": {
            "time": [12, 11, 10, 9, 8],
            "max": 2
        }
    },
    "W": {
        // 花の上にいるときの移動速度増加
        "movement_speed": {
            "duration": 1,
            // 自身が花の上にいるときの移動速度増加
            "effect": [12, 13, 14, 15, 16],
            // 味方が花の上にいるときの移動速度増加
            "ally_effect": [8, 9, 10, 11, 12]
        },
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // W使用後次の基本攻撃時に花を咲かせる効果の持続時間
        "basic_attack_flower": 6,
        // シールド持続時間
        "shield_duration": 2,
        // 満開効果1回あたりのシールド量
        "shield": {
            "base": [100, 115, 130, 145, 160],
            "amp": 25
        },
        // 満開効果が複数発生したときの2個目以降のシールド減少量（％）
        "shield_reduction": 45,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "E": {
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 65
        },
        // 2ヒット時移動速度減少
        "slow": {
            "duration": 1.2,
            "effect": 70
        },
        // 3ヒット時束縛時間
        "bind": 1.2,
        // 発動中移動速度増加（％）
        "movement_speed": 18,
        "cooldown": 11
    },
    "R": {
        // 阻止不可状態時間
        "unstoppable": 1,
        // 基本攻撃・スキル使用不可状態時間
        "self_silence": 0.8,
        // 被ダメージ減少（％）
        "damage_reduction": 40,
        // 外側へ広がるダメージ
        "first_damage": {
            "base": [80, 150, 220],
            "amp": 60
        },
        // 内側へ戻るダメージ
        "echo_damage": {
            "base": [80, 150, 220],
            "amp": 65
        },
        // 踊り状態時間
        "dance": 0.8,
        // 果実拾得時回復量
        "heal": {
            "targetMaxHP": [3, 5, 7]
        },
        "cooldown": [80, 75, 70]
    },
    "T": {
        // 花が満開になるまでの時間
        "bloom": 1,
        // 花持続時間
        "flower_duration": 10
    }
}