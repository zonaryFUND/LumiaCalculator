export default {
    "Q": {
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "amp": 60
        },
        // 蝶回収時クールダウン減少
        "cooldown_reduction": 40,
        "cooldown": [11, 10, 9, 8, 7]
    },
    "W": {
        // 空色の風ダメージ
        "first_damage": {
            "base": [20, 24, 28, 32, 36],
            "amp": 16
        },
        // 空色の風発動回数
        "count": 5,
        // 空色の風効果中移動速度増加（％）
        "movement_speed": [28, 32, 36, 40, 44],
        // 蝶の嵐使用時対象指定不可時間
        "untargettable": 1,
        // 蝶の嵐ダメージ
        "second_damage": {
            "base": [60, 95, 130, 165, 200],
            "amp": 95
        },
        // 蝶の嵐使用時クールダウン増加（元クールダウン比）
        "cooldown_increase": 1,
        "cooldown": 6
    },
    "E": {
        // 内側ダメージ
        "inner_damage": {
            "base": [80, 110, 140, 170, 200],
            "amp": 80
        },
        // 外側ダメージ
        "outer_damage": {
            "base": [90, 125, 160, 195, 230],
            "amp": 90
        },
        // 外側的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 45
        },
        // スキルキャスト時間最大値
        "max_cast_time": 0.5,
        "cooldown": [16, 15, 14, 13, 12]
    },
    "R": {
        // 眠り粉着弾ダメージ
        "damage": {
            "base": [70, 140, 210],
            "amp": 35
        },
        // 眠気時間
        "drowsy": 2.25,
        // 睡眠時間
        "sleep": 1.5,
        // 睡眠解除時追加ダメージ
        "wakeup_damage": {
            "base": [100, 180, 240],
            "amp": 70
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 基本攻撃追加ダメージ
        "basic_attack_damage": {
            "base": [20, 50, 80],
            "amp": 50
        },
        // 夢幻の蝶スタック最大値
        "max_stack": 4,
        // 夢幻の蝶ダメージ持続時間
        "duration": 3,
        // 夢幻の蝶ダメージ総量
        "damage_over_time": {
            "base": [30, 42, 54],
            "amp": 60
        },
        // 夢幻の蝶発動時シールド量
        "shield": {
            "base": [30, 65, 100],
            "amp": 30
        },
        // 夢幻の蝶シールド1秒あたり減少量
        "shield_decline": {
            "base": 50,
            "level": 2
        },
        // 夢幻の蝶シールド最大蓄積量
        "max_shield": {
            "base": [70, 135, 200],
            "amp": 70
        },
        "cooldown": {
            "constant": [8, 6.5, 5]
        }
    }
}