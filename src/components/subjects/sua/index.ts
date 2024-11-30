import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import * as Q from "./q";
import * as RQ from "./rq";
import * as W from "./w";
import * as RW from "./rw";
import * as E from "./e";
import * as RE from "./re";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 28,
    damageTable,

    skills: {
        listExpression: () => ({
            Q: [Q.code, RQ.code],
            W: [W.code, RW.code],
            E: [E.code, RE.code],
            R: R.code,
            T: T.code
        }),
        tooltip: {
            [Q.code]: Q.info,
            [RQ.code]: RQ.info,
            [W.code]: W.info,
            [RW.code]: RW.info,
            [E.code]: E.info,
            [RE.code]: RE.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})