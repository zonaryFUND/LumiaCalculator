export default {
    "Q": {
        "damage": {
            "base": [40, 65, 90, 115, 140],
            "amp": 60
        },
        // 移動妨害効果中の対象に的中したときの追加固定ダメージ
        "additional_damage": {
            "base": 10,
            "level": 1
        },
        // 再使用可能時間
        "reuse": 3,
        // 再使用ダメージ
        "reuse_damage": {
            "base": [60, 85, 110, 135, 160],
            "amp": 70,
            "targetMaxHP": 5
        },
        // 可能時間中の対象に再使用弾丸が的中したときの追加固定ダメージ
        "reuse_additional_damage": {
            "base": 20,
            "level": 2
        },
        // 複数対象的中時に最初の対象以外へのダメージ（元ダメージ比％）
        "second_hit_multiplier": 70,
        "cooldown": [9, 8, 7, 6, 5]
    },
    "W": {
        // 持続時間
        "duration": 4,
        // ダメージ発生周期
        "tick": 0.5,
        // 1ティックあたりダメージ
        "damage": {
            "base": [8, 16, 24, 32, 40],
            "amp": 20,
            "targetMaxHP": [1, 1, 2, 2, 3]
        },
        // 範囲内移動速度減少
        "slow": 25,
        // ダメージティック発生時のクールダウン減少（％）
        "cooldown_reduction": 5,
        // Eで範囲内に移動したときの持続時間延長
        "e_extend": 1,
        "cooldown": 11
    },
    "E": {
        // 詠唱時間
        "channeling": 0.7,
        // W範囲内へ移動したときの束縛時間
        "bind": 0.8,
        // W範囲内へ移動したときの範囲内ダメージ
        "damage": {
            "base": [40, 80, 120, 160, 200],
            "amp": 60
        },
        // W範囲内へ移動したときに敵にダメージを与えた場合の移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 40
        },
        // Qクールダウン減少（％）
        "q_cooldown_reduction": 40,
        // Wクールダウン減少（％）
        "w_cooldown_reduction": 20,
        "cooldown": [12, 11.5, 11, 10.5, 10]
    },
    "R": {
        // 妨害効果免疫時間
        "cc_immune": 1.5,
        // エリア生成時ダメージ
        "damage": {
            "base": [100, 140, 180],
            "amp": 45
        },
        "shield": {
            "base": [50, 100, 150],
            "amp": 40,
            "maxHP": 10
        },
        // 敵の投射身体速度減少（％）
        "bullet_slow": 90,
        // 範囲内の敵移動速度減少
        "slow": 40,
        // エリア爆発時ダメージ
        "finish_damage": {
            "base": [150, 250, 350],
            "amp": 100
        },
        // エリア爆発時気絶時間
        "stun": 0.8,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // タイマー付着の基準となる時間範囲（秒）
        "time_bound": 2.5,
        // タイマー付着のために必要な敵体力減少（％）
        "threshold": 35,
        // タイマー付着後起動までの時間（秒）
        "timer": 2,
        // タイマー起動ダメージ
        "damage": {
            "base": [40, 70, 100],
            "amp": 30,
            "targetLostHP": [8, 10, 12]
        },
        // タイマーが付着したが起動せず敵が死亡した場合のクールダウン返還（％）
        "unexploded_cooldown_reduction": 80,
        "cooldown": [12, 10, 8]
    }
}