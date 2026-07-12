export default {
    "DebiQ": {
        "damage": {
            "base": [50,75,100,125,150],
            "additionalAttack": 85
        },
        // 1スタックあたり攻撃速度増加
        "attack_speed": {
            "duration": 5,
            "effect": [8,9,10,11,12]
        },
        // 最大スタック数
        "max_stack": 4,
        "cooldown": 4
    },
    "DebiW": {
        "damage": {
            "base": [40,70,100,130,160],
            "additionalAttack": 60,
            "targetMaxHP": [5,5.5,6,6.5,7]
        },
        "cooldown": 12
    },
    "E": {
        // 交代時移動速度増加
        "movement_speed": {
            "duration": 1.5,
            "effect": 30
        }
    },
    "DebiE": {
        // マーリンエネルギーダメージ
        "damage": {
            "base": [30,65,100,135,170],
            "additionalAttack": 70
        },
        // マーリンエネルギー爆発までの時間（秒）
        "slow_after": 1.5,
        // マーリンエネルギー爆発時移動速度減少
        "slow": {
            "duration": 0.75,
            "effect": 40
        },
        // デビー待機時間
        "debi_remain": 5, 
        // デビー突進ダメージ
        "second_damage": {
            "base": [30,70,110,150,190],
            "additionalAttack": 70
        },
        // デビー的中時エアボーン時間
        "airborne": 0.5,
        "cooldown": {
            "constant": [15,14,13,12,11]
        }
    },
    "MarleneQ": {
        "damage": {
            "base": [50,75,100,125,150],
            "additionalAttack": 70
        },
        // 1スタックあたり攻撃速度増加
        "attack_speed": {
            "duration": 5,
            "effect": [8,9,10,11,12]
        },
        // 最大スタック数
        "max_stack": 4,
        "cooldown": 4.5
    },
    "MarleneW": {
        // 弾丸数基礎値
        "projectiles": {
            "base": [5,6,7,8,9]
        },
        // 弾丸1つあたりダメージ
        "damage": {
            "base": [15,30,45,60,75],
            "additionalAttack": 50
        },
        // T1スタック追加に必要な弾丸数
        "t_stack_projectiles": 2,
        // 複数回的中時ダメージ倍率（％）
        "multiple_hit": 25,
        // 追加攻撃速度比例追加弾丸数最大値
        "max_projectile": 7,
        "cooldown": 11
    },
    "MarleneE": {
        // デビー突進ダメージ
        "damage": {
            "base": [30,70,110,150,190],
            "additionalAttack": 70
        },
        // デビー的中時エアボーン時間
        "airborne": 0.5,
        // マーリン待機時間
        "marlene_remain": 5,
        // マーリン爆発ダメージ
        "second_damage": {
            "base": [30,65,100,135,170],
            "additionalAttack": 70
        },
        // マーリンエネルギー爆発までの時間（秒）
        "slow_after": 1.5,
        // マーリンエネルギー爆発時移動速度減少
        "slow": {
            "duration": 0.75,
            "effect": 20
        },
        "cooldown": {
            "constant": [17,15.5,14,12.5,11]
        }
    },
    "R": {
        // 経路上初回ダメージ
        "damage": {
            "base": [100,200,300],
            "additionalAttack": 100
        },
        // 追加固定ダメージ回数
        "second_damage_count": 5,
        // 追加固定ダメージ1回あたり
        "second_damage": {
            "base": [5,10,15],
            "additionalAttack": 15
        },
        "cooldown": [80,70,60]
    },
    "T": {
        // デビー時防御力増加
        "debi_defense": [5,10,15],
        // マーリン時基本攻撃射程増加
        "marlene_range": 4,
        // 基本攻撃ダメージ
        "basic_attack_damage": {
            "attack": 90,
            "basicAttackAmp": 100
        },
        // Blue＆Red最大スタック数
        "max_stack": 5,
        // Blue＆Red色替え1スタックあたりダメージ
        "damage": {
            "base": [15,20,25],
            "additionalAttack": 75,
            "criticalChance": 50
        },
        // Blue＆Red色替え1スタックあたり移動速度増加
        "movement_speed": {
            "duration": 3,
            "effect": [1,2,3]
        },
        // 移動速度増加スタック最大値
        "max_ms_stack": 5,
        // Blue＆Red付与時Eクールダウン減少（秒）
        "e_cooldown_reduction": 0.5,
        // Blue＆Red色替え時Eクールダウン追加減少（秒）
        "color_change_e_cdr": 1,
        // ステータス変換比率　致命打ダメージ量→致命打確率
        "critical_damage_to_chance": 1
    }
}