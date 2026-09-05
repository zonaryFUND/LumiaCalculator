import { defineSubject } from "../type";
import damageTable from "./damage-table";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";
import perpetualStatus from "./perpetual-status";
import { selfBuffDebuff, slowSources } from "./buff-debuff";


export default defineSubject({
    code: 24,
    damageTable,
    perpetualStatus,
    buffDebuff: selfBuffDebuff,
    slowSources,
    // 近接武器（レイピア・バット）のみ装備可能だが、スキル仕様上常に遠隔実験体として扱われる特別枠
    // （core/README.mdの近接/遠隔判定の項目参照）
    weaponRangeOverride: () => "range",

    skills: {
        listExpression: () => ({
            Q: Q.code,
            W: W.code,
            E: E.code,
            R: R.code,
            T: T.code
        }),
        tooltip: {
            [Q.code]: Q.info,
            [W.code]: W.info,
            [E.code]: E.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})