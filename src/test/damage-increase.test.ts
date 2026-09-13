import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { damageIncreaseRatiosOf, applyDamageIncrease, damageIncreaseSteps, DamageIncreaseEntry } from "core/damage-table/damage-increase";
import { statusValue, statusValueFromComponents, stubStatus } from "./helpers/status-stub";

// damageIncreaseRatiosOf/applyDamageIncreaseは、docs/known-issues.mdに記載の「与えるスキルダメージ増加」
// 効果（判定軸違いの2フィールド、increaseSkillDamageRatio/increaseSkillTypeDamageRatio）・
// increaseDamageRatio（劣勢克服型）・basicAttackDamageFinalCorrectionRatio（超集中型）を、
// DamageTableUnitのorigin/typeから判定して乗算する純粋関数。実機検証の結果、固定ダメージ（type: "true"）は
// いずれの効果も受け付けないことを確認済み。
//
// 執行人と予熱-増幅のように、同一フィールド（increaseSkillDamageRatio）に複数の発生源が同時に書き込む
// ケースが実際にありうる。実機検証の結果、これらは合算してから1回だけ乗算されるのではなく発生源ごとに
// 独立して乗算されることを確認済みのため、damageIncreaseRatiosOfは合算済みのcalculatedValueではなく
// 発生源ごとのcomponentsから1件ずつDamageIncreaseEntryを返す（ラベルもcomponentのintlIDに由来し、
// 同一の汎用ラベルを共有しない）

describe("damageIncreaseRatiosOf", () => {
    test("固定ダメージには何も適用しない", () => {
        const status = stubStatus({
            increaseSkillDamageRatio: statusValueFromComponents([{ value: 20 }]),
            increaseSkillTypeDamageRatio: statusValueFromComponents([{ value: 20 }]),
            increaseDamageRatio: statusValueFromComponents([{ value: 20 }]),
            basicAttackDamageFinalCorrectionRatio: statusValueFromComponents([{ value: 20 }])
        });
        expect(damageIncreaseRatiosOf(status, "Q", { type: "true" })).toEqual([]);
    });

    test("回復・シールド・miscには何も適用しない", () => {
        const status = stubStatus({ increaseDamageRatio: statusValueFromComponents([{ value: 20 }]) });
        expect(damageIncreaseRatiosOf(status, "other", { type: "heal", target: "self" })).toEqual([]);
        expect(damageIncreaseRatiosOf(status, "other", { type: "shield", target: "self" })).toEqual([]);
        expect(damageIncreaseRatiosOf(status, "other", { type: "misc" })).toEqual([]);
    });

    test("increaseSkillDamageRatio（執行人型）は発生源が実験体スキル・武器スキルなら適用する（typeがbasicでも適用）", () => {
        const status = stubStatus({ increaseSkillDamageRatio: statusValueFromComponents([{ intlID: "item-skill.brute-enforcer", value: 15 }]) });
        for (const origin of ["Q", "W", "E", "R", "T", "D"] as const) {
            expect(damageIncreaseRatiosOf(status, origin, { type: "skill" }).map(e => e.ratio.toNumber())).toEqual([15]);
            expect(damageIncreaseRatiosOf(status, origin, { type: "basic" }).map(e => e.ratio.toNumber())).toEqual([15]);
        }
    });

    test("increaseSkillDamageRatio（執行人型）は発生源が装備・戦術スキルなら適用しない", () => {
        const status = stubStatus({ increaseSkillDamageRatio: statusValueFromComponents([{ value: 15 }]) });
        for (const origin of ["tactical1", "tactical2", "other"] as const) {
            expect(damageIncreaseRatiosOf(status, origin, { type: "skill" })).toEqual([]);
        }
    });

    test("increaseSkillTypeDamageRatio（増幅ドローン型）はtypeがskillなら発生源を問わず適用する。basicには非適用", () => {
        const status = stubStatus({ increaseSkillTypeDamageRatio: statusValueFromComponents([{ value: 10 }]) });
        expect(damageIncreaseRatiosOf(status, "other", { type: "skill" }).map(e => e.ratio.toNumber())).toEqual([10]);
        expect(damageIncreaseRatiosOf(status, "other", undefined).map(e => e.ratio.toNumber())).toEqual([10]);
        expect(damageIncreaseRatiosOf(status, "Q", { type: "basic" })).toEqual([]);
    });

    test("basicAttackDamageFinalCorrectionRatio（超集中型）はtypeがbasicのときのみ適用する", () => {
        const status = stubStatus({ basicAttackDamageFinalCorrectionRatio: statusValueFromComponents([{ value: 8 }]) });
        expect(damageIncreaseRatiosOf(status, "other", { type: "basic" }).map(e => e.ratio.toNumber())).toEqual([8]);
        expect(damageIncreaseRatiosOf(status, "other", { type: "skill" })).toEqual([]);
    });

    test("increaseDamageRatio（劣勢克服型）はbasic・skillいずれでも発生源を問わず適用する", () => {
        const status = stubStatus({ increaseDamageRatio: statusValueFromComponents([{ value: 5 }]) });
        expect(damageIncreaseRatiosOf(status, "other", { type: "basic" }).map(e => e.ratio.toNumber())).toEqual([5]);
        expect(damageIncreaseRatiosOf(status, "tactical1", { type: "skill" }).map(e => e.ratio.toNumber())).toEqual([5]);
    });

    test("異なるフィールドの効果が同時に成立する場合、合算せずそれぞれ独立した要素として返す（増幅ドローン+劣勢克服など）", () => {
        const status = stubStatus({
            increaseSkillDamageRatio: statusValueFromComponents([{ intlID: "item-skill.brute-enforcer", value: 15 }]),
            increaseSkillTypeDamageRatio: statusValueFromComponents([{ intlID: "augment.amplification-drone", value: 10 }]),
            increaseDamageRatio: statusValueFromComponents([{ intlID: "augment.dismantle-goliath", value: 5 }])
        });
        const result = damageIncreaseRatiosOf(status, "Q", { type: "skill" });
        expect(result.map(e => e.ratio.toNumber())).toEqual([15, 10, 5]);
        expect(result.map(e => e.labelIntlID)).toEqual(["item-skill.brute-enforcer", "augment.amplification-drone", "augment.dismantle-goliath"]);
    });

    test("同一フィールドに複数の発生源が同時に書き込む場合（執行人+予熱-増幅など）、合算せず発生源ごとに独立した要素として返す", () => {
        const status = stubStatus({
            increaseSkillDamageRatio: statusValueFromComponents([
                { intlID: "item-skill.brute-enforcer", value: 15 },
                { intlID: "item-skill.blaze-up-amplified", value: 15 }
            ])
        });
        const result = damageIncreaseRatiosOf(status, "Q", { type: "skill" });
        expect(result.map(e => e.ratio.toNumber())).toEqual([15, 15]);
        expect(result.map(e => e.labelIntlID)).toEqual(["item-skill.brute-enforcer", "item-skill.blaze-up-amplified"]);
    });

    test("値が0以下なら適用しない", () => {
        const status = stubStatus({ increaseDamageRatio: statusValueFromComponents([{ value: 0 }]) });
        expect(damageIncreaseRatiosOf(status, "other", { type: "basic" })).toEqual([]);
    });

    test("componentsが空（何も設定していないフィールドはstubStatus由来）なら空配列を返す", () => {
        const status = stubStatus();
        expect(damageIncreaseRatiosOf(status, "Q", { type: "skill" })).toEqual([]);
    });
});

