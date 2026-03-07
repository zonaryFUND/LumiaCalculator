export default {
    "Q": {
        // 最大チャージに達するまでの時間
        "cast": 2,
        // チャージ中移動速度減少ペナルティ（％）
        "movement_speed_penalty": 20,
        // チャージによって増加する射程・威力の最大倍率
        "max_range": 2,
        // 最小ダメージ
        "min_damage": {
            "base": [60, 95, 130, 165, 200],
            "additionalAttack": 110,
            "amp": 65,
            "stack": 1
        },
        // 最大ダメージ
        "max_damage": {
            "base": [120, 190, 260, 330, 400],
            "additionalAttack": 220,
            "amp": 130,
            "stack": 1
        },
        // 発動キャンセル時クールダウン返還（％） 
        "payback": 50,
        "cooldown": 7
    },
    "W": {
        // 2回目使用可能時間
        "second_time_bound": 5,
        // リス罠ダメージ
        "damage": {
            "base": [80, 120, 160, 200, 240],
            "additionalAttack": 100,
            "amp": 80
        },
        // 移動速度減少（％）
        "movement_speed": [30, 35, 40, 45, 50],
        // 攻撃速度減少（％）
        "attack_speed": 30,
        // 視界提供時間
        "vision": 5,
        // 複数のリス罠を連続で踏んだときのダメージ（元ダメージ比％）
        "multiple_stepped_multipler": 30,
        // リス罠持続時間
        "duration": 45,
        // リス罠最大設置数
        "max_trap": 3,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "E": {
        // ワイヤー持続時間
        "duration": 6,
        // ワイヤー維持範囲
        "wire_length": 11,
        // 攻撃速度上昇
        "attack_speed": {
            "base": [30, 35, 40, 45, 50],
            "amp": 5
        },
        // 再使用後攻撃速度上昇持続時間
        "remain": 3,
        "cooldown": [17, 16, 15, 14, 13]
    },
    "R": {
        // 持続時間
        "duration": 10,
        // 基本攻撃追加ダメージ発生周期
        "count": 3,
        "damage": {
            "base": [100, 150, 200],
            "additionalAttack": 75,
            "amp": 80,
            "stack": 1
        },
        // 攻撃速度減少（％）
        "attack_speed": 10,
        // 移動速度減少（％）
        "movement_speed": 30,
        // キル関与時持続時間延長
        "extend": 3,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 野生スタック最大値
        "max_stack": 250,
        // ニワトリ処置時獲得スタック
        "chicken": [1, 1, 2],
        // コウモリ・イノシシ処置時獲得スタック
        "bat_boar": [2, 3, 4],
        // ハウンド処置時獲得スタック
        "hound_wolf": [3, 4, 5],
        // クマ処置時獲得スタック
        "bear": [5, 6, 7],
        // 敵実験体処置時獲得スタック
        "subject": [6, 8, 10]
    }
}