import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// ネコ変身！／イレム登場～(R) お魚生成時の次の基本攻撃射程増加は、constants.tsにも公式ツールチップ数値にも
// 増加量が見当たらず、ゲーム内での実測もできなかった（表記のバグにより正確な値が確認できない）ため、
// 実装せずコメントのみ残す

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 猫の習性(T) 同じ地域に一定時間留まって慣れた際の自己ステータス補正。切り替えスキル自体はR
    // （ネコ変身！／イレム登場～）だが、ステータス補正バフはTで定義されているためTの項目として扱う。
    // 他の切り替え式バフと異なり、補正が発動するまでの間は「なし」状態が実在するため、excludeNoneOptionは
    // 指定しない（0=なし、1=イレムの時 攻撃速度増加、2=ネコの時 防御力増加）
    "subject.irem.t-mode": {
        origin: "skill",
        nameIntlID: "subject.irem.t-mode",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.irem.t-mode.irem", "subject.irem.t-mode.cat"],
        buff: stack => {
            if (stack == 1) {
                return {
                    attackSpeed: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/1061030",
                        value: {
                            type: "constant",
                            value: Constants.T.attack_speed[config.skillLevels.T]
                        }
                    }]
                };
            }
            if (stack == 2) {
                return {
                    defense: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1061040",
                        value: {
                            type: "constant",
                            value: Constants.T.defense[config.skillLevels.T]
                        }
                    }]
                };
            }
            return {};
        }
    }
});

// イレムW（こっちだよ～）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.irem.w-slow", values: [Constants.IremW.slow] }
];
