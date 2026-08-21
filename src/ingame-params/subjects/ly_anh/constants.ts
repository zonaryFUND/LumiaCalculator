export default {
    // 人間状態Q
    "LyAnhQ": {
        "damage": {
            "base": [40, 70, 100, 130, 160],
            "attack": 60
        },
        // 的中時クールダウン上書き
        "on_hit_cooldown": 1,
        // 侵食ゲージ獲得量
        "thrash": 30,
        "hp_cost": 4,
        "cooldown": [4, 3.5, 3, 2.5, 2]
    },
    // 憑依状態Q
    "GhostQ": {
        "damage": {
            "base": [40, 75, 110, 145, 180],
            "attack": 70
        },
        // 束縛時間
        "bind": 0.7,
        "thrash": {
            // 的中時侵食ゲージ獲得量
            "hit": 20,
            // 非的中時侵食ゲージ獲得量
            "miss": 10
        },
        "hp_cost": [10, 15, 20, 25, 30],
        "cooldown": [13, 12, 11, 10, 9]
    },
    // 人間状態W
    "LyAnhW": {
        "damage": {
            "base": [5, 45, 85, 125, 165],
            "attack": 50
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": 55
        },
        // 侵食ゲージ獲得量
        "thrash": 30,
        "hp_cost": 4,
        "cooldown": [11, 10, 9, 8, 7]
    },
    // 憑依状態W
    "GhostW": {
        "damage": {
            "base": [30, 60, 90, 120, 150],
            "attack": 65
        },
        // 的中時移動速度増加
        "movement_speed": {
            "duration": 1,
            "effect": 40
        },
        // 的中時蝕みスタック1あたりQ/Eクールダウン減少
        "qe_cooldown_reduction": 1,
        // 蝕みスタック最大数
        "max_stack": 3,
        "thrash": {
            // 的中時侵食ゲージ獲得量
            "hit": 20,
            // 非的中時侵食ゲージ獲得量
            "miss": 10
        },
        "hp_cost": 4,
        "cooldown": 1
    },
    // 人間状態E
    "LyAnhE": {
        "damage": {
            "base": [20, 40, 60, 80, 100],
            "attack": 65
        },
        // 侵食ゲージ獲得量
        "thrash": 20,
        "hp_cost": 4,
        "cooldown": [16, 15, 14, 13, 12]
    },
    // 憑依状態E
    "GhostE": {
        // 振り下ろしダメージ
        "first_damage": {
            "base": [30, 55, 80, 105, 130],
            "attack": 25
        },
        // 引き寄せダメージ
        "second_damage": {
            "base": [20, 50, 80, 110, 140],
            "attack": 35
        },
        "thrash": {
            // 的中時侵食ゲージ獲得量
            "hit": 20,
            // 非的中時侵食ゲージ獲得量
            "miss": 10
        },
        "hp_cost": [10, 15, 20, 25, 30],
        "cooldown": [11, 10.5, 10, 9.5, 9]
    },
    "LyAnhR": {
        // 1秒あたり侵食ゲージ減少量
        "thrash_decline": 25,
        // 悪霊状態維持範囲（ｍ）
        "range": 16,
        // 飛び出しダメージ
        "damage": {
            "base": [200, 300, 400],
            "attack": 60
        },
        // 悪霊状態最大体力増加
        "maxhp": [222, 333, 444],
        // 悪霊状態移動速度増加（％）
        "movement_speed": 25,
        // 悪霊状態基本攻撃ダメージ
        "attack_damage": {
            "attack": 100
        },
        // 悪霊状態基本攻撃速度増加（％）
        "attack_speed": {
            "base": [20, 25, 30],
            "attack": 10
        },
        // 恐怖状態発動に必要な基本攻撃回数
        "fear_count": 4,
        // 恐怖時間
        "fear": [0.9, 1, 1.1],
        // 恐怖発動範囲
        "fear_range": 2,
        // 恐怖免疫時間
        "fear_immune": 3,
        // 悪霊状態中死亡時体力回復
        "hp_on_death": [100, 200, 300],
        "cooldown": [70, 60, 50]
    },
    "LyAnhR2": {},
    "LyAnhT": {
        // 憑依状態に変身時自己回復
        "possessing_heal": {
            "lostHP": 20
        },
        // 非戦闘状態での1秒あたり侵食ゲージ減少量
        "thrash_decline": 50,
        // 人間状態基本攻撃ダメージ
        "human_basic_attack": {
            "attack": 80
        },
        // 憑依状態基本攻撃ダメージ
        "possessed_basic_attack": {
            "attack": 90
        },
        // 悪霊状態基本攻撃ダメージ
        "ghost_basic_attack": {
            "attack": 100
        },
        // 憑依・悪霊状態でのスキルダメージ発生時の追加固定ダメージ
        "additional_damage": {
            "attack": [8, 16, 24]
        },
        // 憑依状態での追加固定ダメージ比例自己回復（％）
        "possesed_heal": 100,
        // 悪霊状態での追加固定ダメージ比例自己回復（％）
        "ghost_heal": 140,
        // 人間状態での基本攻撃時侵食ゲージ獲得量
        "human_thrash": 20,
        // 憑依状態での基本攻撃時侵食ゲージ獲得量
        "possessed_thrash": 10
    }
}