import { defineSubject } from "../dictionary";
import damageTable from "./damage-table";
import * as Q from "./q";
import * as W from "./w";
import * as E from "./e";
import * as R from "./r";
import * as T0 from "./t0";
import * as T1 from "./t1";
import * as T2 from "./t2";
import * as T3 from "./t3";
import { weaponType } from "./weapon-type";

export default defineSubject({
    code: 44,
    damageTable,

    skills: {
        listExpression: (config) => {
            const weapon = weaponType(config.equipment.Weapon);
            const rCode = (() => {
                switch (weapon) {
                    case "sidewinder":
                        return R.SidewinderRCode;
                    case "blackmamba":
                        return R.BlackmambaRCode;
                    case "deathadder":
                        return R.DeathadderRCode;
                    case null:
                        return R.ViperRCode;
                }  
            })();

            const T = (() => {
                switch (weapon) {
                    case "sidewinder":
                        return T1;
                    case "blackmamba":
                        return T2;
                    case "deathadder":
                        return T3;
                    case null:
                        return T0;
                }  
            })()

            return {
                Q: Q.code,
                W: W.code,
                E: E.code,
                R: {
                    maxLevel: 4,
                    code: rCode
                },
                T: {
                    maxLevel: "none",
                    code: T.code
                }
            }
        },
        tooltip: {
            [Q.code]: Q.info,
            [W.code]: W.info,
            [E.code]: E.info,
            ...R.difinitions,
            [T0.code]: T0.info,
            [T1.code]: T1.info,
            [T2.code]: T2.info,
            [T3.code]: T3.info
        }
    }
})