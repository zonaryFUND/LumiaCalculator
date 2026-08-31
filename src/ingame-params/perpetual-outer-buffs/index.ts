import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";

/**
 * `skill`/`equipment-ability`/`augment`/`tactical-skill`のいずれにも当てはまらない、その他の選択式自己バフ
 * （`origin: "misc"`）。オブジェクト討伐（アルファ・オメガ等）やアイテム使用（聖水等）による恒久バフなど、
 * 発生源のカテゴリを問わず1つに束ねる「その他もろもろ」のカタログ。ユーザーが`self-buffs.tsx`の追加UIから
 * 任意に選択する（`selectable-self-buff-catalog.ts`参照）。
 *
 * 装備アビリティ由来のバフのような「発生源アイテム名」の表記はしない（`self-buffs.tsx`・`source.ts`参照）。
 * `nameIntlID`（例:「アルファ処置」「聖水」）単体で何のバフか判別できるものだけをここに置く方針のため
 */
export const MiscBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // アルファ処置時、ゲーム終了まで適合能力値獲得
    "misc.alpha-elimination-buff": {
        origin: "misc",
        nameIntlID: "misc.alpha-elimination-buff",
        maxStack: 1,
        buff: stack => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/5003000",
                value: {
                    type: "constant",
                    value: stack * 3
                }
            }]
        })
    },
    // 聖水使用時、ゲーム終了まで防御力獲得
    "misc.holy-water-buff": {
        origin: "misc",
        nameIntlID: "misc.holy-water-buff",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/503501",
                value: {
                    type: "constant",
                    value: stack * 9
                }
            }]
        })
    }
};
