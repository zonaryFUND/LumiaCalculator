import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 真実の鏡 / 偽りの鏡(W) 鏡にQE的中時の自己スキル増幅増加（最大2スタック）
    "subject.coraline.w-skill-amp": {
        origin: "skill",
        nameIntlID: "subject.coraline.w-skill-amp",
        maxStack: Constants.W.amp_gain.max_stack,
        buff: stack => ({
            skillAmp: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1087300",
                value: {
                    type: "constant",
                    value: Constants.W.amp_gain.effect[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // 鏡の世界の残影(R) 効果時間中の自己移動速度増加
    "subject.coraline.r-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.coraline.r-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1087510",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed.effect * stack
                }
            }]
        })
    },
    // 鏡の世界の残影(R) 強化基本攻撃の自己基本攻撃射程増加
    "subject.coraline.r-attack-range": {
        origin: "skill",
        nameIntlID: "subject.coraline.r-attack-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1087520",
                value: {
                    type: "constant",
                    value: Constants.R.basic_attack_enhancement.range * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 罪の束縛(黒鏡E) 通過弾的中対象への防御力減少（発生源のEレベル1-5に応じて10/11/12/13/14%）
    "subject.coraline.e-defense-reduction": {
        origin: "skill",
        nameIntlID: "subject.coraline.e-defense-reduction",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1087450",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.E.black_mirror_defense_reduction.effect[stack - 1] * -1
                }
            }]
        })
    }
};

// Qの白鏡・黒鏡の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.coraline.q-white-mirror-slow", values: [Constants.Q.white_mirror_slow.effect] },
    { nameIntlID: "subject.coraline.q-black-mirror-slow", values: [Constants.Q.black_mirror_slow.effect] }
];
