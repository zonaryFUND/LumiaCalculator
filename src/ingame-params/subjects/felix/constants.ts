export default {
    "Q": {
        "damage": {
            "base": [55, 80, 105, 130, 155],
            "attack": 65
        },
        // 3段目強化ダメージ
        "enhanced_damage": {
            "base": [60, 85, 110, 135, 160],
            "attack": 65,
            "level": 3
        },
        // 強化時エアボーン時間基礎値
        "airborne": 0.08,
        // 強化時追加固定ダメージ（連携攻撃スタック1あたり）
        "stack_damage_conversion": {
            "base": [2, 4, 6, 8, 10]
        },
        // 強化時エアボーン追加時間（連携攻撃スタック1あたり）
        "stack_airborne_extend": 0.075
    },
    "W": {
        "damage": {
            "base": [70, 100, 130, 160, 190],
            "attack": 50
        },
        // 3段目強化ダメージ
        "enhanced_damage": {
            "base": [80, 120, 160, 200, 240],
            "attack": 60,
            "level": 3
        },
        // 3段目強化束縛時間基礎値
        "bind": 0.6,
        // 連携攻撃スタック1あたり追加束縛時間
        "stack_bind_extend": 10
    },
    "E": {
        "damage": {
            "base": [19, 38, 57, 76, 95],
            "attack": 45
        },
        // 3段目強化ダメージ
        "enhanced_damage": {
            "base": [22, 44, 66, 88, 110],
            "attack": 50,
            "level": 3
        },
        // 基本攻撃回避時連携攻撃スタック獲得数最大値
        "stack_gain_max": 1,
        // 3段目強化時ダメージ吸血
        "omnisyphon": {
            "duration": 4,
            "effect": {
                "perStack": 1,
                "attack": 2
            }
        }
    },
    "R": {
        // 最小ダメージ
        "min_damage": {
            "base": [120, 180, 240],
            "attack": 100
        },
        // 最大ダメージ
        "max_damage": {
            "base": [360, 540, 720],
            "attack": 200
        },
        // 気絶時間
        "stun": 1,
        // 連携攻撃スタック獲得数
        "stack_gain": 4,
        "cooldown": [60, 50, 40]
    },
    "T": {
        // スキル使用時連続基本攻撃効果時間
        "duration": 2,
        // 連続基本攻撃の2段目ダメージ
        "damage": {
            "attack": [15, 20, 25],
            "basicAttackAmp": 100
        },
        // 共有クールダウン
        "shared_cooldown": [11, 10, 9],
        // 連携攻撃スタック最大値
        "max_stack": 8,
        // 3段目攻撃時の連携攻撃スタック1あたり共有クールダウン減少（秒）
        "stack_cooldown_reduction": 1,
        // 3段目攻撃時のシールド獲得量
        "shield": {
            "duration": 2.5,
            "effect": {
                "consumedStack": 15,
                "attack": 45
            }
        }
    }
}