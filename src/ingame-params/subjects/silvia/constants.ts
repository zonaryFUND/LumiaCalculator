export default {
    "HumanQ": {
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 60
        },
        "heal": {
            "base": [20, 40, 60, 80, 100],
            "amp": 10
        },
        // 燃料獲得量
        "fuel_gain": 20,
        "cooldown": [6, 5.5, 5, 4.5, 4]
    },
    "HumanW": {
        "damage": {
            "base": [80, 100, 120, 140, 160],
            "amp": 60
        },
        // 移動速度減少
        "slow": {
            "duration": 2,
            "effect": 25
        },
        // 燃料獲得量
        "fuel_gain": 5,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "HumanE": {
        // 最小ダメージ
        "min_damage": {
            "base": [110, 130, 150, 170, 190],
            "amp": 50
        },
        // 最大ダメージ
        "max_damage": {
            "base": [242, 286, 330, 374, 418],
            "amp": 110
        },
        // ノックバック効果が発生する最低距離
        "knockback_threshold": 3,
        // 燃料獲得量
        "fuel_gain": {
            "min": 4,
            "max": 49
        },
        "cooldown": [14, 13.5, 13, 12.5, 12]
    },
    "HumanR": {
        // バイク搭乗中1秒ごとの燃料消費
        "fuel_consumption": 16,
        // 移動速度増加
        "movement_speed": [0.2, 0.45, 0.7],
        // 防御力増加
        "defense": [15, 20, 25],
        // バイク搭乗直後の移動速度減少ペナルティ
        "ms_penalty": {
            "duration": 2,
            "effect": [-20, -10, 0]
        },
        // バイク搭乗可能な最小燃料
        "threshold": 50,
        "cooldown": [5, 4, 3]
    },
    "BikeQ": {
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "amp": 65
        },
        "cooldown": [3.5, 3, 2.5, 2, 1.5]
    },
    "BikeW": {
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 60
        },
        // エアボーン時間
        "airborne": 0.65,
        "cooldown": [8, 7.5, 7, 6.5, 6]
    },
    "BikeE": {
        "damage": {
            "base": [40, 70, 100, 130, 160],
            "amp": 55
        },
        // バイク移動速度に応じて追加されるダメージの最大値
        "ms_max_damage": [42, 70, 98, 126, 154],
        "cooldown": [12, 11, 10, 9, 8]
    },
    "BikeR": {
        // 降車後の基本攻撃強化効果時間
        "duration": 5,
        // 降車後の基本攻撃追加ダメージ
        "damage": {
            "base": [50, 90, 130],
            "amp": 40
        }
    },
    "T": {
        // グランツーリスモ1スタックあたり攻撃速度増加（％）
        "attack_speed": [0.3, 0.65, 1],
        // グランツーリスモ1スタックあたり燃料増加
        "max_fuel": 1,
        // グランツーリスモ追加効果を得られるスタック数
        "area_threshold": 10,
        // グランツーリスモ追加攻撃速度（％）
        "max_attack_speed": 10,
        // グランツーリスモ追加スキル増幅
        "max_skill_amp": 5,
        // バイク降車中の燃料獲得
        "fuel_gain": 1
    }
}