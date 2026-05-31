export default {
    // 絶対武力
    "frailty_infliction": {
        "damage": {
            "base": 20,
            "level": 5
        },
        "defense_reduction": {
            "duration": 6,
            "effect": 15
        },
        "cooldown": 15
    },
    // 吸血鬼
    "vampiric_bloodline": {
        "stack": {
            "adaptive": 1,
            "omnisyphon": {
                "melee": 1.5,
                "range": 1
            }
        },
        "duration": 6,
        "max_stack": 8,
        "max_additional_adaptive": {
            "base": 7,
            "level": 0.5
        },
        "period": 4
    },
    // アドレナリン
    "adrenaline": {
        "duration": 5,
        "max_stack": 6,
        "stack": {
            "attack_speed": {
                "melee": {
                    "base": 2,
                    "level": 0.2
                },
                "range": {
                    "base": 1.5,
                    "level": 0.15
                }
            }
        },
        "max_additional_attack_speed": {
            "melee": {
                "base": 20,
                "level": 1.5
            },
            "range": {
                "base": 15,
                "level": 1
            }
        },
        "max_movement_speed": 7
    },
    // アクセルレート
    "accelerator": {
        "count": 3,
        "attack_speed": 120,
        "duration": 3,
        "damage": {
            "base": [
                20,
                20,
                20,
                20,
                25,
                30,
                35,
                40,
                45,
                55,
                63,
                72,
                81,
                90,
                100,
                114,
                127,
                140,
                155,
                170
            ],
            "additionalAttack": 50,
            "amp": 40
        }
    },
    // 劣勢克服
    "dismantle_goliath": {
        "min": 10,
        "max": 40,
        "multiplier": 0.25
    },
    // 狂奔
    "frenzy": {
        "min": {
            "hp": 70,
            "value": 4
        },
        "max": {
            "hp": 40,
            "value": 8
        }
    },
    // 弱者蔑視
    "contempt_for_the_weak": {
        "threshold": 40,
        "effect": 8
    },
    // 狩猟 - 熊
    "bear_mask": {
        "base": {
            "adaptiveForce": 2
        },
        "max_stack": 80,
        "stack_buff": {
            "per": 10,
            "adaptive": 1
        }
    },
    // 狩猟 - イノシシ
    "boar_mask": {
        "base": {
            "maxHP": 25
        },
        "max_stack": 80,
        "stack_buff": {
            "per": 10,
            "maxHP": 20
        }
    },
    // 狩猟 - オオカミ
    "wolf_mask": {
        "base": {
            "attackSpeed": 4
        },
        "max_stack": 80,
        "stack_buff": {
            "per": 10,
            "attackSpeed": 2.5
        }
    },
    // 狩猟 - ハウンド
    "wild_dog_mask": {
        "base": {
            "omnisyphon": 1
        },
        "max_stack": 80,
        "stack_buff": {
            "omnisyphon": 1
        }
    },
    // 傷跡
    "cicatrix": {
        "healing_reduction": {
            "duration": 5,
            "effect": 10
        },
        "max_healing_reduction": 20,
        "period": 1,
        "max_stack_dmage": {
            "base": 10,
            "level": 1,
            "targetMaxHP": 3
        },
        "cooldown": 5
    }
}