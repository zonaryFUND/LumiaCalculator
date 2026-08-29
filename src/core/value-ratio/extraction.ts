import { SubjectConfig } from "core/subject-dynamic/config";
import { ValueOrigin } from "./calculation";
import { weaponSkillLevel } from "core/subject-dynamic/status/weapon-skill-level";
import { SubjectWeaponSkillOverrideDictionary } from "@app/ingame-params/subjects/dictionary";
import { ValueRatio } from "./type";

/**
 * 実験体設定およびダメージ等効果発生源の設定からスキルレベルを抽出する
 * 
 * 返されるスキルレベルは配列のインデックスであり、したがってゲーム内表示値-1である
 * @param config 実験体設定構造体
 * @param origin 発生源スキル
 * @returns スキルレベル（AA/アイテムスキル/特性の場合`undefined`）
 */
export function extractSkillLevel(config: SubjectConfig, origin: ValueOrigin): number | undefined {
    if (origin == "other") return undefined;
    if (origin == "tactical1") return 0;
    if (origin == "tactical2") return 1;
    if (origin == "D") {
        const override = SubjectWeaponSkillOverrideDictionary[config.subject];
        return override ? override(config.weaponMastery) : weaponSkillLevel(config.weaponMastery);
    }

    return config.skillLevels[origin];
}

/**
 * ValueRatioから「対象の最大体力」「失った体力」などの動的なレシオを除いた部分を抽出する
 * @param ratio ValueRatio構造体
 * @returns 静的な値のみを含むValueRatio構造体
 */
export function extractStaticValueRatio(ratio: ValueRatio): ValueRatio {
    const removedKeys = [
        "targetMaxHP",
        "targetHP",
        "lostHP",
        "targetLostHP"
    ];

    return Object.fromEntries(Object.entries(ratio).filter(([key]) => !removedKeys.includes(key))) as ValueRatio;
}