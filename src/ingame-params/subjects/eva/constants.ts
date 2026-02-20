export default {
    "Q": {
        // 経路ダメージ
        "first_damage": {
            "base": [40,60,80,100,120],
            "amp": 40
        },
        // 爆発ダメージ
        "second_damage": {
            "base": [45,80,115,150,185],
            "amp": 40
        },
        // 的中時クールダウン減少（秒）
        "cooldown_reduction": 1,
        // バイタルフォース獲得量
        "vitalforce": 5,
        "cooldown": [9,8,7,6,5]
    },
    "W": {
        // 位相の渦持続時間
        "duration": 1,
        // 生成時ダメージ
        "first_damage": {
            "base": [40,70,100,130,160],
            "amp": 45
        },
        // 移動速度減少（％）
        "slow": 40,
        // 爆発時ダメージ
        "second_damage": {
            "base": [40,70,100,130,160],
            "amp": 40
        },
        // エアボーン時間
        "airborne": 1,
        // バイタルフォース獲得量
        "vitalforce": 5,
        "cooldown": [11,10.5,10,9.5,9]
    },
    "E": {
        "movement_speed": {
            "duration": 0.65,
            "effect": [120,125,130,135,140]
        },
        "vitalforce": 30,
        "vision_duration": 3,
        "vflight_duration": 4,
        "damage": {
            "base": [20,25,30,35,40],
            "amp": 20
        },
        "cooldown": 9
    },
    "R": {
        "tick": 0.1,
        "damage": {
            "base": [8,12,16],
            "amp": 5
        },
        "max_stack": 5,
        "stack_damage": {
            "base": [30,50,70],
            "amp": 30
        },
        "min_vf": 20,
        "vf_consumption": 4,
        "cooldown": 0
    },
    "T": {
        "basic_attack_range": 1,
        "damage": {
            "base": [30,60,90],
            "amp": 45
        },
        "vitalforce": 2,
        "vitalforce_kill": 30,
        "vitalforce_assist": 15,
        "vitalforce_enhanced_attack": 15,
        "cooldown": {
            "constant": 5
        }
    }
}