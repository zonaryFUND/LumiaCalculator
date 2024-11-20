import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 43,
    damageTable,
    statusOverride,

    skills: {
        listExpression: () => ({
            Q: Q.code,
            W: W.code,
            E: E.code,
            R: {
                maxLevel: 5,
                code: R.code
            },
            T: {
                maxLevel: 2,
                code: T.code
            }
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