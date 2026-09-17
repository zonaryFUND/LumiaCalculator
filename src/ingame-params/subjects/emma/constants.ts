export default {
    "Q": {
        "damage": {
            "base": [60,100,140,180,220],
            "amp": 80
        },
        // 鳩持続時間
        "duration": 7,
        // エマのカード的中時クールダウン減少（％）
        "cooldown_reduction": 25,
        // カード両的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 40
        },
        "cooldown": 5
    },
    "W": {
        // 発動から爆発までの時間
        "before_blast": 0.5,
        "damage": {
            "base": [80,125,170,215,260],
            "amp": 85
        },
        // 帽子持続時間
        "duration": 7,
        // 的中時クールダウン減少（％）
        "cooldown_reduction": 25,
        "cooldown": [10,9.5,9,8.5,8]
    },
    "E": {
        // 変身時間
        "morph": [0.8,0.85,0.9,0.95,1],
        "damage": {
            "base": [30,55,80,105,130],
            "amp": 30
        },
        // 移動速度減少量
        "movement_speed": 1.3,
        "cooldown": 14
    },
    "R": {
        "Q": {
            "damage": {
                "base": [150,200,250],
                "amp": 90
            },
            // 束縛時間
            "bind": 1.5
        },
        "W": {
            "damage": {
                "base": [200,280,360],
                "amp": 130
            }
        },
        "E": {
            // 変身時間
            "morph": 0.9,
            "damage": {
                "base": [40,70,100],
                "amp": 20
            },
            // 移動速度減少量
            "movement_speed": 1.6
        },
        "cooldown": [13,12,11]
    },
    "T": {
        // 基本攻撃強化効果時攻撃速度増加（％）
        "attack_speed": 40,
        // 基本攻撃追加スキルダメージ
        "damage": {
            "base": [60,80,100],
            "amp": [25,35,45]
        },
        "shield": {
            "base": [120,160,200],
            "amp": [25,30,35]
        },
        "cooldown": {
            "constant": [12,9,6]
        }
    }
}