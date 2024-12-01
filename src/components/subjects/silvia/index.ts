import { defineSubject } from "../type";
import damageTable from "./damage-table";
import statusOverride from "./status-override";
import * as stack from "./stack";
import * as HumanQ from "./humanq";
import * as BikeQ from "./bikeq";
import * as HumanW from "./humanw";
import * as BikeW from "./bikew";
import * as HumanE from "./humane";
import * as BikeE from "./bikee";
import * as HumanR from "./humanr";
import * as BikeR from "./biker";
import * as T from "./t";


export default defineSubject({
    code: 16,
    damageTable,
    statusOverride,
    stackInfo: {
        nameIntlID: stack.StackNameIntlID,
        max: stack.MaxStack
    },

    skills: {
        listExpression: () => ({
            Q: [HumanQ.code, BikeQ.code],
            W: [HumanW.code, BikeW.code],
            E: [HumanE.code, BikeE.code],
            R: [HumanR.code, BikeR.code],
            T: T.code
        }),
        tooltip: {
            [HumanQ.code]: HumanQ.info,
            [BikeQ.code]: BikeQ.info,
            [HumanW.code]: HumanW.info,
            [BikeW.code]: BikeW.info,
            [HumanE.code]: HumanE.info,
            [BikeE.code]: BikeE.info,
            [HumanR.code]: HumanR.info,
            [BikeR.code]: BikeR.info,
            [T.code]: T.info
        }
    }
})