export default {
    Q: {
        // 瞬駆シールド
        shield: {
            duration: 1.5,
            effect: {
                base: [20,40,60,80,100],
                amp: 25,
                maxHP: 8
            }
        },
        // 瞬駆ダメージ
        first_damage: {
            base: [30,60,90,120,150],
            amp: 40,
            maxHP: 8
        },
        // 瞬駆使用後貫突が使用できる時間
        reuse: 2.5,
        // 貫突ダメージ
        second_damage: {
            base: [40,80,120,160,200],
            amp: 55,
            maxHP: 10
        },
        // 貫突気絶時間
        stun: [0.6,0.65,0.7,0.75,0.8],
        cooldown: [12,11,10,9,8]
    },
    W: {
        damage: {
            base: [100,140,180,220,260],
            amp: 60,
            additionalMaxHP: 20
        },
        // 移動速度減少
        slow: {
            duration: 1,
            effect: 40
        },
        cooldown: [13,12.5,12,11.5,11]
    },
    E: {
        // 警護持続時間
        duration: 3,
        // 肩代わりダメージ割合
        take_over: {
            base: [12,13,14,15,16],
            additionalMaxHP: 1
        },
        // 警護対象が受けたダメージに対する回復量
        heal: 25,
        // ルチアを対象とする場合の射程増加
        lucia_additional_range: 1.5,
        // 警護対象がルチアであった場合の肩代わりダメージ割合
        lucia_take_over: {
            base: [16,17,18,19,20],
            additionalMaxHP: 1
        },
        // 警護対象がルチアであった場合の回復量
        lucia_heal: 30,
        // 自身の体力がこの割合以下の場合、肩代わりダメージを受けない
        min_hp: 30,
        // 自身に使用したときの移動速度増加
        movement_speed: {
            duration: 1.5,
            effect: 20
        },
        cooldown: [12,11.5,11,10.5,10]
    },
    R: {
        // 阻止不可時間
        unstoppable: 2.5,
        // 発動時付与シールド
        first_shield: {
            base: [15,30,45],
            amp: 5,
            maxHP: 1.5
        },
        // シールド追加周期
        tick: 0.25,
        // 追加シールド
        additional_shield: {
            base: [15,30,45],
            amp: 5,
            maxHP: 1.5
        },
        // 終了後シールド持続時間
        shield_aftereffect: 0.75,
        // スキル使用後キャンセル可能になるまでの時間
        cancellable: 1,
        cooldown: [85,75,65]
    },
    T: {
        // 黒曜石の破片持続時間
        duration: 3,
        damage: {
            base: [42,54,66],
            targetMaxHP: [4.8,5.4,6]
        },
        // 最大スタック数
        max_stack: 2,
        // ダメージ発生周期
        tick: 0.5
    }
}