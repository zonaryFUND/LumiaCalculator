export default {
    "Q": {
        // 洗剤的中時ダメージ
        "first_damage": {
            "base": [40, 60, 80, 100, 120],
            "additionalAttack": 80
        },
        // 再使用可能時間
        "reuse": 3,
        // 突進ダメージ最小値
        "second_damage": {
            "base": [40, 60, 80, 100, 120],
            "additionalAttack": 60
        },
        // 突進ダメージ増加量最大値（元ダメージ％）
        "enhance_max": 100,
        // 突進ダメージが最大になる対象体力（％）
        "enhance_max_target_hp": 0,
        // 進化時の突進的中時防御力減少
        "defense_decline": {
            "duration": 3,
            "effect": 10
        },
        "cooldown": [15, 13, 11, 9, 7]
    },
    "W": {
        "damage": {
            "base": [50, 80, 110, 140, 170],
            "attack": 85
        },
        // 的中対象1体あたりの自己回復量（失った体力％）
        "heal": 11,
        // 自己回復量最大値
        "max_heal": 28,
        // 進化時の基本攻撃的中時クールダウン減少
        "cooldown_reduction": 1,
        "cooldown": 10
    },
    "E": {
        "damage": {
            "base": [50, 75, 100, 125, 150],
            "attack": 55
        },
        // 移動速度減少
        "slow": {
            "duration": 0.5,
            "effect": 70
        },
        // 進化時の処刑効果が発動する対象体力最大値（％）
        "execute_threshold": 5,
        "cooldown": [14, 13, 12, 11, 10]
    },
    "R": {
        // 最大マーク数
        "max_stack": 3,
        // マーク付与対象攻撃時1スタックあたり追加ダメージ
        "stack_damage": {
            "base": [20, 45, 70],
            "attack": 10,
            "targetMaxHP": 2
        },
        // マーク付与対象攻撃時1スタックあたり移動速度減少
        "stack_slow": {
            "duration": 1.25,
            "effect": [6, 7, 8]
        },
        // 使用時ダメージ最小値
        "damage": {
            "base": [150, 250, 350],
            "additionalAttack": 80
        },
        // 使用時ダメージ対象の失った体力比ダメージ増加量最大値（％）
        "max_multiplier": 2,
        // 使用時的中対象移動速度減少
        "slow": {
            "duration": 1,
            "effect": 30
        },
        // 進化時対象視界獲得時間
        "vision": 1,
        // 進化時の使用時的中対象移動速度減少効果上書き（％）
        "evoluted_slow": 99,
        "cooldown": [80, 70, 60]
    },
    "T": {
        // 攻撃的中時スタック獲得
        "attack_speed": {
            // スタック持続時間
            "duration": 5,
            // 1スタックあたり攻撃速度増加（％）
            "effect": [3, 4, 5],
            // 最大スタック数
            "max_stack": 8
        },
        // 実験体処置時体力回復（％）
        "subject_kill": [4, 7, 10],
        // ウィクライン処置時体力回復（％）
        "wickline_kill": [5, 10, 15],
        // 進化ポイント獲得に必要な掃除完了スタック数
        "evolution_stack": [10, 30, 50],
        // 実験体・ウィクライン処置時の体力回復効果が増加するのに必要な掃除完了スタック数
        "heal_amp_threshold": 100,
        // 実験体・ウィクライン処置時の体力回復効果を1％上昇するのに必要な追加の掃除完了スタック数
        "heal_amp_per": 10,
        // 鶏・コウモリ処置時の掃除完了スタック獲得数
        "chicken_bat": 3,
        // イノシシ・ハウンド・狼処置時の掃除完了スタック獲得数
        "boar_hound_wolf": 4,
        // 熊処置時の掃除完了スタック獲得数
        "bear": 7,
        // 敵実験体処置時の掃除完了スタック獲得数
        "subject": 5,
        // アルファ・オメガ処置時の掃除完了スタック獲得数
        "alpha_omega": 10,
        // ウィクライン処置時の掃除完了スタック獲得数
        "wickline": 10,
        // 食料補給箱獲得時の掃除完了スタック獲得数
        "food_box": 2,
        // 英雄等級補給箱獲得時の掃除完了スタック獲得数
        "epic_box": 4,
        // 伝説補給箱獲得時の掃除完了スタック獲得数
        "legendary_box": 6
    }
}