import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import * as DebiQ from "./debiq";
import * as DebiW from "./debiw";
import * as DebiE from "./debie";
import * as MarleneQ from "./marleneq";
import * as MarleneW from "./marlenew";
import * as MarleneE from "./marlenee";
import * as R from "./r";
import * as T from "./t";


export default defineSubject({
    code: 65,
    damageTable,

    skills: {
        listExpression: () => ({
            Q: [DebiQ.code, MarleneQ.code],
            W: [DebiW.code, MarleneW.code],
            E: [DebiE.code, MarleneE.code],
            R: R.code,
            T: T.code
        }),
        tooltip: {
            [DebiQ.code]: DebiQ.info,
            [DebiW.code]: DebiW.info,
            [DebiE.code]: DebiE.info,
            [MarleneQ.code]: MarleneQ.info,
            [MarleneW.code]: MarleneW.info,
            [MarleneE.code]: MarleneE.info,
            [R.code]: R.info,
            [T.code]: T.info
        }
    }
})