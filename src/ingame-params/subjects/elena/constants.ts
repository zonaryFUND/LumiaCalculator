export default {
    "Q": {
        // 1撃目ダメージ
        "first_damage": {
            "base": [20,35,50,65,80],
            "amp": 25,
            "additionalMaxHP": 10
        },
        // 2撃目ダメージ
        "second_damage": {
            "base": [40,70,100,130,160],
            "amp": 35,
            "additionalMaxHP": 10
        },
        // 2撃目命中時Qクールダウン減少
        "cooldown_reduction": 60,
        "cooldown": [8,7,6,5,4]
    },
    "W": {
        "damage": {
            "base": [50,70,90,110,130],
            "additionalMaxHP": 10,
            "amp": 50
        },
        // Qクールダウン減少
        "q_cooldown_reduction": 40,
        // 強化使用時Wクールダウン減少
        "enhanced_cooldown_reduction": 50,
        "cooldown": {
            "constant": 0.65
        },
        "charge": {
            "time": [16,15,14,13,12],
            "max": 2
        }
    },
    "E": {
        // ステップシークエンス秒間回復量
        "stepsequence_recovery": 4,
        // 氷床地帯上ステップシークエンス秒間回復量
        "stepsequence_recovery_on_ice": 8,
        // ステップシークエンス秒間消費量
        "stepsequence_cost": 50,
        "damage": {
            "base": [60,95,130,165,200],
            "additionalMaxHP": 20,
            "amp": 80
        },
        // 氷床地帯上防御力増加（％）
        "defense": [14,17,20,23,26],
        "cooldown": 5
    },
    "R": {
        // 中央ダメージ
        "center_damage": {
            "base": [150,230,310],
            "amp": 60,
            "additionalMaxHP": 12
        },
        // 周辺ダメージ
        "outer_damage": {
            "base": [110,180,250],
            "amp": 40,
            "additionalMaxHP": 8
        },
        "cooldown": [80,70,60]
    },
    "T": {
        // スキル与ダメージ時冷気増加
        "chill": 20,
        // 冷気蓄積中移動速度減少（％）
        "slow": 20,
        // 凍結冷気量
        "frozen": 120,
        // 凍結時気絶時間
        "stun": 1.1,
        // 凍結解除時追加ダメージ
        "damage": {
            "base": [10,30,50],
            "amp": 20,
            "targetMaxHP": [6,8,10]
        },
        // 再凍結免疫時間
        "immune": 2.5,
        "cooldown": {
            "constant": [8,6,4]
        }
    }
}