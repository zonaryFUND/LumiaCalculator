export default {
    "Q": {
        // 光の球体持続時間
        "duration": 2,
        "damage": {
            "base": [120,150,180,210,240],
            "amp": 95
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 65
        },
        "cooldown": [8,7.5,7,6.5,6]
    },
    "W": {
        "heal": {
            "base": [30,50,70,90,110],
            "amp": 15
        },
        "cooldown": 8
    },
    "E": {
        // シールド持続時間
        "shield_duration": 2.5,
        "shield": {
            "base": [50,80,110,140,170],
            "amp": 30
        },
        "cooldown": [9,8.5,8,7.5,7]
    },
    "R": {
        // 詠唱時間
        "channeling": 1.5,
        // スキル増幅増加
        "amp": [10,20,30],
        // 無敵時間
        "duration": 1.5,
        "cooldown": [80,70,60]
    },
    "T": {
        // 高潔な心スタック1の獲得に必要な周囲の味方の体力減少（％）
        "ally_losthp_threshold": 30,
        // 高潔な心1スタックあたり回復/シールド増加（％）
        "heal_and_shield_amp": [1,3,5],
        // 高潔な心最大スタック数
        "max_stack": 3,
        // 高潔な心スタック獲得の参照範囲（ｍ）
        "range": 7
    }
}