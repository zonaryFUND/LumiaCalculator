import { defineSubject } from "../type";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as MeleeQ from "./meleeq";
import * as RangeQ from "./rangeq";
import * as MeleeW from "./meleew";
import * as RangeW from "./rangew";
import * as MeleeE from "./meleee";
import * as RangeE from "./rangee";
import * as R from "./r";
import * as T from "./t";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";


export default defineSubject({
    code: 27,
    damageTable,
    statusOverride,

    skills: {
        listExpression: (config) => {
            const range = weaponRange(config);

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