export default {
    "Q": {
        "damage": {
            "base": [30, 55, 80, 105, 130],
            "attack": 100
        },
        // 再使用可能時間
        "time_bound": 2,
        // 的中時クールダウン減少
        "cooldown_reduction": 40,
        "cooldown": 5
    },
    "W": {
        "damage": {
            "base": [30, 60, 90, 120, 150],
            "attack": 80
        },
        // 追加デバフ効果時間
        "duration": 3,
        // 防御力減少
        "defense_down": [11, 12, 13, 14, 15],
        // 治癒減少（％）
        "healing_reduction": 20,
        // 使用中移動速度増加（％）
        "movement_speed": 150,
        // 的中時クールダウン減少
        "cooldown_reduction": 40,
        "cooldown": 6
    },
    "E": {
        "damage": {
            "base": [30, 50, 70, 90, 110],
            "attack": 50
        },
        // 気絶時間
        "stun": 0.5,
        "cooldown": [18, 17, 16, 15, 14]
    },
    "R": {
        // 爆弾持続時間
        "duration": 3,
        // 爆弾付着時移動速度減少（％）
        "slow": 30,
        "damage": {
            "base": [60, 120, 180],
            "attack": 50
        },
        // 爆弾即起爆に必要な基本攻撃回数
        "basic_attack_launch": 5,
        // 爆弾即起爆時の追加固定ダメージ（対象最大体力比％）
        "additional_damage": [6, 9, 12],
        // 即起爆時移動速度減少（％）
        "detonate_slow": {
            "duration": 1,
            "effect": 30
        },
        // スキルをヒットさせた時の即起爆のカウント進行数
        "skill_hit": 2,
        // 即起爆時クールダウン減少
        "cooldown_reduction": 50,
        // 即起爆時移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": 30
        },
        "cooldown": 25
    },
    "T": {
        // ダブルショット効果時間
        "duration": 4,
        // ダブルショット1発目ダメージ
        "first_damage": {
            "attack": 60,
            "basicAttackAmp": 100
        },
        // ダブルショット2発目ダメージ
        "second_damage": {
            "attack": [50, 55, 60],
            "basicAttackAmp": 100
        },
        "attack": {
            // チョコレートが含まれるアイテムを使用したときのバフ効果時間
            "duration_min": 10,
            // チョコレートが含まれるアイテムを使用したときの攻撃力増加
            "effect": 1
        }
    }
}