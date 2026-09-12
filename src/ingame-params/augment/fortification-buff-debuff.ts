import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import Fortification from "./fortification";

/**
 * 抵抗系特性（`fortification.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の
 * `AugmentBuffDebuff`から集約される。
 *
 * 現時点では「堅固」（`Trait/Name/7110401`）のみ実装（バフ・デバフ選択式自己バフのインターフェース検証用の
 * サンプル。破壊系・カオス系のパス完了後、抵抗系サブ特性から本格着手する）
 */
export const FortificationBuffDebuff = (config: SubjectConfig, _status: Status, _currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
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
