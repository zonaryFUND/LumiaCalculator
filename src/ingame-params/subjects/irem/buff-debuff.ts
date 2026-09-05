import Constants from "./constants";
import { SubjectModules, SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// ネコ変身！／イレム登場～(R) お魚生成時の次の基本攻撃射程増加は、constants.tsにも公式ツールチップ数値にも
// 増加量が見当たらず、ゲーム内での実測もできなかった（表記のバグにより正確な値が確認できない）ため、
// 実装せずコメントのみ残す

export const ModeBuffID = "subject.irem.mode";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // ネコ変身！／イレム登場～(R) 現在の変身状態（イレム/ネコ）そのものを表す、効果を持たない識別用バフ。
    // 常にどちらかの状態にあり「どちらでもない」状態は存在しないためexcludeNoneOptionを指定する。
    // weaponRangeOverride（近接/遠隔判定）・"subject.irem.t-mode"（地域バフの効果分岐）の両方から
    // このバフの現在のスタックを参照する
    [ModeBuffID]: {
        origin: "skill",
        nameIntlID: ModeBuffID,
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "subject.irem.mode.irem", "subject.irem.mode.cat"],
        excludeNoneOption: true,
        buff: () => ({})
    },
    // 猫の習性(T) 同じ地域に一定時間留まって慣れた際の自己ステータス補正。切り替えスキル自体はR
    // （ネコ変身！／イレム登場～）だが、ステータス補正バフはTで定義されているためTの項目として扱う。
    // 発動条件（一定時間滞在）はON/OFFのbool（0/1）で表現し、発動中の効果内容（攻撃速度or防御力）は
    // 上記[ModeBuffID]の現在のスタックを参照して決定する（バフ間の依存をbuff-debuff.ts内に閉じ、
    // 外部（weaponRangeOfなど）へは漏らさない）
    "subject.irem.t-mode": {
        origin: "skill",
        nameIntlID: "subject.irem.t-mode",
        maxStack: 1,
        buff: stack => {
            if (stack == 0) return {};

            const mode = config.selfBuffs.find(s => s.id == ModeBuffID)?.stack ?? 1;
            if (mode == 2) {
                return {
                    defense: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/1061040",
                        value: {
                            type: "constant",
                            value: Constants.T.defense[config.skillLevels.T] * stack
                        }
                    }]
                };
            }
            return {
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1061030",
                    value: {
                        type: "constant",
                        value: Constants.T.attack_speed[config.skillLevels.T] * stack
                    }
                }]
            };
        }
    }
});

// イレムW（こっちだよ～）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.irem.w-slow", values: [Constants.IremW.slow] }
];

// 能動的に近接（ネコ）/遠隔（イレム）モードを切り替える変身型実験体。武器未装備の場合は現在のモードに
// よらず近接扱いになる（ゲーム内検証済み）。武器装備中は[ModeBuffID]の現在のスタック（1=イレム/2=ネコ。
// excludeNoneOptionのため0は取らない想定だが念のためデフォルト1＝イレムとして扱う）で判定する
export const weaponRangeOverride: SubjectModules["weaponRangeOverride"] = config => {
    if (config.equipment.Weapon == null) return "melee";
    const mode = config.selfBuffs.find(s => s.id == ModeBuffID)?.stack ?? 1;
    return mode == 2 ? "melee" : "range";
};
