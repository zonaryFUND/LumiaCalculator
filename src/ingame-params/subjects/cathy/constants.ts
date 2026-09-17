export default {
    "Q": {
        // スキル使用後基本攻撃追加ダメージ
        "additional_damage": {
            "amp": 50
        },
        // Ｑ突進ダメージ
        "damage": {
            "base": [90,120,150,180,210],
            "amp": 80
        },
        // 致命的外傷付与時クールダウン減少（％）
        "cooldown_reduction": [50,55,60,65,70],
        // 強化基本攻撃キャスト高速化発生攻撃速度しきい値
        "cast_acceleration_attack_speed": 1,
        // 双剣使用時強化基本攻撃の基本攻撃部分ダメージ攻撃力レシオ
        "dual_sword": 110,
        "cooldown": 15
    },
    "W": {
        // 内側ダメージ
        "inner_damage": {
            "base": [30,55,80,105,130],
            "amp": 70
        },
        // 外側ダメージ
        "outer_damage": {
            "base": [50,100,150,200,250],
            "amp": 90
        },
        // 外側的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 40
        },
        "cooldown": [12,11.5,11,10.5,10]
    },
    "E": {
        "damage": {
            "base": [50,60,70,80,90],
            "amp": 45
        },
        // 束縛時間
        "bind": 0.7,
        // 敵複数または壁的中時気絶時間
        "stun": 0.9,
        // 敵複数または壁的中時追加ダメージ
        "knockback_damage": {
            "base": [30,50,70,90,110],
            "amp": 50
        },
        "cooldown": [15,14,13,12,11]
    },
    "R": {
        // 味方蘇生時/R使用時回復エリア持続時間
        "heal_duration": 4,
        // 回復エリア秒間回復量
        "heal": {
            "targetMaxHP": 4,
            "amp": 3
        },
        // 最小ダメージ
        "min_damage": {
            "base": [100,160,220],
            "amp": 70
        },
        // 対象の失った体力比例ダメージ増幅倍率の最大値
        "max_damage_ratio": 2,
        // ダメージ増幅倍率が最大になる対象の現在体力割合
        "max_damage_target_hp": 30,
        "cooldown": [80,70,60]
    },
    "T": {
        // 外傷状態持続時間
        "wound_duration": 4,
        // 外傷状態1スタックあたりダメージ総量
        "wound": {
            "amp": 25
        },
        // 外傷が致命的外傷に変化するスタック数
        "max_stack": 3,
        // 致命的外傷状態ダメージ総量
        "critical_wound": {
            "targetMaxHP": 6,
            "amp": 25
        },
        // 致命的外傷状態の治癒効果減少（％）
        "healing_reduction": 30,
        // 致命的外傷状態付与時自己シールド持続時間
        "shield_duration": 2,
        // 致命的外傷状態付与時自己シールド
        "shield": {
            "base": [70,120,170],
            "amp": 45
        },
        // 外傷/致命的外傷状態の敵へ向かって移動するときの移動速度増加（％）
        "movement_speed": [5,10,15],
        "cooldown": {
            "constant": 16
        }
    }
}