describe("applyDamageIncrease", () => {
    const entry = (ratio: number, labelIntlID?: string): DamageIncreaseEntry => ({ ratio: new Decimal(ratio), labelIntlID });

    test("entriesが空配列なら値は変化しない", () => {
        expect(applyDamageIncrease(new Decimal(1000), []).toNumber()).toBe(1000);
    });

    test("entriesが複数件なら、合算せずそれぞれ独立に順次乗算される", () => {
        // 1000 x (100% + 15%) x (100% + 10%) = 1265 （1000 x 125% = 1250 ではない）
        expect(applyDamageIncrease(new Decimal(1000), [entry(15), entry(10)]).toNumber()).toBe(1265);
    });
});

describe("damageIncreaseSteps", () => {
    const entry = (ratio: number, labelIntlID?: string): DamageIncreaseEntry => ({ ratio: new Decimal(ratio), labelIntlID });

    test("各段のbaseValueは、直前の段までを適用した結果になる（元の値を使い回さない）", () => {
        // 威力100に増幅ドローン15%・予熱-増幅15%が同時に乗る場合、
        // 1件目は「100 x 15% = 115」、2件目は「115 x 15%」であり、2件目も「100 x 15%」と表示するのは誤り
        const steps = damageIncreaseSteps(new Decimal(100), [entry(15, "drone"), entry(15, "amplified")]);
        expect(steps.map(s => s.baseValue.toNumber())).toEqual([100, 115]);
        expect(steps.map(s => s.baseValue.percent(s.entry.ratio).add(s.baseValue).toNumber())).toEqual([115, 132.25]);
    });

    test("entriesが空配列なら空配列を返す", () => {
        expect(damageIncreaseSteps(new Decimal(100), [])).toEqual([]);
    });

    test("最終段のbaseValue x (100+ratio)%は、applyDamageIncreaseの最終結果と一致する", () => {
        const entries = [entry(15), entry(10), entry(5)];
        const steps = damageIncreaseSteps(new Decimal(100), entries);
        const lastStep = steps[steps.length - 1];
        const lastStepResult = lastStep.baseValue.addPercent(lastStep.entry.ratio);
        expect(lastStepResult.toNumber()).toBe(applyDamageIncrease(new Decimal(100), entries).toNumber());
    });
});
