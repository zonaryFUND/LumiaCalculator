import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// お食事時間(W)は自身・味方のどちらにも使用できるが、いずれの場合も他者向けバフ（givenBuffDebuff）
// として一元的に定義する（自身に使用した場合も、この項目を他者バフ欄から追加する想定。ユーザー指示）
export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "subject.xiukai.w-defense": {
        origin: "skill",
        nameIntlID: "subject.xiukai.w-defense",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1013300",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.defense.effect[stack - 1]
                }
            }]
        })
    },
    // あっつい！(R) 的中対象への治癒減少（最大2スタック）
    "subject.xiukai.r-healing-reduction": {
        origin: "skill",
        nameIntlID: "subject.xiukai.r-healing-reduction",
        maxStack: Constants.R.healing_reduction.max_stack,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1013510",
                value: {
                    type: "constant",
                    value: Constants.R.healing_reduction.effect * stack
                }
            }]
        })
    }
};

// ソースまみれ(Q)・ウォック落とし(E2)・あっつい！(R)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.xiukai.q-slow", values: Constants.Q.slow, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.xiukai.e2-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.xiukai.r-slow", values: Constants.R.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) }
];
