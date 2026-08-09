export default {
    "Q": {
        // 基礎ダメージ
        "damage": {
            "base": [60, 100, 140, 180, 220],
            "amp": 65
        },
        // 栞持続時間
        "bookmark_duration": 5,
        // 栞対象へのダメージ
        "bookmark_damage": {
            "base": [20, 40, 60, 80, 100],
            "amp": 40
        },
        // 栞対象への気絶時間
        "stun": 0.6,
        // 中央的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": [50, 55, 60, 65, 70]
        },
        // 中央的中時ダメージ増加（元ダメージ比％）
        "center_multiplier": 30,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "W": {
        // 青い鳥持続時間
        "shield_duration": 2.5,
        "shield": {
            "base": [80, 110, 140, 170, 200],
            "amp": 40
        },
        // 失明時間
        "blind_duration": [1.1, 1.15, 1.2, 1.25, 1.3],
        "damage": {
            "base": [30, 65, 100, 135, 170],
            "amp": 40
        },
        "cooldown": [19, 18.5, 18, 17.5, 17]
    },
    "E": {
        // 基礎ダメージ
        "damage": {
            "base": [110, 140, 170, 200, 230],
            "amp": 65
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // 栞持続時間
        "bookmark_duration": 5,
        // 栞対象へのダメージ
        "bookmark_damage": {
            "base": [150, 190, 230, 270, 310],
            "amp": 85
        },
        // 的中時自己回復最小値
        "heal": {
            "base": [20, 30, 40, 50, 60],
            "amp": 20
        },
        // 的中時自己回復最大倍率
        "heal_max_multiplier": 1.5,
        // 的中時の自己回復量が最大になる自身の体力％
        "heal_max_hp": 40,
        // 的中時クールダウン減少
        "cooldown_reduction": 20,
        // 栞対象へのエアボーン時間
        "airborne": 0.6,
        "cooldown": [16, 15, 14, 13, 12]
    },
    // RQ：記憶力ーオデッセイ
    "RQ": {
        // 基礎ダメージ
        "damage": {
            "base": [180, 230, 280],
            "amp": 80
        },
        // 栞持続時間
        "bookmark_duration": 5,
        // 栞対象へのダメージ
        "bookmark_damage": {
            "base": [50, 100, 150],
            "amp": 50
        },
        // 栞対象への気絶時間
        "stun": 0.6,
        // 中央的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": [50, 60, 70]
        },
        // 中央的中時ダメージ増加（元ダメージ比％）
        "center_multiplier": 30
    },
    // RW：記憶力－青い鳥
    "RW": {
        // 青い鳥持続時間
        "shield_duration": 2.5,
        "shield": {
            "base": [100, 180, 260],
            "amp": 40
        },
        // 失明時間
        "blind_duration": [1.1, 1.2, 1.3],
        "damage": {
            "base": [50, 110, 170],
            "amp": 40
        }
    },
    // RE：記憶力－ドン・キホーテ
    "RE": {
        // 基礎ダメージ
        "damage": {
            "base": [125, 190, 255],
            "amp": 65
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // 栞持続時間
        "bookmark_duration": 5,
        // 栞対象へのダメージ
        "bookmark_damage": {
            "base": [170, 260, 350],
            "amp": 85
        },
        // 的中時自己回復最小値
        "heal": {
            "base": [50, 80, 110],
            "amp": 20
        },
        // 的中時自己回復最大倍率
        "heal_max_multiplier": 1.5,
        // 的中時自己回復量が最大になる自身の体力％
        "heal_max_hp": 40,
        // 的中時クールダウン減少
        "cooldown_reduction": 20,
        // 栞対象へのエアボーン時間
        "airborne": 0.6
    },
    "R": {
        "cooldown": [26, 23, 20]
    },
    "T": {
        // 強化基本攻撃ダメージ
        "damage": {
            "base": [100, 160, 220],
            "amp": 50
        },
        // 強化基本攻撃拡散範囲
        "aoe_range": 2,
        // 強化基本攻撃周囲ダメージ
        "aoe_damage": {
            "base": [50, 80, 110],
            "amp": 25
        },
        // 強化基本攻撃回復量（与ダメージ比％）
        "heal": 35,
        // 心の糧最大数
        "max_stack": 3,
        // 心の糧保持時基本攻撃速度増加（％）
        "attack_speed": 100,
        // 強化基本攻撃的中時スキルクールダウン減少
        "cooldown_reduction": 1.2
    }
}