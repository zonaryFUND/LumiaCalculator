import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// 各effectの`nameIntlID`・StatusValueComponentの`intlID`は、いずれもゲーム本体のローカライズデータに
// 既に存在する`CharacterState/Group/Name/*`（例:「バイナリスピン - 移動速度増加」）をそのまま流用している。
// 独自キー（`subject.abigail.*`）を新設して別途和訳を書く必要がなく、内容も完全に一致するため

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    // Q使用中の自身の移動速度増加（スキルレベル非依存の固定値）
    "subject.abigail.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.abigail.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1067200",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed.effect * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // T的中時の対象防御力低下（固定値、発生源のTレベル1-3に応じて4/7/10）
    "subject.abigail.t-defense-reduction": {
        origin: "skill",
        nameIntlID: "subject.abigail.t-defense-reduction",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1067120",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.T.defense_reduction.effect[stack - 1] * -1
                }
            }]
        })
    }
};

// R的中時の移動速度減少は汎用デバフ（generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/1067510", values: [Constants.R.slow.effect] }
];
