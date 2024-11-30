import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 48,
    damageTable,
    statusOverride,

    skills: {
        listExpression: () => ({
            Q: [Q.y.code, Q.r.code, Q.b.code],
            W: [W.y, W.r, W.b],
            E: [E.y, E.r, E.b],
            R: R.code,
            T: T.code
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