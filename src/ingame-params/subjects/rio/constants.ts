export default {
    "Q": {
        // 皆中スタック最大値
        "max_stack": 3,
        // 短弓皆中効果時間
        "hankyu_duration": 2,
        // 短弓皆中時移動速度増加（％）
        "movement_speed": [6, 7, 8, 9, 10],
        // 短弓皆中時攻撃速度増加（％）
        "attack_speed": [20, 25, 30, 35, 40],
        // 長弓皆中時射程距離増加
        "daikyu_range_extend": 0.4,
        // 長弓皆中時基本攻撃ダメージ増加（対象の失った体力1％あたり増幅％）
        "daikyu_damage_enhance": 0.3,
        // 短弓基本攻撃威力（1発あたり）
        "hankyu": {
            "attack": 37,
            "basicAttackAmp": 100
        },
        // 短弓基本攻撃の追撃威力（1発あたり）
        "hankyu_additional": {
            "attack": 33,
            "basicAttackAmp": 100
        },
        // 長弓基本攻撃威力
        "daikyu": {
            "attack": 102,
            "basicAttackAmp": 100
        },
        // 長弓基本攻撃攻撃速度減少
        "daikyu_as_penalty": 0.22,
        // 長弓基本攻撃射程距離
        "daikyu_range": [6.3, 6.35, 6.4, 6.45, 6.5],
        "cooldown": {
            "constant": 0.8
        }
    },
    "W": {
        // 的中時スキルクールダウン減少
        "cooldown_reduction": 1,
        // 短弓時ダメージ（矢1本あたり）
        "hankyu_damage": {
            "base": [50, 70, 90, 110, 130],
            "attack": 80
        },
        // 短弓時移動速度減少
        "hankyu_slow": {
            "duration": 1.5,
            "effect": 30
        },
        // 短弓時複数の矢的中時2本目以降のダメージ量（元ダメージ比％）
        "multiple_hit": 20,
        // 長弓時ダメージ
        "daikyu_damage": {
            "base": [90, 105, 120, 135, 150],
            "attack": 90
        },
        // 長弓時貫通ダメージ
        "daikyu_behind_damage": {
            "base": [45, 50, 55, 60, 65],
            "attack": 45
        },
        // 長弓時移動速度減少
        "daikyu_slow": {
            "duration": 1,
            "effect": 20
        },
        "cooldown": [6, 5.75, 5.5, 5.25, 5]
    },
    "E": {
        // 最大対象数
        "max_target": 3,
        // 短弓時ダメージ
        "hankyu_damage": {
            "base": [10, 20, 30, 40, 50],
            "attack": 30
        },
        // 長弓時ダメージ
        "daikyu_damage": {
            "base": [70, 90, 110, 130, 150],
            "attack": 40
        },
        // 長弓時対象の周辺への拡散最大人数
        "daikyu_range": 2,
        // 長弓時対象の周辺への拡散ダメージ
        "daikyu_range_damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 35
        },
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 短弓時1発目ダメージ
        "hankyu_first_damage": {
            "base": [40, 70, 100],
            "attack": 40
        },
        // 短弓時1発目的中時クールダウン減少
        "hankyu_cooldown_reduction": 5,
        // 短弓時2発目ダメージ
        "hankyu_second_damage": {
            "base": [100, 150, 200],
            "attack": 60
        },
        // 短弓時壁衝突ダメージ
        "hankyu_wall_damage": {
            "base": [100, 125, 150],
            "attack": 40
        },
        // 短弓時ノックバック距離
        "hankyu_knockback": 4,
        // 短弓時壁衝突気絶時間
        "hankyu_stun": 1.5,
        // 長弓時ダメージ
        "daikyu_damage": {
            "base": [200, 340, 480],
            "attack": 80
        },
        // 長弓時移動速度減少
        "daikyu_slow": {
            "duration": 1.5,
            "effect": 60
        },
        // 長弓時発射後矢が加速するまでの時間
        "daikyu_acceleration": 0.8,
        "daikyu_enhance": {
            // 長弓時の矢の速度増加（％）               
            "velocity": 30,
            // 長弓時の矢のダメージ増加（％）
            "damage": 30,
            // 長弓時の矢の移動速度減少時間増加（％）
            "slow_duration": 100
        },
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 防御力減少
        "defense_decline": {
            "base": [2, 5, 8],
            "criticalChance": 0.1
        },
        // 基本攻撃ダメージ増幅
        "basic_attack_damage": {
            "base": 102,
            "criticalBase": 75
        }
    }
}