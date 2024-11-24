import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as Q from "./q";
import * as Q2 from "./q2";
import * as W from "./w";
import * as W2 from "./w2";
import * as E from "./e";
import * as E2 from "./e2";
import * as R from "./r";
import * as R2 from "./r2";
import * as T from "./t";


export default defineSubject({
    code: 57,
    damageTable,
    statusOverride,

    skills: {
        listExpression: () => ({
            Q: [Q.code, Q2.code],
            W: [W.code, W2.code],
            E: [E.code, E2.code],
            R: [R.code, R2.code],
            T: T.code
        }),
        tooltip: {
            [Q.code]: Q.info,
            [Q2.code]: Q2.info,
            [W.code]: W.info,
            [W2.code]: W2.info,
            [E.code]: E.info,
            [E2.code]: E2.info,
            [R.code]: R.info,
            [R2.code]: R2.info,
            [T.code]: T.info
        }
    }
})