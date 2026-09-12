import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { calculateValue } from "core/value-ratio";
import Fortification from "./fortification";

// 特性「鎮痛剤」の防御力増加量を、自身の現在体力割合（`currentHPRatio`）から算出する。満タン（100%）で
// 効果0、残り体力がしきい値（40%）まで低下すると線形に増加して最大値（`maxStatus.defense`）に達し、
// それ以下は頭打ちになる
function painkillerDefense(currentHPRatio: number): number {
    const { threshold, maxStatus } = Fortification.painkiller;

    if (currentHPRatio >= 100) return 0;
    if (currentHPRatio <= threshold) return maxStatus.defense;
    return maxStatus.defense * (100 - currentHPRatio) / (100 - threshold);
}

// 特性「熱処理」の選択肢: 「なし」(index 0)・「2日目昼開始」(index 1、`status.defense`のみ)・
// 「+1」〜「+15」(index 2〜16、80秒サイクルの経過数だけ`additionalStatus.defense`を積み増す)。
// 経過サイクル数に理論上の上限はないが、現在のゲーム内サイクル長（2日目昼〜1200秒程度を想定）から
// ユーザー指定で+15を上限とする
const TemperingMaxCycles = 15;
const TemperingMaxStack = TemperingMaxCycles + 1;
const TemperingStackLabels = [
    "buff-debuff.common.none",
    "augment.tempering.day2-noon",
    ...Array.from({ length: TemperingMaxCycles }, (_, i) => `augment.tempering.plus.${i + 1}`)
];

function temperingDefense(index: number): number {
    const selected = index >= 1 ? 1 : 0;
    const cycles = Math.max(index - 1, 0);
    return (Fortification.tempering.status.defense + Fortification.tempering.additionalStatus.defense * cycles) * selected;
}

/**
 * 抵抗系特性（`fortification.ts`）のスロウ情報。実際のスロウ効果自体は個別実装せず汎用デバフ
 * （`ingame-params/buff-debuff/generic-slow.ts`）に一本化されるため、ここは辞書UI表示専用の参照データ
 * （計算には一切関与しない。`augment/dictionary.ts`経由で`slow-dictionary.ts`に集約される）
 */
export const FortificationSlowSources: SlowSourceInfo[] = [
    // 金剛: 発動時、範囲内の敵にスロウ
    { nameIntlID: "Trait/Name/7100101", values: [Fortification.diamondShard.slow.effect] },
    // 応報: スタック消耗時、近接実験体のみスロウ（データ上`melee_slow`のみ存在し、遠隔実験体向けの
    // 対応する効果は見当たらない）
    { nameIntlID: "Trait/Name/7100501", values: [Fortification.bitterRetribution.melee_slow.effect] }
];

/**
 * 抵抗系特性（`fortification.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の
 * `AugmentBuffDebuff`から集約される
 */
