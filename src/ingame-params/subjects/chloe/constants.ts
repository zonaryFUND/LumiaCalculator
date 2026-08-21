export default {
    "nina": {
        // ニナ攻撃力基礎値
        "base_attack": 10,
        // ニナ防御力基礎値
        "base_defense": 30,
        // ニナ攻撃速度基礎値
        "attack_speed": 0.8
    },
    "Q": {
        "damage": {
            "base": [70,90,110,130,150],
            "ninaAttack": 80
        },
        // 移動速度減少
        "slow": {
            "duration": 1.5,
            "effect": [10,15,20,25,30]
        },
        "cooldown": 5
    },
    "W": {
        // 縫糸1秒あたり固定ダメージ
        "damage": {
            "base": [15,24,33,42,51],
            "attack": 5
        },
        // 縫い糸範囲内移動速度減少
        "slow": 35,
        // 縫い糸持続時間
        "duration": 3,
        // 刃の刺繍落下ダメージ
        "drop_damage": {
            "base": [40,60,80,100,120],
            "attack": 80
        },
        // 刃の刺繍落下的中時移動速度減少
        "drop_slow": {
            "duration": 1,
            "effect": [30,35,40,45,50]
        },
        // ニナ落下ダメージ
        "nina_damage": {
            "base": [40,80,120,160,200],
            "ninaAttack": 70
        },
        // ニナ落下的中時エアボーン時間
        "airborne": 0.5,
        // 刃の刺繍拾得時移動速度増加
        "movement_speed": {
            "duration": 2,
            "effect": 40
        },
        "cooldown": [15,14,13,12,11]
    },
    "E": {
        // 1回目クロエ移動ダメージ
        "first_damage": {
            "base": [40,55,70,85,100],
            "attack": 40
        },
        // 再使用可能までの時間（秒）
        "reuse": 1,
        // 2回目ニナ移動ダメージ
        "second_damage": {
            "base": [50,80,110,140,170],
            "ninaAttack": 60
        },
        "cooldown": [14,13.5,13,12.5,12]
    },
    "R": {
        // リンク状態持続時間
        "duration": 5,
        // ニナ攻撃速度増加
        "summoned_attack_speed": [20,25,30],
        // ニナ移動速度増加
        "nina_movement_speed": [25,30,35],
        // 使用時W/E残りクールダウン減少（％）
        "we_cooldown_reduction": 30,
        // 連結ライン1秒当たり固定ダメージ
        "damage": {
            "base": [30,60,90]
        },
        // 連結ライン的中継続時ダメージ最大倍率
        "damage_max_multipler": 2.5,
        // リンク中被ダメージ時対象ダメージ
        "attacked_damage": 70,
        // リンク中被ダメージ時非対象ダメージ
        "linked_damage": 60,
        "cooldown": [80,70,60]
    },
    "T": {
        // ニナ突きダメージ
        "damage": {
            "base": [20,50,80],
            "ninaAttack": 50
        },
        // ニナ復活までの時間
        "nina_revive": [20,18,16],
        // ニナ復活時クロエ現在体力コスト（％）
        "nina_revive_cost": 20,
        // ニナ復活時初期体力（％）
        "nina_revive_hp": 80,
        // クロエステータスのニナへの変換量基礎値（％）
        "base_chloe_status_ratio": 60,
        // クロエステータスのニナへの変換量レベル比例追加値（％）
        "per_level_chloe_status_ratio": 2,
        // ニナ追加攻撃力
        "nina_attack": [4,7,10],
        // ニナ追加防御力
        "nina_defense": [20,35,50],
        // ニナ追加最大体力
        "nina_maxhp": [200,250,300]
    }
}