import { defineSubject } from "../type";
import damageTable from "./damage-table";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 52,
    damageTable,

    skills: {
        listExpression: () => ({
            Q: Q.code,
            W: W.code,
            E: E.code,
            R: {
                code: R.code,
                maxLevel: 4
            },
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