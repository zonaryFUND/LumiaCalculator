export default {
    "Q": {
        // 爆弾が床に落ちた時の爆発までの時間
        "duration": 3,
        // 爆発基礎ダメージ
        "damage": {
            "base": [60, 85, 110, 135, 160],
            "attack": 25,
            "amp": 70
        },
        // 束縛時間基礎値
        "bind": 0.6,
        // 爆弾が敵に付着したときの爆発までの時間
        "duration_enemy": 6,
        // 爆弾が付いた敵に攻撃ごとの爆発までの時間減少
        "duration_reduction": 0.5,
        // 爆弾が付いた敵に攻撃ごとの爆発時追加ダメージ
        "additional_damage": {
            "base": [10, 15, 20, 25, 30],
            "attack": 7,
            "amp": 4
        },
        // 爆弾が付いた敵に攻撃ごとの爆発時束縛時間増加
        "additional_bind": 0.1,
        // 爆発時束縛時間最大値
        "bind_max": 1,
        "cooldown": [11, 10, 9, 8, 7]
    },
    "W": {
        // 攻撃持続時間
        "duration": 1.67,
        // ダメージ発生周期
        "tick": 0.33,
        // 1ティックあたりダメージ
        "damage": {
            "base": [13, 16, 19, 22, 25],
            "attack": 60,
            "amp": 24
        },
        // 1スタックあたり防御力減少
        "defense_decline": [2, 2, 3, 3, 4],
        // 防御力減少時間
        "defense_decline_duration": 4,
        // 防御力減少最大スタック数
        "defense_decline_max": 6,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "E": {
        // 隠密状態時間
        "hide_duration": [1.2, 1.4, 1.6, 1.8, 2],
        // 次の基本攻撃強化効果持続時間
        "attack_duration": 5,
        // 次の基本攻撃追加ダメージ
        "damage": {
            "base": [40, 65, 90, 115, 140],
            "amp": 65
        },
        "cooldown": [15, 14, 13, 12, 11]
    },
    "R": {
        // 地雷持続時間
        "lifetime": 45,
        "damage": {
            "base": [100, 200, 300],
            "attack": 40,
            "amp": 65,
            "targetHP": 12
        },
        "charge": {
            "time": [30, 22, 14],
            "max": 2
        },
        // 地雷設置最大数
        "max_place": 2
    },
    "T": {
        // 持続時間
        "duration": 10,
        // 攻撃力増加量
        "attack": [8, 13, 18],
        // スキル増幅増加量
        "amp": [16, 26, 36]
    }
}