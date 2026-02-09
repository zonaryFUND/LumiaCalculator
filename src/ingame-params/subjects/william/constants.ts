export default {
    "common": {
        // ボール持続時間
        "ball_duration": 4
    },
    "Q": {
        // 持続時間
        "duration": 5,
        // 攻撃速度増加
        "attack_speed": [60, 70, 80, 90, 100],
        // 効果時間中基本攻撃ダメージ
        "damage": {
            "attack": [103, 106, 109, 112, 115],
            "basicAttackAmp": 100
        },
        // ボール拾得時持続時間延長
        "extend_duration": 1,
        "cooldown": 5
    },
    "W": {
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "attack": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 30
        },
        // 往復ヒット時気絶時間
        "stun": 1,
        // マウンド持続時間
        "mound_duration": 5,
        // マウンド上での防御力増加
        "defense": [10, 13, 16, 19, 22],
        "cooldown": 14
    },
    "E": {
        // ボールの方向へ移動する時の移動速度増加
        "movement_speed": [14, 17, 20, 23, 26],
        "cooldown": 0
    },
    "R": {
        "damage": {
            "base": [150, 250, 350],
            "attack": 50
        },
        // 周辺的中時移動速度減少
        "slow": {
            "duration": 2,
            "effect": 40
        },
        // 中央的中時移動速度減少
        "slow_center": {
            "duration": 2,
            "effect": 60
        },
        "cooldown": [60, 50, 40]
    },
    "T": {
        // 基本攻撃時ボール出現クールダウン
        "cooldown": {
            "constant": 1.5
        },
        // ボール拾得後の次の基本攻撃射程増加
        "range": {
            "duration": 5,
            "effect": 0.5
        },
        // ボール拾得後の次の基本攻撃ダメージ
        "damage": {
            "attack": [110, 117, 124],
            "basicAttackAmp": 100
        },
        // キャッチボールスタック持続時間
        "duration": 10
    }
}