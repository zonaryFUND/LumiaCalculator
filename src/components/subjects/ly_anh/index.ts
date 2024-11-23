import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import * as HumanQ from "./lyanhq";
import * as GhostQ from "./ghostq";
import * as HumanW from "./lyanhw";
import * as GhostW from "./ghostw";
import * as HumanE from "./lyanhe";
import * as GhostE from "./ghoste";
import * as R from "./lyanhr";
import * as R2 from "./lyanhr2";
import * as T from "./lyanht";


export default defineSubject({
    code: 63,
    damageTable,

    skills: {
        listExpression: () => ({
            Q: [HumanQ.code, GhostQ.code],
            W: [HumanW.code, GhostW.code],
            E: [HumanE.code, GhostE.code],
            R: [R.code, R2.code],
            T: T.code
        }),
        tooltip: {
            [HumanQ.code]: HumanQ.info,
            [GhostQ.code]: GhostQ.info,
            [HumanW.code]: HumanW.info,
            [GhostW.code]: GhostW.info,
            [HumanE.code]: HumanE.info,
            [GhostE.code]: GhostE.info,
            [R.code]: R.info,
            [R2.code]: R2.info,
            [T.code]: T.info
        }
    }
})