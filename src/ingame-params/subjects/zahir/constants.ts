export default {
    "Q": {
        // 通常ダメージ
        "damage": {
            "base": [30, 70, 110, 150, 190],
            "amp": 60
        },
        // 死神の目強化ダメージ
        "enhanced_damage": {
            "base": [60, 110, 160, 210, 260],
            "amp": 70
        },
        "cooldown": [6, 5.5, 5, 4.5, 4]
    },
    "W": {
        // スキル的中時チャクラム獲得数
        "chakram_gain": 2,
        "damage": {
            "base": [70,95,120,145,170],
            "amp": 50
        },
        // 死神の目強化攻撃的中時QEクールダウン減少
        "qe_cooldown_reduction": 40,
        "cooldown": {
            "constant": 0.55
        },
        "charge": {
            "time": 7,
            "max": 4
        }
    },
    "E": {
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 50
        },
        // 通常エアボーン時間
        "airborne": 0.5,
        // 死神の目強化時エアボーン時間
        "enhanced_airborne": 0.8,
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 最初の1撃目ダメージ
        "first_damage": {
            "base": [60, 120, 180],
            "amp": 45
        },
        // 連続攻撃発生周期
        "tick": 0.45,
        // 2撃目以降ダメージ
        "second_damage": {
            "base": [50, 75, 100],
            "amp": 30
        },
        // 攻撃回数（1撃目除く）
        "total_count": 5,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 死神の目持続時間
        "duration": 3,
        // 死神の目付与時移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": [8, 14, 20]
        },
        // 死神の目消耗時追加ダメージ
        "damage": {
            "base": [40, 60, 80],
            "amp": 25
        }
    }
}