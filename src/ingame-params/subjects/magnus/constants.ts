export default {
    "Q": {
        "damage": {
            "base": [80, 125, 170, 215, 260],
            "additionalAttack": 115,
            "amp": 95
        },
        // 移動速度減少
        "slow": {
            "duration": 2,
            "effect": [40, 45, 50, 55, 60]
        },
        "cooldown": [11, 10, 9, 8, 7]
    },
    "W": {
        // 持続時間
        "duration": 4,
        // 攻撃回数を1回増やすのに必要な追加防御力
        "additional_hit_per__additional_defense": 35,
        // 1ヒットあたりダメージ
        "damage": {
            "base": [16, 22, 28, 34, 40],
            "additionalAttack": 50,
            "amp": 18,
            "targetMaxHP": 2.5
        },
        // 攻撃回数基礎値
        "count": 11,
        // 1ヒットあたりクールダウン減少
        "cooldown_reduction": 0.5,
        // 効果中妨害耐性増加（％）
        "tenacity": 40,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        // 突き飛ばしダメージ
        "damage": {
            "base": [40, 75, 110, 145, 180],
            "additionalAttack": 50,
            "amp": 50,
            "targetMaxHP": 8
        },
        // 壁ヒット時追加ダメージ
        "wall_damage": {
            "base": [20, 40, 60, 80, 100],
            "additionalAttack": 30,
            "amp": 20,
            "targetMaxHP": 6
        },
        // 突き飛ばし距離
        "knockback": 3,
        // 壁ヒット時気絶時間
        "stun": [0.7, 0.85, 1, 1.15, 1.3],
        "cooldown": [11, 10, 9, 8, 7]
    },
    "R": {
        // 持続時間
        "duration": 7,
        // 発動時Tスタック獲得数
        "stack_gain": [4, 7, 10],
        // 移動速度が最大になるまでの発動からの時間（秒）
        "max_speed": 2,
        "damage": {
            "base": [100, 250, 400],
            "additionalAttack": 150,
            "amp": 90,
            "targetHP": 30
        },
        "cooldown": [80, 65, 50]
    },
    "T": {
        // 基本攻撃的中時根性スタック獲得数
        "basic_attack_hit_stack": 1,
        // スキル的中時根性スタック獲得数
        "skill_hit_stack": 2,
        // 根性スタック1あたり防御力増加
        "defense": [2, 2.5, 3],
        // 根性スタック最大数
        "max_stack": 10,
        // 根性スタック最大時追加体力再生
        "hpRegen": [3, 4, 5]
    }
}