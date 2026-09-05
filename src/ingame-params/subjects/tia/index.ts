import { defineSubject } from "../type";
import damageTable from "./damage-table";
import perpetualStatus from "./perpetual-status";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";
import { selfBuffDebuff, slowSources } from "./buff-debuff";


export default defineSubject({
    code: 48,
    damageTable,
    perpetualStatus,
    buffDebuff: selfBuffDebuff,
    slowSources,
    // 近接武器（バット）のみ装備可能だが、スキル仕様上常に遠隔実験体として扱われる特別枠
    // （core/README.mdの近接/遠隔判定の項目参照）
    weaponRangeOverride: () => "range",

    skills: {
        listExpression: () => ({
            Q: [Q.y.code, Q.r.code, Q.b.code],
            W: {
                code: [W.y, W.r, W.b],
                maxLevel: 3
            },
            E: [E.y, E.r, E.b],
            R: R.code,
            T: {
                code: T.code,
                maxLevel: 5
            }
        }),
        tooltip: {
            [Q.y.code]: Q.y.info,
            [Q.r.code]: Q.r.info,
            [Q.b.code]: Q.b.info,
            [W.y]: W.info,
            [W.r]: W.info,
            [W.b]: W.info,
            [E.y]: E.info,
            [E.r]: E.info,
            [E.b]: E.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})