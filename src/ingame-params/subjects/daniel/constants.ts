export default {
    "Q": {
        // ハサミ周辺ダメージ
        "damage": {
            "base": [30,40,50,60,70],
            "attack": 110
        },
        "basic_attack_enhance": {
            // 基本攻撃速度増加回数
            "count": 3,
            // 基本攻撃速度増加効果時間
            "duration": 3,
            // 基本攻撃速度増加量（％）
            "attack_speed": [80,110,140,170,200] 
        },
        // ハサミ中心部ダメージ
        "center_damage": {
            "base": [40,60,80,100,120],
            "attack": 140
        },
        // ハサミ中心部的中時移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 35
        },
        "cooldown": [10,9,8,7,6]
    },
    "W": {
        // 刻印対象視野獲得半径
        "vision_range": 2,
        // 刻印対象視野減少
        "vision_decrease": 2,
        // 刻印持続時間
        "duration": 7,
        // 刻印対象ダメージ保存量（％）
        "stored_damage": {
            "base": [4,6,8,10,12],
            "additionalAttack": 8
        },
        // インスピレーション持続時間
        "blast_duration": 2.5,
        // インスピレーション爆発ダメージ
        "damage": {
            "base": [20,40,60,80,100],
            "attack": 60
        },
        // インスピレーション爆発時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        "cooldown": 7
    },
    "E": {
        // 使用時隠密状態持続時間
        "stealth": [1,1.2,1.4,1.6,1.8],
        // シャドーグライド状態持続時間
        "duration": 3,
        // シャドーグライド状態時基本攻撃射程固定値
        "basic_attack_range": 3,
        "damage": {
            "base": [20,40,60,80,100],
            "additionalAttack": 50
        },
        "cooldown": [11,10,9,8,7]
    },
    "R": {
        // 沈黙時間
        "silence": 0.5,
        // 最大潜伏時間
        "duration": 2,
        // 潜伏中1ティックあたりダメージ
        "damage": {
            "base": [10,30,50],
            "attack": 30
        },
        // 潜伏中ダメージ最大ティック数
        "damage_count": 4,
        // 離脱時ダメージ
        "finish_damage": {
            "base": [40,105,170],
            "attack": 90
        },
        // ダメージを与えてから潜伏が可能な時間
        "window_after_attack": 4,
        "cooldown": [70,60,50]
    },
    "T": {
        // 夜間視界増加量（％）
        "vision": [14,17,20],
        // 移動速度増加量（％）
        "movement_speed": [2,4,6]
    }
}