export default {
    "Q": {
        // 初回使用時基本攻撃追加ダメージ
        "first_damage": {
            "base": [20,40,60,80,100],
            "attack": [10,20,30,40,50]
        },
        // 初回使用後基本攻撃時体力回復量
        "first_heal": {
            "maxHP": [2,2.5,3,3.5,4] 
        },
        // 初回使用後再使用可能になるまでの時間
        "reuse_after": 1.5,
        // 再使用可能時間
        "reuse_duration": 4,
        // 再使用時基本攻撃後追撃ダメージ
        "reuse_chase_damage": {
            // ダメージ発生回数
            "count": 2,
            // 追加基本攻撃ダメージ
            "basic_attack_damage": {
                "attack": 25,
                "basicAttackAmp": 100
            },
            // 追加スキルダメージ
            "skill_damage": {
                "base": [8,16,24,32,40],
                "attack": [12,14,16,18,20]
            }
        },
        // 再使用後基本攻撃時体力回復量
        "reuse_heal": {
            "maxHP": [3.9,4.8,5.7,6.6,7.5]
        },
        // 追加ダメージ範囲割合
        "additional_area_damage": 70,
        // 追加ダメージ範囲
        "additional_damage_area": 2,
        "cooldown": [9,8,7,6,5]
    },
    "W": {
        "damage": {
            "base": [80,110,140,170,200],
            "attack": 80,
            "targetMaxHP": [9,10,11,12,13]
        },
        // 的中対象移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 40
        },
        // 自身に命中したときのシールド
        "shield": {
            "duration": 2.5,
            "effect": {
                "base": [50,75,100,125,150],
                "maxHP": 13
            }
        },
        // 自身に命中したときの移動速度増加
        "movement_speed": {
            "duration": 1.5,
            "effect": 15
        },
        "cooldown": 12
    },
    "E": {
        // 挑発時間
        "taunt": [0.8,0.85,0.9,0.95,1],
        "damage": {
            "base": [80,110,140,170,200],
            "attack": 100
        },
        "cooldown": [15,14,13,12,11]
    },
    "R": {
        // 飛び上がり中被ダメージ減少
        "damage_reduction": 40,
        // 効果時間
        "duration": 15,
        // 追加体力
        "additional_max_hp": {
            "base": [150,325,500]
        },
        "damage": {
            "base": [120,270,420],
            "additionalAttack": 170,
            "targetMaxHP": 10
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 中央的中時ダメージ・移動速度減少効果増加量
        "center_amp": 30,
        "cooldown": [80,70,60]
    },
    "T": {
        // 基本攻撃与ダメージ時神力獲得量
        "basic_attack_divine_power": 10,
        // スキル与ダメージ時神力獲得量
        "skill_divine_power": 30,
        // トッケビ火持続時間
        "duration": 4,
        // トッケビ火秒間ダメージ
        "damage": {
            "base": [16,24,32],
            "additionalAttack": 40,
            "targetMaxHP": [1,2,3]
        },
        // 移動速度減少耐性
        "slow_resistance": [5,10,15]
    }
}