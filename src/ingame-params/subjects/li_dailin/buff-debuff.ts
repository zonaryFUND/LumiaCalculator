import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 酒飲み(W) 飲酒中の自己被ダメージ減少
    "subject.lidailin.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.lidailin.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1010300",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // 猛虎清拳(T) 発動時の自己攻撃速度増加
    "subject.lidailin.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.lidailin.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1010120",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    },
    // 百日酔(T、酒アイテム使用時)の自己攻撃力増加。ゲーム内での上限スタック数が公式ツールチップ・
    // constants.tsに見当たらないため、飲んだか否かのみを表すbool（maxStack: 1）として扱う（ユーザー確認済み）
    "subject.lidailin.t-alcohol-attack": {
        origin: "skill",
        nameIntlID: "subject.lidailin.t-alcohol-attack",
        maxStack: 1,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1010140",
                value: {
                    type: "constant",
                    value: Constants.T.alcohol_drink.attack * stack
                }
            }]
        })
    }
});

// 虎連脚(E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。通常時と酔拳発動時（強化E）で
// 効果量が異なるため、別項目として登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.lidailin.e-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.lidailin.e-enhanced-slow", values: Constants.E.slow.enhanced_effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
