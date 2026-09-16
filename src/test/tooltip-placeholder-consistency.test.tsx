import * as React from "react";
import { afterAll, describe, expect, test } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { renderHook } from "@testing-library/react";
import { Locales } from "@app/App";
import { ValueContext } from "components/tooltip/value-context";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { extractSkillLevel } from "core/value-ratio";
import { SubjectTooltipDictionary } from "@app/ingame-params/subjects/dictionary";
import { WeaponSkillTooltipDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { EquipmentAbilityTooltipDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { EquipmentStatusDictionary } from "core/equipment";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

// 開発用ツール1: 実験体スキル・武器スキル・装備アビリティのツールチップについて、l10nテキスト中の
// {0}のような数値プレースホルダの集合と、SkillTooltipProps.values()/expansion.tipValues（装備は
// EquipmentAbilityTooltipDictionaryのtooltipValues()）が返すオブジェクトのキー集合を突き合わせ、
// 過不足を検出する。
//
// このアプリはNimbleNeuronの公式APIが提供しないスキル効果量を手動管理しており（CLAUDE.md参照）、
// ローカライズテキスト（ゲーム内の原文から都度取得し直す想定、l10n.json）とスキル定義Props側の実装は
// 独立して更新されうる。リワークが入っていない実験体・装備でも、翻訳表現の修正や情報の追記でテキスト側の
// プレースホルダ番号が変わることがあり、対応するvalues()側の更新を忘れると表示上「{n}」が生の文字列の
// まま残る（formatted-text.tsxのreplace()は対応するキーがなければクラッシュせず元の"{n}"を残すため）。
//
// SubjectConfig/Statusの値は、プレースホルダの「有無」だけを見るため任意の値で構わない
// （SubjectConfigDefaultを全スキル・全アイテムに対して一律で使う。数値の正しさは検証しない）。
//
// 既知の限界:
// - {intlID: "..."}形式のプレースホルダ値（他のl10nキーをラベルとして挿入するもの）は、「このキーが
//   存在する」ことまでしか確認しない。参照先のintlIDテキスト自身が持つプレースホルダは再帰的に検証しない
// - 2026-09、初回実行で852件中483件の不一致が検出された（既存のツールチップ全量を対象に、この種の
//   照合を行ったことが過去になかったため）。1件ずつ即座に直せる量ではないため、既知の不一致を
//   tooltip-placeholder-known-mismatches.jsonにベースラインとして記録し、このテストはベースラインに
//   ない「新規の」不一致のみを失敗として報告する（＝今後のパッチ対応で新たに不一致が発生した場合のみ
//   検知する回帰ガード）。ベースラインの再生成は下記参照

const config = SubjectConfigDefault;
const status = statusOf(config, 100);

type MismatchSet = { missing: number[], excess: number[] }
type Baseline = Record<string, MismatchSet>

const BaselinePath = path.join(__dirname, "tooltip-placeholder-known-mismatches.json");

// TOOLTIP_BASELINE_REGENERATE=1 yarn test --run src/test/tooltip-placeholder-consistency.test.ts
// で実行すると、その時点で検出された不一致すべてでベースラインファイルを上書きする（アサーションは行わない）。
// 既知の不一致を修正した後や、まとまった見直しの後に使う想定
const regenerateBaseline = process.env.TOOLTIP_BASELINE_REGENERATE == "1";

const knownBaseline: Baseline = fs.existsSync(BaselinePath) ? JSON.parse(fs.readFileSync(BaselinePath, "utf-8")) : {};
const collectedBaseline: Baseline = {};

afterAll(() => {
    if (!regenerateBaseline) return;
    const sorted = Object.fromEntries(Object.entries(collectedBaseline).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(BaselinePath, JSON.stringify(sorted, null, 4) + "\n");
});

function placeholderIndices(text: string | undefined): number[] {
    if (text == undefined) return [];
    return [...text.matchAll(/\{(\d+)\}/g)].map(m => Number(m[1])).sort((a, b) => a - b);
}

function diffKeys(textIndices: number[], valueKeys: number[]): MismatchSet {
    return {
        missing: textIndices.filter(i => !valueKeys.includes(i)),
        excess: valueKeys.filter(i => !textIndices.includes(i))
    };
}

/**
 * @param baselineKey ベースラインファイル中でこのチェックを一意に識別するキー。実験体・武器スキルは
 * textKey自体（コードを含み一意）で足りるが、装備アビリティは同一skillCodeを複数アイテムが共有し
 * dmg/valuesがアイテムごとに異なるため、呼び出し側でitemIDを含めた識別子を渡す
 */
function checkMismatch(baselineKey: string, textKey: string, text: string, valueKeys: number[]) {
    const { missing, excess } = diffKeys(placeholderIndices(text), valueKeys);

    if (regenerateBaseline) {
        if (missing.length || excess.length) collectedBaseline[baselineKey] = { missing, excess };
        return;
    }

    const known = knownBaseline[baselineKey] ?? { missing: [], excess: [] };
    const newMissing = missing.filter(i => !known.missing.includes(i));
    const newExcess = excess.filter(i => !known.excess.includes(i));

    expect(newMissing, `${textKey}: 新規に検出された未定義プレースホルダ {${newMissing}}（表示上「{n}」が生のまま残る）`).toEqual([]);
    expect(newExcess, `${textKey}: 新規に検出された未使用キー [${newExcess}]`).toEqual([]);
}

/**
 * 実験体スキル・武器スキル（SkillTooltipProps）共通のチェック。本文（Desc/Coef）とExpansionTipの
 * 両方を見る
 */
function checkSkillTooltip(code: number, info: SkillTooltipProps) {
    for (const showEquation of [false, true]) {
        const textKey = (showEquation ? info.overrideIntlID?.coef : info.overrideIntlID?.desc)
            ?? `Skill/Group/${showEquation ? "Coef" : "Desc"}/${code}`;
        const text = Locales["ja"][textKey];
        if (text == undefined) continue; // 本文自体が存在しない場合は別の問題としてこのテストの対象外

        const values = info.values({ showEquation, config, status });
        checkMismatch(textKey, textKey, text, Object.keys(values).map(Number));
    }

    const expansionTextKey = `Skill/Group/ExpansionTip/${code}`;
    const expansionText = Locales["ja"][expansionTextKey];
    if (expansionText != undefined) {
        const skillLevel = extractSkillLevel(config, info.skillKey) ?? 0;
        const expansion = info.expansion({ skillLevel, config, status });
        checkMismatch(expansionTextKey, expansionTextKey, expansionText, Object.keys(expansion.tipValues ?? {}).map(Number));
    }
}

describe("実験体スキルのツールチップ", () => {
    const entries = Object.entries(SubjectTooltipDictionary).map(([code, info]) => ({
        code: Number(code),
        name: Locales["ja"][`Skill/Group/Name/${code}`] ?? code,
        info
    }));

    test.each(entries)("$name ($code)", ({ code, info }) => {
        checkSkillTooltip(code, info);
    });
});

describe("武器スキルのツールチップ", () => {
    const entries = Object.entries(WeaponSkillTooltipDictionary).map(([code, info]) => ({
        code: Number(code),
        name: Locales["ja"][`Skill/Group/Name/${code}`] ?? code,
        info
    }));

    test.each(entries)("$name ($code)", ({ code, info }) => {
        checkSkillTooltip(code, info);
    });
});

describe("装備アビリティのツールチップ", () => {
    // 同一skillCodeを複数アイテムが共有し、dmg/valuesがアイテムごとに異なることがあるため、
    // アビリティ単位ではなく「アイテム×付与されているアビリティ」単位で列挙する
    // （self-buff-definitions.tsのautoSelfBuffDefinitionsOf、item-tooltip.tsx参照）
    const entries = Object.entries(EquipmentStatusDictionary).flatMap(([itemID, itemStatus]) =>
        (itemStatus.skill ?? []).map(skill => ({
            itemID: Number(itemID),
            itemName: Locales["ja"][`Item/Name/${itemID}`] ?? itemID,
            skillName: skill.name,
            skillCode: skill.skillCode,
            skill,
            itemGrade: itemStatus.itemGrade
        }))
    );

    test.each(entries)("$itemName - $skillName ($skillCode)", ({ itemID, skillCode, skill, itemGrade }) => {
        // 稀星の輪廻（Vigor-Circulation）はNameとDescriptionでコードが異なる（skill.tsxの同名の対応参照）
        const sanitizedCode = skillCode == 6017006 ? 6017005 : skillCode;
        const tooltipValues = EquipmentAbilityTooltipDictionary[sanitizedCode];
        if (tooltipValues == undefined) return; // 定義自体がない場合は別の問題としてこのテストの対象外

        for (const showEquation of [false, true]) {
            const textKey = `Item/Skills/${sanitizedCode}/${showEquation ? "Desc" : "Body"}`;
            const text = Locales["ja"][textKey];
            if (text == undefined) continue;

            // 一部の装備アビリティ（flame_barrier等4件）はshowEquation/configを引数ではなく
            // useValueContext(Optional)()経由で読む実装になっており、Reactのレンダリング外で直接呼ぶと
            // フックが機能しない（クラッシュ、または無条件にfalse/undefinedへフォールバックして不正確な
            // 結果になる）。実際のitem-tooltip.tsx（ValueContext.Providerを経由してSkillへ渡す）と
            // 同じ状況を再現するため、renderHookでラップして呼び出す
            const { result } = renderHook(() => tooltipValues({
                showEquation,
                config,
                status,
                itemGrade,
                importedDamage: skill.dmg,
                importedValues: skill.values
            }), {
                wrapper: ({ children }) => <ValueContext.Provider value={{ showEquation, config, status }}>{children}</ValueContext.Provider>
            });
            checkMismatch(`${textKey}#item${itemID}`, textKey, text, Object.keys(result.current).map(Number));
        }
    });
});
