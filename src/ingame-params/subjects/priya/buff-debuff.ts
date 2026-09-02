import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // ポルタメント(W) 自身が花の上にいるときの自己移動速度増加
    "subject.priya.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.priya.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1051300",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed.effect[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // プリビティの歌(E) 使用中の自己移動速度増加
    "subject.priya.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.priya.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1051430",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed * stack
                }
            }]
        })
    },
    // 大地の響き(R) 効果中の自己被ダメージ減少
    "subject.priya.r-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.priya.r-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1051500",
                value: {
                    type: "constant",
                    value: Constants.R.damage_reduction * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // ポルタメント(W) 味方が花の上にいるときの移動速度増加（Wレベル1-5に応じて8/9/10/11/12%）
    "subject.priya.w-ally-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.priya.w-ally-movement-speed",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1051310",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.movement_speed.ally_effect[stack - 1]
                }
            }]
        })
    }
};

// ポルタメント(W)・プリビティの歌(E、2ヒット時)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.priya.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.priya.e-slow", values: [Constants.E.slow.effect] }
];
