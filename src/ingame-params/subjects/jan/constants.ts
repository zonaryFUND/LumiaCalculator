export default {
    "Q": {
        // ニーストライクダメージ
        "damage": {
            "base": [100, 120, 140, 160, 180],
            "additionalAttack": 65,
            "amp": 55,
            "targetMaxHP": 6
        },
        // ニーストライク的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 50
        },
        // ニーストライク強化時防御力減少
        "defense_reduction": {
            "duration": 4,
            "effect": 15
        },
        // リッピング・ニーストライクダメージ
        "Q2_damage": {
            "base": [65, 90, 115, 140, 165],
            "additionalAttack": 90,
            "amp": 70,
            "targetMaxHP": 6
        },
        // リッピング・ニーストライクのエアボーン時間
        "airborne": 0.65,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "W": {
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "additionalAttack": 65,
            "amp": 85
        },
        // 壁ヒット時気絶時間
        "stun": 0.8,
        // 強化ダメージ
        "enhanced_damage": {
            "base": [80, 115, 150, 185, 220],
            "additionalAttack": 95,
            "amp": 100
        },
        // 壁ヒット時追加ダメージ
        "wall_damage": {
            "base": [20, 30, 40, 50, 60],
            "additionalAttack": 20,
            "amp": 15
        },
        // 強化かつ壁ヒット時気絶時間
        "enhanced_stun": 0.8,
        "cooldown": 15
    },
    "E": {
        // 次の基本攻撃追加ダメージ
        "damage": {
            "base": [15, 25, 35, 45, 55],
            "additionalAttack": 100,
            "amp": 45,
            "targetMaxHP": 5
        },
        // 強化基本攻撃的中時回復量
        "heal": {
            // 最小値（追加与ダメージ比）
            "min": 50,
            // 最大値（追加与ダメージ比）
            "max": 100,
            // 回復量が最大になる自己体力（％）
            "max_threshold_hp": 40
        },
        // 強化時クールダウン減少（％）
        "cooldown_reduction": 40,
        "cooldown": [10, 9.5, 9, 8.5, 8]
    },
    "R": {
        // リング持続時間
        "duration": 6.5,
        // リングロープ衝突ダメージ
        "damage": {
            "base": [100, 200, 300],
            "additionalAttack": 80,
            "amp": 45
        },
        // リングロープ衝突時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // リング上で敵キル関与時に獲得する熱血の意志スタック数
        "kill_stack": 5,
        // リング上で敵キル関与時の移動速度増加
        "movement_speed": {
            "duration": 3,
            "effect": 45
        },
        "cooldown": [60, 50, 40]
    },
    "T": {
        // スキル強化に必要な熱血の意志スタック数
        "threshold": 5,
        // 強化スキル使用時基本スキルクールダウン減少（％）
        "cooldown_reduction": [10, 20, 30]
    }
}