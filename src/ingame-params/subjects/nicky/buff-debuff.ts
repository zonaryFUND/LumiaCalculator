import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 獲得アクション(Q) チャージ中の自己移動速度減少
    "subject.nicky.q-self-slow": {
        origin: "skill",
        nameIntlID: "subject.nicky.q-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1033200",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed_penalty * -1 * stack
                }
            }]
        })
    },
    // ガード＆カウンター(W) カウンター中の自己被ダメージ減少
    "subject.nicky.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.nicky.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1033320",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // 短気(T) 状態中の自己攻撃速度増加
    "subject.nicky.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.nicky.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1033100",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// カウンター(W)・強力なパンチ(E)・怒りのパンチ！(強化E)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。通常Eと強化Eは現在同一の効果量だが、スキル名称が異なりパッチで
// 別々に調整される可能性があるため、それぞれ別項目として登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.nicky.w-counter-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.nicky.e-slow", values: [Constants.E.slow.effect] },
    { nameIntlID: "subject.nicky.e2-slow", values: [Constants.E.slow.effect] }
];
