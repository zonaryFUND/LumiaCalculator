import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { Effect } from "../components/buff-row.view";

// stackが0のバフは非表示にするため、その場合は効果を計算しない
// ラベルは仮にStatusのkeyをそのまま表示する（intlID経由の翻訳表示は別途対応予定）
export function effectsOf(definition: BuffDebuffDefinition, stack: number): Effect[] {
    if (stack == 0) return [];

    return Object.entries(definition.buff(stack))
        .flatMap(([key, components]) => (components ?? []).map(component => ({
            label: key,
            value: component.value.value ?? 0,
            // calculationTypeが"mul"の場合に加え、"sum"で加算される場合でも単位自体が％のステータス
            // （`preventDamageRatio`等、"Ratio"サフィックスの命名規則に従うキー）は％表示する
            percent: component.calculationType == "mul" || key.endsWith("Ratio")
        })));
}
