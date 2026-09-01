import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// ブレアは戦闘中に双剣・両剣モードを能動的に切り替えられる。計算機側はモードの状態を保持していない
// （Q/W/Eは`index.ts`で双剣・両剣両方のスキルを常に列挙している）ため、モードに応じた自己バフの出し分けは
// 行わず、両モード分のバフを常にリストへ表示する
export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // XMS-5活性化(R) 効果時間中の自己攻撃速度増加
    "subject.blair.r-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.blair.r-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1084500",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed[config.skillLevels.R] * stack
                }
            }]
        })
    },
    // ブレードシフト(T) 双剣使用時の自己攻撃速度増加／両剣使用時の自己基本攻撃射程増加。ブレアは常に
    // どちらかのモードにあり「どちらでもない」状態がないため、切り替え式バフ（1=双剣、2=両剣）として
    // プルダウンで表現し、excludeNoneOptionでスタック0（なし）を選択肢から除外する
    "subject.blair.t-mode": {
        origin: "skill",
        nameIntlID: "subject.blair.t-mode",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.blair.t-mode.dual-swords", "subject.blair.t-mode.double-bladed-sword"],
        excludeNoneOption: true,
        buff: stack => {
            if (stack == 1) {
                return {
                    attackSpeed: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/1084130",
                        value: {
                            type: "constant",
                            value: Constants.T.dual_swords.attack_speed
                        }
                    }]
                };
            }
            if (stack == 2) {
                return {
                    attackRange: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1084130",
                        value: {
                            type: "constant",
                            value: Constants.T.double_bladed_sword.range
                        }
                    }]
                };
            }
            return {};
        }
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 抹殺(双剣W) 最初に的中した対象への防御力減少
    "subject.blair.ds-w-defense-down": {
        origin: "skill",
        nameIntlID: "subject.blair.ds-w-defense-down",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1084300",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.DualSwordsW.defense_down.effect[stack - 1] * -1
                }
            }]
        })
    }
};

// 双剣Eの移動速度減少（使用効果・連携効果とも）は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.blair.ds-e-slow", values: [Constants.DualSwordsE.slow.effect] },
    { nameIntlID: "subject.blair.ds-e-combo-slow", values: [Constants.DualSwordsE.combo_slow.effect] }
];
