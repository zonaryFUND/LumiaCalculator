import { defineSubject } from "../type";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as stack from "./stack";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 75,
    damageTable,
    statusOverride,
    stackInfo: {
        nameIntlID: stack.StackName,
        max: stack.MaxStack
    },
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