import { defineSubject } from "../type";
import damageTable from "./damage-table";
import * as DualSwordsQ from "./ds-q";
import * as DualSwordsW from "./ds-w";
import * as DualSwordsE from "./ds-e";
import * as DoubleBladedSwordQ from "./dbs-q";
import * as DoubleBladedSwordW from "./dbs-w";
import * as DoubleBladedSwordE from "./dbs-e";
import * as R from "./r";
import * as T from "./t";
import * as D from "./d";
import { weaponSkillLevel } from "./weapon-skill-level";
import { selfBuffDebuff, givenBuffDebuff, slowSources } from "./buff-debuff";


export default defineSubject({
    code: 84,
    damageTable,
    buffDebuff: selfBuffDebuff,
    givenBuffDebuff,
    slowSources,
    gaugeInfo: {
        nameIntlID: "subject.blair.vp",
        max: 200,
        changeColorOnMax: false
    },

    skills: {
        listExpression: () => ({
            Q: [DualSwordsQ.code, DoubleBladedSwordQ.code],
            W: [DualSwordsW.code, DoubleBladedSwordW.code],
            E: [DualSwordsE.code, DoubleBladedSwordE.code],
            R: R.code,
            T: T.code,
            D: D.code
        }),
        tooltip: {
            [DualSwordsQ.code]: DualSwordsQ.info,
            [DualSwordsW.code]: DualSwordsW.info,
            [DualSwordsE.code]: DualSwordsE.info,
            [DoubleBladedSwordQ.code]: DoubleBladedSwordQ.info,
            [DoubleBladedSwordW.code]: DoubleBladedSwordW.info,
            [DoubleBladedSwordE.code]: DoubleBladedSwordE.info,
            [R.code]: R.info,
            [T.code]: T.info,
            [D.code]: D.info
        }
    },
    
    weaponSkillLevelOverride: weaponSkillLevel
})