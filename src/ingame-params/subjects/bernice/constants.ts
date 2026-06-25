export default {
    "common": {
        // 基本攻撃射程基本値上書き
        "basic_attack_range": 4
    },
    "Q": {
        // 基本ダメージ
        "damage": {
            "base": [60,90,120,150,180],
            "attack": 100
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [20,25,30,35,40]
        },
        // 束縛状態の敵に与える強化ダメージ
        "enhanced_damage": {
            "base": [90,130,170,210,250],
            "attack": 100
        },
        // 束縛状態の敵に与える強化移動速度減少
        "enhanced_slow": {
            "duration": 1.5,
            "effect": [30,35,40,45,50]
        },
        "cooldown": [7,6.5,6,5.5,5]
    },
    "W": {
        // 狩り罠持続時間
        "duration": [20,25,30,35,40],
        // ダメージ持続時間
        "damage_duration": 3,
        // 固定ダメージ総量
        "damage": {
            "base": [40,70,100,130,160],
            "attack": 60
        },
        // 束縛時間
        "bind": 0.75,
        // 狩り罠最大設置数
        "setup": [2,2,2,3,3],
        "cooldown": {
            "constant": 1
        },
        "charge": {
            "time": [18,17,16,15,14],
            "max": [2,2,3,3,4]
        }
    },
    "E": {
        // 狩り刻印持続時間
        "mark_duration": 6,
        // 狩り刻印対象者へ向かう時の自己移動速度増加
        "movement_speed": [15,18,21,24,27],
        // 狩り罠対象者への基本攻撃的中時Qクールダウン減少（秒）
        "q_cooldown_reduction": 0.5,
        // 狩り罠対象者への基本攻撃的中時Rクールダウン減少（秒）
        "r_cooldown_reduction": 0.5,
        // 鷹の持続時間
        "duration": 8,
        // 視界増加量
        "vision": [2,2.5,3,3.5,4],
        // 鷹による狩り刻印付与の周期
        "marking_period": 6,
        "cooldown": [10,9,8,7,6]
    },
    "R": {
        // 的中時ダメージ
        "first_damage": {
            "base": [150,200,250],
            "attack": 85
        },
        // 束縛時間
        "bind": 1.25,
        // 転移時ダメージ
        "second_damage": {
            "base": [80,120,160],
            "attack": 45
        },
        // 転移範囲
        "spread_range": 2,
        // 最大転移回数
        "max_spread": 3,
        "cooldown": [90,75,60]
    },
    "T": {
        // 最大装弾数
        "ammo": [3,4,5],
        // 自動リロード周期
        "auto_charge": 2,
        // 弾丸同時発射数
        "bullet": 4,
        // 1発目の弾丸ダメージ
        "base_damage": {
            "attack": 100,
            "basicAttackAmp": 100
        },
        // 2発目以降の弾丸ダメージ
        "additional_damage": {
            "attack": 10,
            "basicAttackAmp": 100
        },
        // 追加発射時ダメージ基本倍率（％）
        "second_damage_multiplier": 75,
        // リロード時間
        "reload": [1.3,1.1,0.9]
    }
}