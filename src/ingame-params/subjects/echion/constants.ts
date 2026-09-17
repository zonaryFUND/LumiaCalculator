export default {
    "Q": {
        // 1発目ダメージ
        "first_damage": {
            "base": [20,35,50,65,80],
            "attack": 50
        },
        // 再使用可能時間
        "second": 3,
        // 2発目ダメージ
        "second_damage": {
            "base": [40,60,80,100,120],
            "attack": 65
        },
        // 2発目的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": [5,10,15,20,25]
        },
        // VFゲージ増加
        "vf_gauge": [[12,16],[13,18],[14,20],[15,22],[16,24]],
        "cooldown": 6
    },
    "W": {
        // VFゲージ最大消耗量
        "gauge_max_consumption": 50,
        "shield": {
            "base": [20,40,60,80,100],
            "attack": 50
        },
        // 消耗VF変換シールド追加量（％）
        "multiplier": 200,
        // 消耗VF返還発生シールド比ダメージ量（％）
        "return_threshold": 100,
        // VF消耗量比返還量（％）
        "return_gauge": [60,70,80,90,100],
        "cooldown": [10,9.5,9,8.5,8]
    },
    "E": {
        "damage": {
            "base": [20,35,50,65,80],
            "attack": 40
        },
        // 刻印維持時間
        "mark": 6,
        // VFゲージ増加
        "vf_gauge": [16,17,18,19,20],
        "cooldown": [16,15,14,13,12]
    },
    // R基本情報
    "R": {
        // VFゲージ比スキルダメージ増幅量（％）
        "damage_amp_per_vf": [0.3,0.5,0.7,0.9],
        // VF暴走状態持続時間
        "overflow": 9,
        // VF暴走状態時移動速度増加（％）
        "movement_speed": 5,
        // VF暴走状態時範囲固定ダメージ発生周期
        "area_damage_tick": 0.5,
        // VF暴走状態時範囲固定ダメージ
        "area_damage": {
            "base": [7,10,13,16],
            "attack": 7
        },
        // VF暴走状態中キル時暴走状態延長時間（秒）
        "kill_extend": 5,
        // オーバーロード状態持続時間
        "overload": 8,
        // オーバーロード状態時基本攻撃射程減少（ｍ）
        "range_penalty": 0.3,
        // エンベノミゼーション的中時VF暴走状態持続時間増加（秒）
        "extend": 1,
        // 基本攻撃的中時エンベノミゼーションクールダウン減少量（秒）
        "cooldown_reduction": 0.5
    },
    // ヴァイパー装備時R
    "R0_1": {
        "damage": {
            "base": [95,180,225,270],
            "attack": 80
        },
        "cooldown": {
            "constant": 3.5
        }
    },
    // サイドワインダー装備時R
    "R1": {
        "damage": {
            "base": [40,80,125,170],
            "additionalAttack": 200
        },
        // エンベノミゼーション的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 90
        },
        // スキル的中時スキルダメージ増幅量（％）
        "skill_damage_add": [20,30,40,50],
        "cooldown": {
            "constant": 3
        }
    },
    // ブラックマンバ装備時R
    "R2": {
        // 1発目ダメージ
        "damage": {
            "base": [50,120,160,200],
            "attack": 80,
            "additionalMaxHP": 10
        },
        // 2発目発生までの時間
        "second": 0.85,
        // 2発目ダメージ（1発目ダメージ比）
        "second_damage": [55,70,85,100],
        // 2発目命中時エアボーン時間
        "airborne": 0.75,
        // スキル与ダメージ比回復量（％）
        "skill_lifesteal": [10,14,18,22],
        "cooldown": {
            "constant": 4
        }
    },
    // デスアダー装備時R
    "R3": {
        "damage": {
            "base": [90,200,250,300],
            "attack": 110
        },
        // 戦闘狂スタック1あたりの攻撃速度増加（％）
        "attack_speed": [8,10,12,14]
    },
    // T基本情報
    "T0": {
        // VF義手強化所要時間
        "upgrade": 1
    },
    // サイドワインダー装備時T
    "T1_2": {
        // Wクールダウン減少（％）
        "w_cooldown_reduction": 15
    },
    // ブラックマンバ装備時T
    "T2_2": {
        // スキル使用時VFゲージ獲得量増加
        "additional_gauge": 3,
        // VF暴走状態持続時間増加
        "overflow_extend": 4
    },
    // デスアダー装備時T
    "T3_2": {
        // 戦闘狂スタック持続時間
        "attack_speed_duration": 5,
        // VF暴走状態時基本攻撃追加ダメージ
        "damage": {
            "attack": 40,
            "basicAttackAmp": 100
        }
    }
}