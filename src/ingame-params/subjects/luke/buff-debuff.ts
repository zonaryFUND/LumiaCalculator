import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 掃除完了(T) 攻撃的中スタックによる自己攻撃速度増加
    "subject.luke.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.luke.t-attack-speed",
        maxStack: Constants.T.attack_speed.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1022110",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // クリーニングサービス(進化Q) 的中対象への防御力減少
    "subject.luke.q-evolved-defense-down": {
        origin: "skill",
        nameIntlID: "subject.luke.q-evolved-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1022250",
                value: {
                    type: "constant",
                    value: Constants.Q.defense_decline.effect * -1 * stack
                }
            }]
        })
    }
};

// 無騒音掃除機(E)・アフターサービス(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// Rのマークスタックによる移動速度減少はスキルLvに応じて1スタックあたりの効果量が変わり最大3スタックまで
// 蓄積するため、辞書には各スキルLvでの最大スタック時（3スタック）の効果量のみを登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.luke.e-slow", values: [Constants.E.slow.effect] },
    {
        nameIntlID: "subject.luke.r-stack-slow-max",
        values: Constants.R.stack_slow.effect.map(v => v * Constants.R.max_stack),
        valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4)
    },
    { nameIntlID: "subject.luke.r-slow", values: [Constants.R.slow.effect] },
    { nameIntlID: "subject.luke.r-evolved-slow", values: [Constants.R.evoluted_slow] }
];
