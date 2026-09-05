import { defineSubject } from "../type";
import damageTable from "./damage-table";
import perpetualStatus from "./perpetual-status";
import * as MeleeQ from "./meleeq";
import * as RangeQ from "./rangeq";
import * as MeleeW from "./meleew";
import * as RangeW from "./rangew";
import * as MeleeE from "./meleee";
import * as RangeE from "./rangee";
import * as R from "./r";
import * as T from "./t";
import { weaponRangeOf } from "core/subject-dynamic/config";
import { selfBuffDebuff, slowSources } from "./buff-debuff";


export default defineSubject({
    code: 27,
    damageTable,
    perpetualStatus,
    buffDebuff: selfBuffDebuff,
    slowSources,
    // 近接・遠隔両方の武器を装備できる唯一の実験体。装備中は現在の武器種で共通規則通り一意に決まるため
    // undefinedを返し（共通ロジックに委ねる）、未装備時のデフォルト（近接）だけ上書きする
    // （core/README.mdの近接/遠隔判定の項目参照）
    weaponRangeOverride: config => config.equipment.Weapon == null ? "melee" : undefined,

    skills: {
        listExpression: (config) => {
            const range = weaponRangeOf(config);

            if (range == "melee") {
                return {
                    Q: MeleeQ.code,
                    W: MeleeW.code,
                    E: MeleeE.code,
                    R: R.code,
                    T: T.code
                }
            } else {
                return {
                    Q: RangeQ.code,
                    W: RangeW.code,
                    E: RangeE.code,
                    R: R.code,
                    T: T.code
                }
            }
        },
        tooltip: {
            [MeleeQ.code]: MeleeQ.info,
            [RangeQ.code]: RangeQ.info,
            [MeleeW.code]: MeleeW.info,
            [RangeW.code]: RangeW.info,
            [MeleeE.code]: MeleeE.info,
            [RangeE.code]: RangeE.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})