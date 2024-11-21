import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as IremQ from "./iremq";
import * as CatQ from "./catq";
import * as IremW from "./iremw";
import * as CatW from "./catw";
import * as IremE from "./ireme";
import * as CatE from "./cate";
import * as IremR from "./iremr";
import * as CatR from "./catr";
import * as T from "./t";


export default defineSubject({
    code: 61,
    damageTable,
    statusOverride,

    skills: {
        listExpression: () => ({
            Q: [IremQ.code, CatQ.code],
            W: [IremW.code, CatW.code],
            E: [IremE.code, CatE.code],
            R: {
                maxLevel: 4,
                code: [IremR.code, CatR.code]
            },
            T: T.code
        }),
        tooltip: {
            [IremQ.code]: IremQ.info,
            [CatQ.code]: CatQ.info,
            [IremW.code]: IremW.info,
            [CatW.code]: CatW.info,
            [IremE.code]: IremE.info,
            [CatE.code]: CatE.info,
            [IremR.code]: IremR.info,
            [CatR.code]: CatR.info,
            [T.code]: T.info
        }
    }
})