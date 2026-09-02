import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { calculateValue } from "core/value-ratio";

// イアンは侵食ゲージの獲得によって人間状態・憑依状態が自動的に切り替わり、他のシェイプシフター型
// 実験体（例: イレム）と異なりプレイヤーが能動的に切り替えられないため、状態切り替え用のプルダウン式自己バフは
// 用意しない。各状態固有の効果のみを、その状態専用の自己バフ・辞書項目として個別に登録する
export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 悪霊状態(R)の攻撃速度増加は攻撃力に比例するレシオ（Constants.LyAnhR.attack_speed = {base, attack}）
    // のため、calculateValue()で解決する
    const rAttackSpeed = calculateValue(Constants.LyAnhR.attack_speed, status, config, "R");

    return {
        // 血まみれの爪(憑依W) 的中時の自己移動速度増加
        "subject.lyanh.ghostw-movement-speed": {
            origin: "skill",
            nameIntlID: "subject.lyanh.ghostw-movement-speed",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1063310",
                    value: {
                        type: "constant",
                        value: Constants.GhostW.movement_speed.effect * stack
                    }
                }]
            })
        },
        // 悪霊状態(R) 中の自己最大体力・移動速度・攻撃速度増加
        "subject.lyanh.r-buff": {
            origin: "skill",
            nameIntlID: "subject.lyanh.r-buff",
            maxStack: 1,
            buff: stack => ({
                maxHp: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1063020",
                    value: {
                        type: "constant",
                        value: Constants.LyAnhR.maxhp[config.skillLevels.R] * stack
                    }
                }],
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1063510",
                    value: {
                        type: "constant",
                        value: Constants.LyAnhR.movement_speed * stack
                    }
                }],
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1063580",
                    value: {
                        type: "constant",
                        value: rAttackSpeed.static.toNumber() * stack
                    }
                }]
            })
        }
    };
};

// ごめんなさい…(人間W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.lyanh.humanw-slow", values: [Constants.LyAnhW.slow.effect] }
];
