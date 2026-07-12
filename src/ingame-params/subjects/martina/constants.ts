export default {
    // 取材中Q
    "Q": {
        "damage": {
            "base": [60, 75, 90, 105, 120],
            "attack": 70
        },
        // 的中時クールダウン減少
        "cooldown_reduction": 35,
        // 刻印消耗時移動速度増加
        "movement_speed": {
            "duration": [1.8, 1.9, 2, 2.1, 2.2],
            "effect": [15, 20, 25, 30, 35]
        },
        "cooldown": [7, 6.5, 6, 5.5, 5]
    },
    // 放送中Q
    "Q2": {
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "attack": 90
        },
        // 的中時クールダウン減少
        "cooldown_reduction": 30,
        // 刻印消耗時移動速度増加
        "movement_speed": {
            "duration": [1.8, 1.9, 2, 2.1, 2.2],
            "effect": [15, 20, 25, 30, 35]
        },
        // 刻印消耗時攻撃速度増加
        "attack_speed": {
            "duration": 3,
            "effect": [30, 35, 40, 45, 50]
        },
        "cooldown": [7, 6.5, 6, 5.5, 5]
    },
    // 取材中W
    "W": {
        // 小型カメラ持続時間
        "duration": 12,
        // 小型カメラによる撮影ダメージ
        "damage": {
            "base": [90, 120, 150, 180, 210],
            "attack": 70
        },
        // 移動速度減少
        "slow": {
            "duration": 1,
            "effect": 99
        },
        // 小型カメラ最大設置数
        "max_set": 2,
        "cooldown": {
            "constant": 1
        },
        "charge": {
            "time": [14, 13, 12, 11, 10],
            "max": 2
        }
    },
    // 放送中W
    "W2": {
        // 小型カメラ持続時間
        "duration": 12,
        // 小型カメラによる撮影ダメージ
        "damage": {
            "base": [110, 140, 170, 200, 230],
            "attack": 85
        },
        // 束縛時間
        "bind": 1.2,
        // 小型カメラ最大設置数
        "max_set": 3,
        "cooldown": {
            "constant": 1
        },
        "charge": {
            "time": [14, 13, 12, 11, 10],
            "max": 3
        }
    },
    // 取材中E
    "E": {
        // 早戻し状態持続時間
        "duration": 7,
        // 移動速度増加（％）
        "movement_speed": 15,
        // 戻るときの的中時移動速度減少
        "slow": {
            "duration": 1,
            "effect": 15
        },
        "cooldown": [17, 16, 15, 14, 13]
    },
    // 放送中E
    "E2": {
        // 早戻し状態持続時間
        "duration": 5,
        // 移動速度増加（％）
        "movement_speed": 15,
        // 戻るときの的中時ダメージ
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "attack": 40
        },
        // 戻るときの的中時気絶時間
        "stun": 1,
        // 早戻し状態で受けたダメージに対する回復（％）
        "heal": [40, 45, 50, 55, 60],
        "cooldown": [22, 20, 18, 16, 14]
    },
    // 取材中R
    "R": {
        // 撮影時間
        "duration": 4,
        // 撮影時の移動速度増加（％）
        "recording_movement_speed": 15,
        // 撮影成功時の移動速度増加
        "recorded_movement_speed": {
            "duration": 3,
            "effect": 50
        },
        // 最大録画スタック数
        "max_stack": 5,
        // 2つ以上の撮影対象録画に要する時間
        "multiple_subject_recording_time": 1,
        // 2つ以上の撮影対象録画成功時の獲得武器熟練度
        "multiple_subject_mastery": 1300,
        // 死体録画に要する時間
        "dead_body_recording_time": 2,
        // 死体録画成功時の獲得武器熟練度
        "dead_body_mastery": 650,
        // 死体録画のみによって得られる最大スタック数
        "max_dead_body_stack": 5,
        // 同一撮影対象の再撮影禁止時間
        "reshooting_prohibit": 30,
        "cooldown": [20, 15, 1]
    },
    // 放送中R
    "R2": {
        // 連続撮影ダメージ発生回数
        "count": 8,
        // 防御力減少（％）
        "defense_reduction": 15,
        // 撮影時間
        "duration": 1.5,
        // 連続撮影の1ティックあたり外郭ダメージ
        "first_outer_damage": {
            "base": [10, 15, 20],
            "attack": 15
        },
        // 連続撮影の1ティックあたり中心ダメージ
        "first_center_damage": {
            "base": [20, 25, 30],
            "attack": 20
        },
        // 撮影終了時の外郭ダメージ
        "second_outer_damage": {
            "base": [100, 200, 300],
            "attack": 90
        },
        // 撮影終了時の中心ダメージ
        "second_center_damage": {
            "base": [200, 325, 450],
            "attack": 130
        },
        // 撮影終了時の中心の対象への気絶時間
        "stun": 0.7,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 撮影中基本攻撃1ティックあたりダメージ
        "damage": {
            "attack": 20,
            "basicAttackAmp": 100
        },
        // 基本攻撃充電時間
        "battery_charge": 0.5,
        // 攻撃速度を攻撃力へ変換する割合
        "attack_speed_conversion": {
            // 変換元攻撃速度上昇（％）
            "from": 1,
            // 変換先攻撃力上昇（％）
            "to": 0.2
        },
        // 撮影中の敵交戦ピン表示範囲
        "engagement_ping_range": 40,
        // 刻印付与に必要な基本攻撃ティック数
        "mark_threshold": 4,
        // 撮影中刻印消耗時追加ダメージ
        "mark_damage": {
            "base": 50,
            "attack": [55, 65, 75]
        },
        // 放送中基本攻撃1ティックあたりダメージ
        "broadcasting_damage": {
            "attack": 55,
            "basicAttackAmp": 100
        },
        // 放送中刻印消耗時追加ダメージ
        "broadcasting_mark_damage": {
            "base": 70,
            "attack": [70, 85, 100]
        }
    }
}