import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "components/subject/standard-values";
import SkillDamage from "./skill-damage";
//import Hypercharge from "./aiden-hypercharge";
//import Rio from "./rio";
import { styles } from "@app/util/style";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage, useIntl } from "react-intl";
import { SummonedStatus } from "components/subjects/summoned-status";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";
import { calculateValue } from "app-types/value-ratio/calculation";
import { Source } from "app-types/value-ratio";
import Decimal from "decimal.js";
import { hyperChargeMultiplier } from "../simple/aiden-hypercharge";


type Props = {
    status: Status
    config: SubjectConfig
    table: DamageTable
    weaponType?: WeaponTypeID
    children?: React.ReactNode
}

const basicAttack: React.FC<Props> = props => {
    const intl = useIntl();
    const summonedName = React.useMemo(() => {
        const module = SummonedStatus[props.config.subject];
        if (module == undefined) return undefined;
        return intl.formatMessage({id: module.nameKey});
    }, [props.config.subject]);

    console.log(props.table.basicAttack)

    return (
        <tbody>
            {
                props.table.basicAttack.includes("standard") || props.table.basicAttack.find(t => (t as any).type == "basic" && (t as any).disableCritical != true) ?
                <tr className={styles(table.separator)}>
                    <td><FormattedMessage id="app.basic-attack" /></td>
                    <td><FormattedMessage id="app.label.calculated" /></td>
                    <td><FormattedMessage id="app.label.target-hp-ratio" /></td>
                </tr> :
                <tr className={table.separator}>
                    <td colSpan={2}><FormattedMessage id="app.basic-attack" /></td>
                    <td><FormattedMessage id="app.standard-value" /></td>
                </tr>
            }
            {
                props.table.basicAttack.map(def => {
                    if (typeof def === "string") {
                        if (def == "rio") {
                            return null;
                        }
                        if (def == "aiden") {
                            const base = props.status.attackPower.calculatedValue.addPercent(props.status.basicAttackAmp.calculatedValue);
                            const multiplier = hyperChargeMultiplier(props.config, props.status)
                            return <BasicAttackDamage 
                                key="aiden" 
                                name={<FormattedMessage id="subject.aiden.hypercharge-aa" />}
                                status={props.status}
                                potency={base.addPercent(multiplier)}
                                disableCritical={true}
                            />;
                        }

                        const [baseRatio, label] = (() => {
                            switch (props.weaponType) {
                                case "assault_rifle":
                                    return [AssaultRifleAttackRatio.reduce((p, c) => p + c, 0), <FormattedMessage id="app.basic-attack.assault-rifle" />];
                                case "dual_swords":
                                    return [DualSwordsAttackRatio.reduce((p, c) => p + c, 0), <FormattedMessage id="app.basic-attack.dual-sword" />];
                                default:
                                    return [100, <FormattedMessage id="app.basic-attack" />];
                            }
                        })();

                        return (
                            <>
                                <BasicAttackDamage 
                                    key="standard" 
                                    name={label}
                                    status={props.status}
                                    config={{attack: baseRatio, basicAttackAmp: 100}}
                                />
                            </>
                        )
                    } else if (def.type == "basic" || def.type == "summoned" || def.type == "basic-nocrit") {
                        const level = (props.config.skillLevels as any)[def.skill];
                        const sanitizedDict = Object.fromEntries(
                            Object.entries(def.value).map(([key, value]) => {
                                return [key, Array.isArray(value) ? value[level] : value]
                            })
                        );
                        const multiplier = def.multiplier?.reduce((prev, current) => {
                            const anyC = current as any;
                            if (anyC.basic != undefined) {
                                return prev / 100 * (Array.isArray(anyC.basic) ? anyC.basic[level] : anyC.basic);
                            }
                            return prev / 100 * (Array.isArray(anyC) ? anyC[level] : anyC);
                        }, 100);

                        return <BasicAttackDamage 
                            key={def.label} 
                            name={def.label} 
                            status={props.status} 
                            config={sanitizedDict}
                            multiplier={multiplier}
                            disableCritical={def.type == "basic-nocrit"}
                            summonedName={def.type == "summoned" ? summonedName : undefined} 
                        />
                    } else {
                        return <SkillDamage {...def as any} status={props.status} config={props.config} />
                    }
                })
            }
            {props.children}
        </tbody>
    )
};

export default basicAttack;