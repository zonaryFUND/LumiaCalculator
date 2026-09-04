import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { ComponentStatus } from "core/subject-dynamic/status/type";
import { Effect } from "../components/buff-row.view";

// "Ratio"サフィックスの命名規則に従わないが、単位自体が％のComponentStatusキー
// （実験体ステータス画面のColumnで`percent`が指定されているものと対応。`06_misc.tsx`・`05_heal.tsx`・
// `02_basicattack.tsx`参照）
export const PercentStatusKeys: ReadonlySet<keyof ComponentStatus> = new Set([
    "lifeSteal",
    "normalLifeSteal",
    "criticalStrikeChance",
    "criticalStrikeDamage",
    "tenacity",
    "slowResist"
]);

// stackが0のバフは非表示にするため、その場合は効果を計算しない
// ラベルは仮にStatusのkeyをそのまま表示する（intlID経由の翻訳表示は別途対応予定）
export function effectsOf(definition: BuffDebuffDefinition, stack: number): Effect[] {
    if (stack == 0) return [];

    return Object.entries(definition.buff(stack))
        .flatMap(([key, components]) => (components ?? []).map(component => ({
            label: key,
            value: component.value.value ?? 0,
            // calculationTypeが"mul"の場合に加え、"sum"で加算される場合でも単位自体が％のステータス
            // （"Ratio"サフィックスの命名規則に従うキー、および`PercentStatusKeys`）は％表示する
            percent: component.calculationType == "mul" || key.endsWith("Ratio") || PercentStatusKeys.has(key as keyof ComponentStatus)
        })));
}
