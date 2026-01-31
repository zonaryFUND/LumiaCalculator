export default {
    "Q": {
        // 通常Qダメージ
        "damage": {
            "base": [10,30,50,70,90],
            "attack": 75,
            "basicAttackAmp": 100
        },
        // スタック持続時間
        "stack_duration": 6,
        // スタック獲得時移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": [4,8,12,16,20]
        },
        // スタック最大値
        "max_stack": 2,
        // 強化Q1回目ダメージ
        "Q2_first_damage": {
            "base": [20,40,60,80,100],
            "attack": 80,
            "basicAttackAmp": 100
        },
        // 強化Q2回目ダメージ
        "Q2_second_damage": {
            "base": [30,60,90,120,150],
            "attack": 90,
            "basicAttackAmp": 100
        },
        // 強化Q的中時自己回復
        "heal": {
            "base": [20,35,50,65,80],
            "attack": 35
        },
        // Qクールダウン減少量最大値
        "cooldown_reduction_max": 3.5,
        "cooldown": {
            "constant": 5
        }
    },
    "W": {
        // 1回あたりダメージ
        "damage": {
            "base": [5,15,25,35,45],
            "attack": 20,
            "basicAttackAmp": 100
        },
        // ダメージ発生回数
        "count": 4,
        "cooldown": [18,16.5,15,13.5,12]
    },
    "E": {
        // ワンステップダメージ
        "damage": {
            "base": [30,45,60,75,90],
            "attack": 20
        },
        // ワンステップ持続時間
        "onestep_duration": 7,
        // ツーステップダメージ
        "second_damage": {
            "base": [30,45,60,75,90],
            "attack": 20
        },
        // ツーステップ持続時間
        "twostep_duration": [9,8,7,6,5],
        "cooldown": 0
    },
    "R": {
        // 移動後戻るまでの時間
        "return_time": 0.65,
        // 踊っている間の被ダメージ減少（％）
        "damage_reduction": [40,45,50],
        // 的中1回あたりダメージ
        "one_hit_damage": {
            "base": [100,150,200],
            "attack": 50
        },
        // 2回的中時ダメージ
        "two_hit_damage": {
            "base": [200,300,400],
            "attack": 100
        },
        // 2回的中時気絶時間
        "stun": 0.9,
        // 自己回復
        "heal": {
            "base": [60,90,120],
            // 的中1回あたり回復増加量（％）
            "perHit": [20,30,40],
            // 的中による回復増加効果の最大適用回数
            "maxHit": 4
        },
        // 再使用可能時間
        "duration": 12,
        // 再使用可能回数
        "reuse": 2,       
        "cooldown": [80,60,40]
    },
    "T": {
        // シールド持続時間
        "duration": 3,
        "shield": {
            "base": [50,100,150],
            "attack": 80
        },
        // 起動時攻撃速度増加量
        "attack_speed": [15,25,35],
        // 基本攻撃/スキル交互命中時W/Tクールダウン減少（秒）
        "wt_cooldown_reduction": 3,
        "cooldown": {
            "constant": [20,18,16]
        }
    }
}