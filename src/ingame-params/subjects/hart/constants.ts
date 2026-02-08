export default {
    "Q": {
        // 最小チャージダメージ
        "min_damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 40
        },
        // 最大チャージダメージ
        "max_damage": {
            "base": [40, 80, 120, 160, 200],
            "attack": 80
        },
        // 最大チャージに達するまでの時間（秒）
        "charge_threshold": 4,
        // 移動速度減少効果が発生するのに必要な最小チャージ時間（秒）
        "slow_threshold": 2,
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 35
        },
        "cooldown": 4
    },
    "W": {
        // 持続時間
        "duration": [5, 5.5, 6, 6.5, 7],
        // 攻撃力増加
        "attack": [4, 8, 12, 16, 20],
        // 基本攻撃射程増加
        "range": 0.4,
        "cooldown": 14
    },
    "E": {
        "damage": {
            "base": [70, 90, 110, 130, 150],
            "attack": 60
        },
        "cooldown": [15, 14.5, 14, 13.5, 13]
    },
    "R": {
        // 持続時間
        "duration": 4,
        // 被ダメージ・被回復が無効になる体力（％）
        "threshold": 10,
        // 終了時範囲内回復
        "heal": {
            "base": [200, 275, 350]
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 追加音波数
        "evoluted_sound_wave": 2,
        // 音波1つあたりダメージ
        "damage": {
            "attack": [3, 6, 9],
            "basicAttackAmp": 100
        }
    }
}