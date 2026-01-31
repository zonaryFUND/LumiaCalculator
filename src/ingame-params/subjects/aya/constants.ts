export default {
    "Q": {
        // 1発目の弾丸基本攻撃ダメージ
        "first_damage": {
            "attack": 100,
            "basicAttackAmp": 100
        },
        // 2発目の弾丸スキルダメージ
        "second_damage": {
            "base": [40,70,100,130,160],
            "attack": 30,
            "amp": 70
        },
        // 攻撃速度増加
        "attack_speed": {
            "duration": 5,
            "effect": [40,45,50,55,60]
        },
        // キャスト時間・投射体速度増加が発生する攻撃速度しきい値
        "threshold": 1,
        "cooldown": [10,9,8,7,6]
    },
    "W": {
        // 銃発射持続時間
        "duration": 1.8,
        // 弾丸数最小値
        "bullets": 6,
        // 弾丸1個当たりダメージ
        "damage": {
            "base": [20,30,40,50,60],
            "attack": 50,
            "amp": [28,33,38,43,48]
        },
        // 弾丸が1発増加するのに必要な追加攻撃速度（％）
        "per_as": 20,
        // 弾丸数最大値
        "max_bullets": 10,
        "cooldown": [10,9,8,7,6]
    },
    "E": {
        // Q、Wクールダウン減少量（）
        "cooldown_reduction": [30,35,40,45,50],
        "cooldown": [15,14,13,12,11]
    },
    "R": {
        "damage": {
            "base": [120,240,360],
            "attack": 20,
            "amp": 95
        },
        // 恐怖時間
        "fear": 1.25,
        "cooldown": [80,65,50]
    },
    "T": {
        // 被攻撃時シールド持続時間
        "duration": 1.5,
        // 被攻撃時シールド
        "shield": {
            "base": [50,75,100],
            "attack": 50,
            "amp": 35
        },
        // 攻撃1回あたりTクールダウン減少量（秒）
        "cooldown_reduction": 1,
        "cooldown": {
            "constant": 25
        }
    }
}