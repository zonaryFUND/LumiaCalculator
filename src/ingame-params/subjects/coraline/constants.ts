export default {
    "Q": {
        // 通常ダメージ
        "damage": {
            "base": [50,90,130,170,210],
            "amp": 80
        },
        // 白鏡反射ダメージ
        "white_mirror_damage": {
            "base": [60,105,150,195,240],
            "amp": 80,
            "targetHP": [4,6,8,10,12]
        },
        // 白鏡反射的中時移動速度減少
        "white_mirror_slow": {
            "duration": 1.5,
            "effect": 30
        },
        // 黒鏡ダメージ
        "black_mirror_damage": {
            "base": [60,105,150,195,240],
            "amp": 80,
            "targetLostHP": [3,6,9,12,15]
        },
        // 黒鏡反射的中時移動速度減少
        "black_mirror_slow": {
            "duration": 1,
            "effect": 60
        },
        "cooldown": [8,7,6,5,4]
    },
    "W": {
        // 鏡にQEヒット時自己スキル増幅増加
        "amp_gain": {
            "duration": 4,
            "effect": [5,7,9],
            "max_stack": 2
        },
        // 鏡で強化されたQ的中時クールダウン減少
        "cooldown_reduction": [20,25,30],
        "cooldown": 6
    },
    "E": {
        // 通常ダメージ
        "damage": {
            "base": [60,90,120,150,180],
            "amp": 65
        },
        // 通常弾的中時束縛時間
        "bind": 0.8,
        // 白鏡通過後ダメージ
        "white_mirror_damage": {
            "base": [80,110,140,170,200],
            "amp": 65
        },
        // 白鏡通過後束縛時間
        "white_mirror_bind": 0.8,
        // 白鏡通過弾的中時シールド
        "white_mirror_shield": {
            "duration": 2.5,
            "effect": {
                "base": [60,85,110,135,160],
                "amp": 35
            }
        },
        // 黒鏡通過後ダメージ
        "black_mirror_damage": {
            "base": [80,110,140,170,200],
            "amp": 65
        },
        // 黒鏡通過後束縛時間
        "black_mirror_bind": 0.8,
        // 黒鏡通過弾的中対象防御力減少
        "black_mirror_defense_reduction": {
            "duration": 3,
            "effect": [10,11,12,13,14]
        },
        "cooldown": [14,13,12,11,10]
    },
    "R": {
        // 対象指定不可時間
        "untargetable": 0.5,
        // 移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 10
        },
        // 次の基本攻撃強化
        "basic_attack_enhancement": {
            "duration": 4,
            "range": 1,
            "additional_damage": {
                "base": [70,110,150],
                "amp": 35
            }
        },
        // 強化基本攻撃的中時罪の束縛(E)クールダウン減少
        "e_cooldown_reduction": 30,
        // 強化基本攻撃的中時E以外の基本スキルクールダウン減少
        "qw_cooldown_reduction": 60,
        // 的中時クールダウン減少
        "cooldown_reduction": 10,
        "cooldown": [32,29,26]
    },
    "T": {
        // 鏡の断片持続時間
        "duration": 4,
        // 鏡の断片保持対象固定ダメージ
        "damage": {
            "base": [20,40,60,80,100],
            "amp": 12
        }
    }
}