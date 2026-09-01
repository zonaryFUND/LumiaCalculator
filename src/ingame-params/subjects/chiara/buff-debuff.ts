import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 暴走(R) 効果時間中の自己最大体力増加・基本攻撃射程増加
    "subject.chiara.r-buff": {
        origin: "skill",
        nameIntlID: "subject.chiara.r-buff",
        maxStack: 1,
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1014500",
                value: {
                    type: "constant",
                    value: Constants.R.maxHP[config.skillLevels.R] * stack
                }
            }],
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1014500",
                value: {
                    type: "constant",
                    value: Constants.R.range * stack
                }
            }]
        })
    },
    // 烙印(T) 最大スタックの対象へ向かって移動するときの自己移動速度増加
    "subject.chiara.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.chiara.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1014100",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 烙印(T) 治癒効果減少。1スタックあたりの効果量が発生源のTレベル（1-3）に依存し、かつ対象への蓄積
    // スタック数（0-4）にも依存する2軸の効果だが、他者デバフ（givenBuffDebuff）は発生源のconfigを受け
    // 取れないためTレベルを直接stackとして扱う。ユーザー判断により「最大スタック（4）到達時点の効果量」を
    // 常に採用する（キアラは戦闘時間が長くスタックが上限に達することが多く、かつこの効果自体の重要度が
    // 低いため、蓄積スタック数の細かい選択肢は不要と判断）
    "subject.chiara.t-healing-reduction": {
        origin: "skill",
        nameIntlID: "subject.chiara.t-healing-reduction",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1014100",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.T.healing_reduction[stack - 1] * Constants.T.max_stack
                }
            }]
        })
    }
};
