export default {
    "common": {
        // 近接Q/遠隔Q両スタック最大時攻撃速度増加
        "q_stack_max_as": 20,
        // E持続効果攻撃速度増加
        "e_as": [10,12,14,16,18]
    },
    "MeleeQ": {
        "damage": {
            "base": [50,70,90,110,130],
            "attack": 75
        },
        // 的中時1スタックあたり攻撃力増加
        "attack_up": {
            "duration": 20,
            "effect": 6,
            "max_stack": 2
        },
        "cooldown": [7,6.5,6,5.5,5]
    },
    "MeleeW": {
        "damage": {
            "base": [40,80,120,160,200],
            "attack": 80
        },
        "cooldown": [11,10.5,10,9.5,9]
    },
    "MeleeE": {
        // ホログラム持続時間
        "duration": 5,
        // 挑発時間
        "taunt": 0.7,
        // 武器交換可能状態最大持続時間
        "weapon_swap": 4,
        "cooldown": 13
    },
    "RangeQ": {
        "damage": {
            "base": [40,60,80,100,120],
            "attack": 80
        },
        // 的中時1スタックあたり攻撃力増加
        "attack_up": {
            "duration": 20,
            "effect": 4,
            "max_stack": 2
        },
        "cooldown": [7,6.5,6,5.5,5]
    },
    "RangeW": {
        "damage": {
            "base": [45,75,105,135,165],
            "attack": 80
        },
        // 的中時対象視界獲得・自己射程距離増加時間
        "duration": [2,2.5,3,3.5,4,4],
        // 的中時射程距離増加
        "range": 0.5,
        "cooldown": [13,12.5,12,11.5,11]
    },
    "RangeE": {
        "damage": {
            "base": [80,105,130,155,180],
            "attack": 70
        },
        // 的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": [30,35,40,45,50]
        },
        // 武器交換可能状態最大持続時間
        "weapon_swap": 4,
        "cooldown": 13
    },
    "R": {
        // 最初の落下ダメージ
        "first_damage": {
            // 周辺部ダメージ
            "outer": {
                "base": [80,150,220],
                "attack": 60
            },
            // 中央部ダメージ
            "center": {
                "base": [90,165,240],
                "attack": 75
            }
        },
        // 最初の落下的中時移動速度減少
        "first_slow": {
            "duration": 0.6,
            "effect": 40
        },
        // パルス放出ダメージ
        "later_damage": {
            // 周辺部ダメージ
            "outer": {
                "base": [30,40,50],
                "attack": 30
            },
            // 中央部ダメージ
            "center": {
                "base": [30,55,80],
                "attack": 45
            },
            // ダメージ周期
            "tick": 0.69,
            "amount": 10
        },
        // パルス放出的中時移動速度減少
        "later_slow": {
            "duration": 0.6,
            "effect": 20
        },
        "cooldown": [90,75,60]
    },
    "T": {
        // 武器補給箱支給レベル
        "supply_level": [5,6,7],
        // 潜入状態持続時間
        "hide_duration": 4,
        // 潜入状態開始時移動速度増加
        "movement_speed": {
            // 移動速度増加発生条件敵探知範囲（ｍ）
            "area": 8,
            "duration": 2,
            "effect": [2,5,8]
        },
        // 近接武器装備時防御力増加
        "defense": [5,10,15]
    }
}