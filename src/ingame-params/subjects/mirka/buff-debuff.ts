import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // バックステップラッシュ(E) 効果中の自己被ダメージ減少
    "subject.mirka.e-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.mirka.e-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1085400",
                value: {
                    type: "constant",
                    value: Constants.E.damage_decline * stack
                }
            }]
        })
    },
    // ダウンバースト(R) 使用中の自己移動速度固定
    "subject.mirka.r-movement-speed-fix": {
        origin: "skill",
        nameIntlID: "subject.mirka.r-movement-speed-fix",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "fix",
                intlID: "subject.mirka.r-movement-speed-fix",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed * stack
                }
            }]
        })
    }
});

// クラッシュハンマー(Q)・クラッシュハンマーEX(強化Q)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。強化Qの余震スロウは現バージョンではQと同一の効果量だが、
// 将来のパッチで別々に調整される可能性を考慮し、Qとは別の項目として登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.mirka.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.mirka.q-enhanced-slow", values: [Constants.Q.enhance.after_effect.slow.effect] }
];
