export default {
    "Q": {
        "damage": {
            "base": [30, 40, 50, 60, 70],
            "attack": [165, 170, 175, 180, 185]
        },
        // 最大スタック時追加ダメージ（元ダメージ比％）
        "max_stack_damage": 25,
        // 最大スタック時の的中対象1体あたり自己回復（失った体力比）
        "max_stack_heal": 10,
        // 最大スタック時の自己回復量最大値
        "max_stack_heal_max": 25,
        "cooldown": [10, 9, 8, 7, 6]
    },
    "W": {
        // 持続時間
        "duration": 5,
        // 被ダメージ減少（％）
        "damage_reduction": {
            "base": 2,
            "attack": [3, 3.25, 3.5, 3.75, 4]
        },
        // シールド持続時間
        "shield_duration": 0.75,
        // シールド量
        "shield": {
            "base": [40, 55, 70, 85, 100],
            "attack": 70
        },
        // 基本攻撃的中時効果時間延長
        "extend": 0.5,
        // 最大持続時間
        "max_duration": 7,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        // 基本攻撃強化効果時間
        "duration": 5,
        // 攻撃速度増加（％）
        "attack_speed": [30, 35, 40, 45, 50],
        // T追加ダメージを固定ダメージに変換する割合（％）
        "damage_conversion": 20,
        // 効果時間中の最初の基本攻撃追加ダメージ
        "damage": {
            "base": [8, 16, 24, 32, 40],
            "attack": 25
        },
        // 効果時間中の最初の基本攻撃的中時クールダウン減少（％）
        "cooldown_reduction": [50, 55, 60, 65, 70],
        "cooldown": 10
    },
    "R": {
        // 振り上げダメージ
        "first_damage": {
            "base": [50, 100, 150],
            "attack": 70
        },
        // 振り上げ的中対象気絶時間
        "stun": 0.75,
        // 空中攻撃ダメージ
        "second_damage": {
            "base": [30, 45, 60],
            "attack": 8
        },
        // 空中攻撃回数
        "second_count": 2,
        // 振り下ろしダメージ
        "third_damage": {
            "base": [70, 170, 270],
            "attack": 150
        },
        // 振り下ろし的中対象エアボーン時間
        "airborne": 0.5,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // スタック持続時間
        "duration": 6,
        // 最大スタック数
        "max_stack": 5,
        // 最大スタック時追加ダメージ
        "damage": {
            "targetMaxHP": {
                "base": 1.5,
                "attack": [0.5, 0.75, 1]
            }
        },
        // 最大スタック時追加ダメージ比自己回復量（％）
        "heal": {
            "base": 40,
            "attack": 6
        },
        // 最大スタック時追加ダメージ比自己回復量最大値
        "max_heal": {
            "base": [20, 30, 40],
            "attack": 6
        },
        // 最大スタック時野生動物への追加ダメージ最大値
        "animal_max": 100
    }
}