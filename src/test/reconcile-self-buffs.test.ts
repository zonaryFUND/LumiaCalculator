import { describe, expect, test } from "vitest";
import { reconcileSelfBuffs } from "@app/ingame-params/buff-debuff/self-buff-definitions";
import { selectableSelfBuffCatalogOf } from "@app/ingame-params/buff-debuff/selectable-self-buff-catalog";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { SubjectConfigDefault } from "core/subject-dynamic/config";

// reconcileSelfBuffsは、パッチで実験体スキル・装備アビリティ・特性・戦術スキルのバフが削除・差し替え
// られた場合に、次回起動時（persistのmerge）・実験体/装備変更時に自己バフ欄を自動的に最新化する
// （新idはstack 0で自動追加、もはやどこからも解決できなくなった旧idは取り除く）。
//
// 「特性・戦術スキルはユーザーが自ら選択して追加するものなので、実験体・装備の変更に連動して勝手に
// 追加・削除してはいけない」という制約と、「削除されたバフのidだけはいつまでも残り続けないようにする」
// という要請を両立させる必要がある（自動投入・削除される対象＝autoSelfBuffDefinitionsOfのkeyに含まれない、
// かつ現在の選択式カタログにも存在しない場合のみ取り除く）。
//
// 特定の特性名をテストに直接ハードコードすると、その特性自体が将来のパッチで削除された場合にゲームデータの
// 変化だけでテストが落ちてしまう（docs/testing-guidelines.md参照）。そのため、テスト対象のidは
// 「現在の選択式カタログから実際に1件取り出す」形で動的に取得し、パッチ耐性を持たせている。

const status = statusOf(SubjectConfigDefault, 100);
const existingSelectableId = Object.keys(selectableSelfBuffCatalogOf(SubjectConfigDefault, status, 100))[0];
const NonExistentID = "augment.this-id-should-never-exist-in-any-patch";

describe("reconcileSelfBuffs", () => {
    test("現在も選択式カタログに存在するidは、既存のstackを保持したまま残す", () => {
        const config = { ...SubjectConfigDefault, selfBuffs: [{ id: existingSelectableId, stack: 2 }] };
        const result = reconcileSelfBuffs(config, status, 100);
        expect(result.find(s => s.id == existingSelectableId)).toEqual({ id: existingSelectableId, stack: 2 });
    });

    test("もはやどの定義（自動投入対象・選択式カタログ）にも存在しないidは取り除く（バフの削除に相当）", () => {
        const config = { ...SubjectConfigDefault, selfBuffs: [{ id: NonExistentID, stack: 3 }] };
        const result = reconcileSelfBuffs(config, status, 100);
        expect(result.find(s => s.id == NonExistentID)).toBeUndefined();
    });

    test("有効なidと無効なidが混在していても、有効な方だけ残す", () => {
        const config = {
            ...SubjectConfigDefault,
            selfBuffs: [{ id: existingSelectableId, stack: 1 }, { id: NonExistentID, stack: 1 }]
        };
        const result = reconcileSelfBuffs(config, status, 100);
        expect(result.find(s => s.id == existingSelectableId)).toBeDefined();
        expect(result.find(s => s.id == NonExistentID)).toBeUndefined();
    });
});
