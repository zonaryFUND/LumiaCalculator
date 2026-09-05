import Constants from "./constants";
import { PerpetualOuterBuffDictionary } from "./dictionary";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { ComponentStatus } from "core/subject-dynamic/status/type";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";

/**
 * `constants.ts`のキー名が`ComponentStatus`のフィールド名と一致しない場合の対応表。
 * ここに現れないキーは`ComponentStatus`のキーとそのまま同名（`defense`・`maxHp`・`adaptiveForce`・
 * `tenacity`・`lifeSteal`・`cooldownReduction`・`preventDamageRatio`）とみなす
 */
const StatusKeyAlias: Partial<Record<string, keyof ComponentStatus | "adaptiveForce">> = {
    movementSpeed: "moveSpeed",
    attack: "attackPower"
}

/**
 * `skill`/`equipment-ability`/`augment`/`tactical-skill`のいずれにも当てはまらない、その他の選択式自己バフ
 * （`origin: "misc"`）。オブジェクト討伐（アルファ・オメガ等）やアイテム使用（聖水等）による恒久バフなど、
 * 発生源のカテゴリを問わず1つに束ねる「その他もろもろ」のカタログ。ユーザーが`self-buffs.tsx`の追加UIから
 * 任意に選択する（`selectable-self-buff-catalog.ts`参照）。
 *
 * 装備アビリティ由来のバフのような「発生源アイテム名」の表記はしない（`self-buffs.tsx`・`source.ts`参照）。
 * `nameIntlID`（例:「アルファ処置」「聖水」）単体で何のバフか判別できるものだけをここに置く方針のため。
 *
 * 効果量は`constants.ts`を単一の情報源とし（パッチ反映時はそちらのみ編集する）、ここでは`constants.ts`の
 * 各エントリと`dictionary.ts`（表示名・ローカルID）を突き合わせて`BuffDebuffDefinition`を組み立てる
 * だけの「配線」に徹する。全項目とも最大スタック1（ON/OFF）の切り替え可能バフで、効果量はすべて固定値の
 * 加算（`calculationType: "sum"`）
 */
export const MiscBuffDebuff: Record<string, BuffDebuffDefinition> = Object.fromEntries(
    Object.entries(Constants).map(([key, effects]) => {
        const { localId, nameIntlID } = PerpetualOuterBuffDictionary[key as keyof typeof Constants];

        const definition: BuffDebuffDefinition = {
            origin: "misc",
            nameIntlID,
            maxStack: 1,
            buff: stack => Object.fromEntries(
                Object.entries(effects).map(([field, value]) => {
                    const statusKey = StatusKeyAlias[field] ?? field;
                    const component: StatusValueComponent = {
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: nameIntlID,
                        value: { type: "constant", value: value * stack }
                    };
                    return [statusKey, [component]];
                })
            ) as Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent[]>>
        };

        return [localId, definition];
    })
);
