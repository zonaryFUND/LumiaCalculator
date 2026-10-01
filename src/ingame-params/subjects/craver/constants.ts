export default {
    "Q": {
        // ダブルタップダメージ
        "damage": {
            "base": [50,70,90,110,130],
            "amp": 40
        },
        // フォーカスショットダメージ
        "enhanced_damage": {
            "base": [80,120,160,200,240],
            "amp": 80
        },
        // フォーカスショット的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 20
        },
        // フォーカスショット追加DoT持続時間
        "additional_damage_duration": 2,
        // フォーカスショット追加DoT
        "additional_damage": {
            "base": [40,70,100,130,160],
            "amp": 30
        },
        "cooldown": [9,8,7,6,5]
    },
    "W": {
        // スイープキックダメージ
        "damage": {
            "base": [40,65,90,115,140],
            "amp": 40
        },
        // スイープキック的中時スロウ
        "slow": {
            "duration": 0.8,
            "effect": 30
        },
        // スイープキック中移動速度増加
        "movement_speed": 100,
        // スイープキック中被ダメージ減少
        "damage_reduction": 30,
        // スイープキック的中時クールダウン減少
        "cooldown_reduction": 20,
        // バックフリップダメージ
        "enhanced_damage": {
            "base": [130,160,190,220,250],
            "amp": 85
        },
        // バックフリップ的中時エアボーン時間
        "airborne": 0.75,
        "cooldown": [12,11.5,11,10.5,10]
    },
    "E": {
        // コンバットロールダメージ
        "damage": {
            "base": [50,80,110,140,170],
            "amp": 60
        },
        // コンバットロール敵実験体的中時クールダウン減少
        "cooldown_reduction": 20,
        // コンバットロール野生動物的中時クールダウン減少
        "cooldown_reduction_animal": 10,
        // クイックステップダメージ
        "enhanced_damage": {
            "base": [100,125,150,175,200],
            "amp": 80
        },
        "cooldown": [14,13.5,13,12.5,12]
    },
    "R": {
        // 空中静止時間
        "airborne": 1,
        "damage": {
            "base": [130,205,280],
            "amp": 70
        },
        // 与ダメージ比自己回復
        "heal": 100,
        "cooldown": [80,70,60]
    },
    "T": {
        // 攻撃速度
        "attack_speed": [0.9,1.1,1.3],
        // 基本攻撃追加スキルダメージ
        "damage": {
            "base": [20,40,60],
            "amp": 25,
            "attackSpeed": 50
        },
        "reload_time": 5,
        "reload_duration": 1.75
    }
}