import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import * as Q from "./q";
import * as Q2 from "./q2";
import * as Q3 from "./q3";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 58,
    damageTable,

    skills: {
        listExpression: () => ({
            Q: [Q.code, Q2.code, Q3.code],
            W: W.code,
            E: E.code,
            R: R.code,
            T: T.code
        }),
        tooltip: {
            [Q.code]: Q.info,
            [Q2.code]: Q2.info,
            [Q3.code]: Q3.info,
            [W.code]: W.info,
            [E.code]: E.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})