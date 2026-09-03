export default {
    "Q": {
        // 血の槍衝突時ダメージ
        "first_damage": {
            "base": [40,80,120,160,200],
            "amp": 50
        },
        // 着地点範囲ダメージ
        "second_damage": {
            "base": [10,40,70,100,130],
            "amp": 50,
            "targetMaxHP": 10
        },
        // 血流現象対象束縛時間
        "bind": 1,
        "hp_cost_percent": 4,
        "cooldown": [10,9,8,7,6]
    },
    "W": {
        // 棺最大持続時間
        "max_duration": 3,
        // 棺の中の被ダメージ減少量（％）
        "damage_reduction": [60,65,70,75,80],
        // 棺の中の体力回復周期
        "heal_tick": 0.5,
        // 棺の中の体力回復量
        "heal": {
            "maxHP": 4
        },
        // W強化に必要な血液蓄積量（％）
        "enhance_threshold": 50,
        // W強化時の体力回復量増加率（％）
        "enhanced_heal_ratio": 1.5,
        "cooldown_reduction": {
            // 強化W使用中の他スキルクールダウン減少効果発生周期
            "per": 1.5,
            // 強化W使用中の他スキルクールダウン減少効果（秒）
            "value": 1
        },
        "cooldown": [14,13,12,11,10]
    },
    "E": {
        "additional_cost": {
            // チャージ中の追加コスト発生周期
            "per": 0.2,
            // チャージ中の1ティックあたり追加コスト（現在体力％）
            "value": 1
        },
        // 最大チャージ時間（秒）
        "max_charge": 1,
        // チャージ最大維持時間（秒）
        "charge_remain": 3,
        // 最小ダメージ
        "min_damage": {
            "base": [30,55,80,105,130],
            "amp": 60
        },
        // 最大ダメージ（最大チャージ時）
        "max_damage": {
            "base": [60,110,160,210,260],
            "amp": 120
        },
        // 的中時自己回復量
        "heal": {
            "base": [25,35,45,55,65],
            "amp": 30
        },
        // 複数対象的中時自己回復量増加率（％）
        "multiple_hit_heal_amp": 40,
        "hp_cost_percent": 2,
        "cooldown": [12,11,10,9,8]
    },
    "R": {
        // 魔法陣発生時ダメージ
        "first_damage": {
            "base": [50,100,150],
            "amp": 40,
            "targetMaxHP": 11
        },
        // 魔法陣発生時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 60
        },
        // 魔法陣の上にいるときのダメージ吸血増加量
        "omnisyphon_amp": [14,22,30],
        // 最小ダメージ
        "min_damage": {
            "base": [50,100,150],
            "amp": 70
        },
        // 最大ダメージ（対象の失った体力比例）
        "max_damage": {
            "base": [100,200,300],
            "amp": 140
        },
        // 的中時自己回復量
        "heal": {
            "base": [70,110,150],
            "amp": 35,
            "lostHP": 8
        },
        // 複数対象的中時自己回復量増加率（％）
        "multiple_hit_heal_amp": 40,
        "hp_cost_percent": 8,
        "cooldown": [80,70,60]
    },
    "T": {
        // 基本攻撃時追加スキルダメージ
        "damage": {
            "base": [30,70,110],
            "amp": 40,
            "targetMaxHP": 8
        },
        // 血流減速による移動速度減少
        "slow": {
            "duration": 2,
            "effect": [5,10,15]
        },
        "blood_conversion": {
            // 与ダメージからの血液蓄積量
            "skill_damage": 12,
            // 体力消耗量からの血液蓄積量
            "lost_hp": 20
        },
        // 血液最大値（自身の最大体力％）
        "max_blood": 35,
        // 非戦闘状態の血液消耗による体力回復効果発生周期
        "blood_heal_tick": 1,
        // 非戦闘状態の血液消耗1回あたり量
        "blood_consumption": 10,
        // 血液消耗量に対する体力回復量（％）
        "blood_heal_ratio": 100,
        // 基本攻撃時追加スキルダメージ発生クールダウン
        "cooldown": {
            "constant": [9,7,5]
        }
    }
}