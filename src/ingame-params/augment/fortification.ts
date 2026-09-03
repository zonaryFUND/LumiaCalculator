export default {
    // 金剛
    "diamond_shard": {
        "defense": {
            "duration": 3,
            "effect": {
                "base": 20,
                "level": 5
            }
        },
        "damage": {
            "level": 10
        },
        "range": 3,
        "slow": {
            "effect": 40,
            "duration": 1.5
        },
        "cooldown": 20
    },
    // 不壊
    "ironclad": {
        "damage_reduction": {
            "melee": {
                "base": 10,
                "level": 1
            },
            "range": {
                "base": 7,
                "level": 1
            }
        },
        "tenacity": {
            "melee": {
                "base": 20,
                "defense": 15
            },
            "range": {
                "base": 12,
                "defense": 15
            }
        },
        "duration": {
            "melee": 3,
            "range": 2.5
        }
    },
    // 光の守護
    "heavy_kneepads": {
        "shield": {
            "maxHP": 18
        },
        "movement_speed": {
            "effect": 50,
            "duration": {
                "melee": 1,
                "range": 0.5
            }
        },
        "cooldown": 25,
        "animal_cooldown_reduction": 70
    },
    // 応報
    "bitter_retribution": {
        "stack_per_lost_hp": 1,
        "max_stack": 30,
        "damage_reduction_per_stack": 0.2,
        "melee_slow": {
            "duration": 1.5,
            "effect": 50
        },
        "damage": {
            "level": 15
        },
        "cooldown": 2,
        "recover_per_stack": 0.5
    },
    // 大胆
    "embolden": {
        "defense": {
            "base": 5,
            "level": 1
        },
        "duration": 4,
        "cooldown": 8
    },
    // 鎮痛剤
    "painkiller": {
        "defense_max": {
            "effect": 12,
            "hp": 40
        }
    },
    // 不屈
    "unwavering_mentality": {
        "shield": {
            "level": 15
        },
        "duration": 3,
        "cooldown": 20
    },
    // 警戒心
    "caution": {
        "threshold": 75,
        "damage_reduction": {
            "duration": 1.5,
            "effect": {
                "base": 5,
                "level": 0.5
            }
        },
        "cooldown": 20
    },
    // 堅固
    "steadfast": {
        "tenacity": {
            "base": 12,
            "level": 0.4
        }
    },
    // 食いしん坊
    "dine_n_dash": {
        "food_consumption_reduction": 3,
        "hp_threshold": 75,
        "consume_threshold": 660
    },
    // 特攻隊
    "cavalcade": {
        "effect": 4,
        "range": 3.5
    },
    // 熱処理
    "tempering": {
        "first_defense_up": 3,
        "second_defense_up": {
            "period": 80,
            "effect": 1
        }
    },
}