export const FortificationBuffDebuff = (config: SubjectConfig, status: Status, currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
    // 金剛: 自己バフ、防御力増加（flat、レベル依存）。敵へのスロウは`FortificationSlowSources`参照
    "augment.diamond-shard": {
        origin: "augment",
        nameIntlID: "Trait/Name/7100101",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7100101",
                value: { type: "constant", value: calculateValue(Fortification.diamondShard.status.defense, status, config, "other").static.mul(stack) }
            }]
        })
    },
    // 不壊: 自己バフ、被ダメージ減少+妨害耐性増加（近接/遠隔で効果量が異なる。妨害耐性は防御力比例の
    // ValueRatioのため`calculateValue`で解決する）
    "augment.ironclad": {
        origin: "augment",
        nameIntlID: "Trait/Name/7100201",
        maxStack: 1,
        buff: stack => {
            const range = weaponRangeOf(config);
            const preventDamageRatio = calculateValue(Fortification.ironclad.status.preventDamageRatio[range], status, config, "other").static;
            const tenacity = calculateValue(Fortification.ironclad.status.tenacity[range], status, config, "other").static;

            return {
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "Trait/Name/7100201",
                    value: { type: "constant", value: preventDamageRatio.mul(stack) }
                }],
                tenacity: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "Trait/Name/7100201",
                    value: { type: "constant", value: tenacity.mul(stack) }
                }]
            };
        }
    },
    // 光の守護: 自己バフ、移動速度増加
    "augment.heavy-kneepads": {
        origin: "augment",
        nameIntlID: "Trait/Name/7100401",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "Trait/Name/7100401",
                value: { type: "constant", value: Fortification.heavyKneepads.status.movementSpeed * stack }
            }]
        })
    },
    // 応報: 失った体力1%ごとに1スタック（最大30、＝消耗体力30%で飽和）を自動獲得し、スタックごとに
    // 被ダメージ減少0.2%を得る。実際のゲーム内スタックは被ダメージの累積というイベント履歴に依存し
    // この計算機では追跡できないが、`currentHPRatio`（体力スライダー）からその時点の想定スタック数を
    // 逆算できるため、ユーザー操作はこのバフ自体のON/OFFのみ（スタック数は選択不可）としつつ、
    // 効果量は選択中の体力スライダーに応じて自動的に変化する。敵へのスロウは`FortificationSlowSources`参照
    "augment.bitter-retribution": {
        origin: "augment",
        nameIntlID: "Trait/Name/7100501",
        maxStack: 1,
        buff: stack => {
            const lostHPRatio = 100 - currentHPRatio;
            const stacks = Math.min(Math.floor(lostHPRatio * Fortification.bitterRetribution.stackPerLostHp), Fortification.bitterRetribution.max_stack);

            return {
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "Trait/Name/7100501",
                    value: { type: "constant", value: Fortification.bitterRetribution.status.preventDamageRatio * stacks * stack }
                }]
            };
        }
    },
    // 大胆: 自己バフ、防御力増加（flat、レベル依存）
    "augment.embolden": {
        origin: "augment",
        nameIntlID: "Trait/Name/7110101",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7110101",
                value: { type: "constant", value: calculateValue(Fortification.embolden.status.defense, status, config, "other").static.mul(stack) }
            }]
        })
    },
    // 鎮痛剤: 自己バフ、失った体力に比例した防御力増加（`painkillerDefense`参照）。残り体力40%で飽和
    "augment.painkiller": {
        origin: "augment",
        nameIntlID: "Trait/Name/7111001",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7111001",
                value: { type: "constant", value: painkillerDefense(currentHPRatio) * stack }
            }]
        })
    },
    // 警戒心: 自己バフ、被ダメージ減少（レベル依存のValueRatio）
    "augment.caution": {
        origin: "augment",
        nameIntlID: "Trait/Name/7111101",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7111101",
                value: { type: "constant", value: calculateValue(Fortification.caution.status.preventDamageRatio, status, config, "other").static.mul(stack) }
            }]
        })
    },
    // 特攻隊: 自己バフ、被ダメージ減少（固定値4%）
    "augment.cavalcade": {
        origin: "augment",
        nameIntlID: "Trait/Name/7110201",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7110201",
                value: { type: "constant", value: Fortification.cavalcade.status.preventDamageRatio * stack }
            }]
        })
    },
    // 熱処理: 自己バフ、2日目昼開始で防御力増加、以降80秒サイクルごとに増加（`temperingDefense`参照）
    "augment.tempering": {
        origin: "augment",
        nameIntlID: "Trait/Name/7111201",
        maxStack: TemperingMaxStack,
        stackLabels: TemperingStackLabels,
        buff: index => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7111201",
                value: { type: "constant", value: temperingDefense(index) }
            }]
        })
    },
    // 堅固: 選択式自己バフのインターフェース検証用に最初に実装したサンプル
    "augment.steadfast": {
        origin: "augment",
        nameIntlID: "Trait/Name/7110401",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7110401",
                value: {
                    type: "constant",
                    value: (Fortification.steadfast.status.tenacity.base + Fortification.steadfast.status.tenacity.level * config.level) * stack
                }
            }]
        })
    }
});

/**
 * 抵抗系特性（`fortification.ts`）が他者（味方・敵）に与えるバフ・デバフの定義（`origin: "augment"`）。
 * `buff-debuff.ts`の`AugmentGivenBuffDebuff`から集約される。現時点では対象がない
 */
export const FortificationGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {};
