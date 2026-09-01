import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// デビー・マーリンはEスキルで近接（デビー）・遠隔（マーリン）を切り替えるシェイプシフター。Q/W/Eは
// index.tsで両形態分のスキルを常に列挙しているため、自己バフも同様に両形態分を常にリストへ表示する
export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 攻撃速度増加(デビーQ) 的中1スタックあたり自己攻撃速度増加（最大4スタック）
    "subject.debimarlene.debi-q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.debimarlene.debi-q-attack-speed",
        maxStack: Constants.DebiQ.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1065200",
                value: {
                    type: "constant",
                    value: Constants.DebiQ.attack_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // クレセントスラッシュ－攻撃速度増加(マーリンQ) 的中1スタックあたり自己攻撃速度増加（最大4スタック）
    "subject.debimarlene.marlene-q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.debimarlene.marlene-q-attack-speed",
        maxStack: Constants.MarleneQ.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1065210",
                value: {
                    type: "constant",
                    value: Constants.MarleneQ.attack_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // E使用後の自己移動速度増加（デビー側・マーリン側どちらの発動でも効果量共通）
    "subject.debimarlene.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.debimarlene.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1065400",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect * stack
                }
            }]
        })
    },
    // Blue＆Red(T) デビー時防御力増加／マーリン時基本攻撃射程増加。常にどちらかの形態にあり
    // 「どちらでもない」状態がないため、切り替え式バフ（1=デビー、2=マーリン）としてプルダウンで表現し、
    // excludeNoneOptionでスタック0（なし）を選択肢から除外する
    "subject.debimarlene.t-mode": {
        origin: "skill",
        nameIntlID: "subject.debimarlene.t-mode",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.debimarlene.t-mode.debi", "subject.debimarlene.t-mode.marlene"],
        excludeNoneOption: true,
        buff: stack => {
            if (stack == 1) {
                return {
                    defense: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1065000",
                        value: {
                            type: "constant",
                            value: Constants.T.debi_defense[config.skillLevels.T]
                        }
                    }]
                };
            }
            if (stack == 2) {
                return {
                    attackRange: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1065010",
                        value: {
                            type: "constant",
                            value: Constants.T.marlene_range
                        }
                    }]
                };
            }
            return {};
        }
    }
});

// マーリンE（エネルギー弾爆発）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// デビー状態でのE即時発動時（DebiE.slow）とマーリン状態でのE連携発動時（MarleneE.slow）は同一効果量
// （ユーザー確認済み。過去のパッチ履歴上も一致しており、双子キャラのコンセプト上今後も同値である
// 見込みのため、辞書には1件のみ登録する）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.debimarlene.marlene-e-slow", values: [Constants.DebiE.slow.effect] }
];
