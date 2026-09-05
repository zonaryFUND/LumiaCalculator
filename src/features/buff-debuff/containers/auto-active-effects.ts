import { ComponentStatus, Status } from "core/subject-dynamic/status/type";
import { Effect } from "../components/buff-row.view";
import { PercentStatusKeys } from "./effects";

export type AutoBuffGroup = {
    nameIntlID: string
    effects: Effect[]
}

/**
 * 現在の`Status`から、`origin: "perpetual_status"`（実験体固有パッシブ・装備固有アビリティによる恒久的な
 * ステータス変換）に由来する部分要素を、`intlID`（バフ名）ごとにグループ化して取り出す。
 *
 * `perpetualStatus`（`(config, currentHPRatio) => ...`）は、条件を満たさない間はそもそも該当キーの
 * `StatusValueComponent`を返さない設計（例: `blaze_of_glory`は残り体力が閾値未満の間`{}`を返す）ため、
 * ここで「現在Statusに実在するperpetual_status由来の要素」を拾うだけで、自動的に「現在発動中の効果のみ」
 * が得られる。常時発動する恒久パッシブ（条件を持たないステータス変換）も同じ`origin`を使うため、あわせて
 * ここに表示される。
 */
export function autoActiveEffectsOf(status: Status): AutoBuffGroup[] {
    const groups = new Map<string, Effect[]>();

    Object.entries(status).forEach(([key, value]) => {
        // "summoned"（召喚体情報の配列）はStatusValue系（.componentsを持つ）ではないため除外
        if (value == undefined || Array.isArray(value) || !("components" in value)) return;

        value.components.forEach(component => {
            if (component.origin != "perpetual_status" || component.intlID == undefined) return;

            const effect: Effect = {
                label: key,
                value: component.value.value ?? 0,
                percent: component.calculationType == "mul" || key.endsWith("Ratio") || PercentStatusKeys.has(key as keyof ComponentStatus)
            };

            groups.set(component.intlID, [...(groups.get(component.intlID) ?? []), effect]);
        });
    });

    return [...groups.entries()].map(([nameIntlID, effects]) => ({ nameIntlID, effects }));
}
