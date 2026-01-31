export default {
    "Q": {
        // 敵に向かって移動するときの移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 15
        },
        "damage": {
            "base": [20,40,60,80,100],
            "attack": 40,
            "targetMaxHP": [1,2,3,4,5]
        },
        // 刻印持続時間
        "mark": 5,
        // 刻印対象ダメージ増加（％）
        "mark_enhance": [10,20,30,40,50],
        "cooldown": 3
    },
    "W": {
        "shield": {
            "base": [50,75,100,125,150],
            "attack": 55
        },
        // シールド持続時間
        "shield_duration": 3,
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [20,22.5,25,27.5,30]
        },
        // 的中1人あたりシールド追加量
        "additional_shield": {
            "maxHP": 6
        },
        // 的中時攻撃力窃取
        "attack": {
            "duration": 4,
            "effect": [1,2,3,4,5]
        },
        // シールド/攻撃力窃取対象最大人数
        "max_hit": 4,
        "cooldown": 9
    },
    "E": {
        "damage": {
            "base": [70,115,160,205,250],
            "attack": 85
        },
        // エアボーン時間
        "airborne": 0.6,
        "cooldown": [14,13,12,11,10]
    },
    "R": {
        "damage": {
            "base": [50,125,200],
            "attack": 30,
            "targetMaxHP": 25
        },
        // 移動速度減少
        "slow": {
            "duration": 0.5,
            "effect": 80
        },
        "cooldown": [90,75,60]
    },
    "T": {
        // 防御力窃取
        "defense": {
            "duration": 4,
            "effect": [6,10,14]
        },
        "cooldown": 8
    }
}