export default {
    "Q": {
        // ガラス破片破壊時チャージ時間減少（％）
        "collect_charge": 80,
        // ガラス刃ダメージ
        "damage": {
            "base": [30, 60, 90, 120, 150],
            "amp": 40
        },
        // スパーダ（強化Q、ガラス剣）ダメージ
        "spada_damage": {
            "base": [30, 60, 90, 120, 150],
            "amp": 50
        },
        // ガラス剣爆発までの移動距離
        "spada_range": 2,
        // ガラス剣爆発ダメージ
        "spada_blast_damage": {
            "base": [40, 70, 100, 130, 160],
            "amp": 55
        },
        // ガラス片持続時間
        "glass_duration": 7,
        // ガラス剣によるノックバック免疫時間
        "knockback_immune": 8,
        "cooldown": {
            "constant": 0.75
        },
        "charge": {
            "time": [10, 9.5, 9, 8.5, 8],
            "max": 4
        }
    },
    "W": {
        // ガラス壁持続時間
        "duration": 3,
        // ガラス壁接触時気絶時間
        "stun": [1, 1.05, 1.1, 1.15, 1.2],
        "damage": {
            "base": [50, 85, 120, 155, 190],
            "amp": 55
        },
        "cooldown": [20, 19, 18, 17, 16]
    },
    "E": {
        // シールド持続時間
        "shield_duration": 2.5,
        // シールド量基礎値
        "shield": {
            "base": [40, 60, 80, 100, 120],
            "amp": 35
        },
        // ダメージ基礎値
        "damage": {
            "base": [60, 90, 120, 150, 180],
            "amp": 45
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 40
        },
        // 再使用可能時間
        "reuse": 4,
        // ガラス片複数回収時の1つあたりダメージ・シールド増加（％）
        "glass_additional_damage": 10,
        // ガラス片複数回収時の最大ダメージ・シールド増加（％）
        "glass_additional_max": 50,
        "cooldown": [13, 12, 11, 10, 9]
    },
    "R": {
        // 大剣持続時間
        "duration": 6,
        // 大剣によるガラス片破壊範囲
        "range": 3,
        // 大剣範囲内移動速度減少（％）
        "slow": 30,
        // 大剣着地時ダメージ
        "damage": {
            "base": [70, 120, 170],
            "amp": 45
        },
        // 大剣着地的中時移動速度減少
        "hit_slow": {
            "duration": 1,
            "effect": 60
        },
        // 大剣作成後能動的に破壊できるまでの時間
        "break_threshold": 1,
        // 大剣破壊時の爆発範囲
        "blast_range": 3,
        // 大剣破壊時の爆発ダメージ
        "blast_damage": {
            "base": [90, 180, 270],
            "amp": 60
        },
        // 大剣着地時に破壊したガラス片1つあたり大剣破壊時のガラス片ダメージ増加（％）
        "glass_additional_damage": 30,
        // 大剣着地時に破壊したガラス片による大剣破壊時のガラス片ダメージ増加最大値（％）
        "glass_additional_max": 120,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // ガラス塊持続時間
        "collection_duration": 6,
        // ガラス塊最大数
        "collection_max": 4,
        // ディフェットーゾ基本攻撃追加ダメージ
        "damage": {
            "base": [40, 70, 100],
            "amp": 35
        },
        "cooldown": {
            "constant": [10, 8, 6]
        }
    }
}