export default {
    "Q": {
        "damage": {
            "base": [30, 50, 70, 90, 110],
            "attack": 55,
            "targetHP": 5
        },
        // 与ダメージ比自己回復（％）
        "heal": 30,
        // 出血スタック最大の対象に対する追加ダメージ（％）
        "max_stack_target_additional_damage": 30,
        // 再使用可能時間
        "reuse": 3,
        "cooldown": [12, 11, 10, 9, 8]
    },
    "W": {
        "damage": {
            "base": [10, 20, 30, 40, 50],
            "additionalAttack": [20, 30, 40, 50, 60]
        },
        // 移動速度減少
        "slow": {
            "duration": 0.85,
            "effect": [60, 65, 70, 75, 80]
        },
        // 双剣装備時の強化基本攻撃基礎ダメージ攻撃力レシオ
        "dualsword_attack_ratio": 120,
        "cooldown": 6
    },
    "E": {
        // 出血スタック最大の対象に対する基本攻撃時クールダウン減少
        "max_stack_cooldown_reduction": 0.5,
        "damage": {
            "base": [50, 90, 130, 170, 210],
            "attack": 80
        },
        "cooldown": [16, 15, 14, 13, 12]
    },
    "R": {
        // チェーンソー持続時間
        "duration": [8, 9, 10],
        // 効果中移動速度増加
        "movement_speed": [8, 10, 12],
        // 効果中攻撃速度増加
        "attack_speed": [20, 30, 40],
        // キル関与時持続時間延長
        "extend": 5,
        // 再使用時ダメージ基礎値
        "damage": {
            "base": [50, 125, 200],
            "attack": 40
        },
        // 再使用時ダメージ最大値
        "finish_multiplier_max": 2,
        // 再使用時ダメージが最大になる対象体力（％）
        "finish_multiplier_max_hp": 30,
        // 再使用時与ダメージ比自己回復（％）
        "heal": 25,
        "cooldown": [70, 65, 60]
    },
    "T": {
        // 出血効果持続時間
        "bleeding_duration": 6,
        // 出血効果1スタックあたり総ダメージ
        "bleeding_damage": {
            "base": [10, 20, 30],
            "attack": 25
        },
        // 出血効果スタック最大値
        "max_bleeding": 5,
        // アドレナリン分泌持続時間
        "adrenaline": 5,
        // アドレナリン分泌時追加ダメージ
        "damage": {
            "base": [10, 25, 40],
            "attack": [14, 16, 18]
        },
        // アドレナリン分泌時自己回復量
        "heal": {
            "base": [10, 15, 20],
            "attack": 10
        },
        // アドレナリン分泌時最大回復量（元回復量比）
        "max_heal_multiplier": 2,
        // アドレナリン分泌時の回復量が最大になる自己体力（％）
        "max_heal_threshold": 40
    }
}