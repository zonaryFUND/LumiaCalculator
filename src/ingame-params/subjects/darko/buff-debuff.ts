import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import Constants from "./constants";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // 高利貸し(Q) 刻印対象へ向かって移動するときの自己移動速度増加
    "subject.darko.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.darko.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1074220",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed.effect * stack
                }
            }]
        })
    },
    // 徴収(W) 的中対象から窃取した攻撃力（スナップショット）による自己攻撃力増加。
    // 窃取量は仮想敵のステータスに依存し、かつ最大4人にヒットしうるため一意な数式で決定できない
    // （窃取率はWレベルに応じて1〜5%、実験体の攻撃力は極端な状況で最大500程度、最大4人ヒット）。
    // そのためスタック数をそのまま増加した攻撃力の値として扱う、0〜100の自由入力とする
    "subject.darko.w-attack-power": {
        origin: "skill",
        nameIntlID: "subject.darko.w-attack-power",
        maxStack: 100,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1074320",
                value: {
                    type: "constant",
                    value: stack
                }
            }]
        })
    },
    // 差押(T) 対象から窃取した防御力（スナップショット）による自己防御力増加。Wの攻撃力窃取と同様の理由
    // （窃取量が仮想敵のステータス依存で一意に決められない）で、0〜50の自由入力とする（Tは単体対象のため
    // Wより上限を低く設定）
    "subject.darko.t-defense": {
        origin: "skill",
        nameIntlID: "subject.darko.t-defense",
        maxStack: 50,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1074110",
                value: {
                    type: "constant",
                    value: stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 徴収(W) 的中対象への攻撃力％減少（Wレベル1-5に応じて1/2/3/4/5%）
    "subject.darko.w-attack-steal": {
        origin: "skill",
        nameIntlID: "subject.darko.w-attack-steal",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1074310",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.attack.effect[stack - 1] * -1
                }
            }]
        })
    },
    // 差押(T) 対象への防御力％減少（Tレベル1-3に応じて6/10/14%）
    "subject.darko.t-defense-steal": {
        origin: "skill",
        nameIntlID: "subject.darko.t-defense-steal",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1074120",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.T.defense.effect[stack - 1] * -1
                }
            }]
        })
    }
};

// W・Rの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.darko.w-slow", values: Constants.W.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.darko.r-slow", values: [Constants.R.slow.effect] }
];
