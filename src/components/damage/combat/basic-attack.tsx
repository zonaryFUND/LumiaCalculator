import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "app-types/subject-dynamic/status/standard-values";
//import SkillDamage from "./skill-damage";
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
import { extractMultiplier } from "../damage-table-util";


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
                        /*
                        if (def == "rio") {
                            const base = props.status.attackPower.calculatedValue;
                            const crit = criticalAddition(props.status);
                            return (
                                <>
                                    <BasicAttackDamage 
                                        key="rio-hankyu" 
                                        name={<FormattedMessage id="subject.rio.hankyu-aa" />}
                                        status={props.status}
                                        potency={base.percent(HankyuMultiplier).addPercent(props.status.basicAttackAmp.calculatedValue).floor().percent(crit)}
                                        disableCritical={true}
                                    />
                                    <BasicAttackDamage 
                                        key="rio-hankyu-2" 
                                        name={<FormattedMessage id="subject.rio.hankyu-aa-2hit" />}
                                        status={props.status}
                                        potency={base.percent(HankyuMultiplier * 2).addPercent(props.status.basicAttackAmp.calculatedValue).floor().percent(crit)}
                                        disableCritical={true}
                                    />
                                    <BasicAttackDamage 
                                        key="rio-daikyu" 
                                        name={<FormattedMessage id="subject.rio.daikyu-aa" />}
                                        status={props.status}
                                        potency={base.percent(DaikyuMultiplier).addPercent(props.status.basicAttackAmp.calculatedValue).floor().percent(crit)}
                                        disableCritical={true}
                                    />
                                </>
                            );
                        }*/

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
                    }/* else if (def.type?.type == "basic") {
                        const level = extractskillLevel(def, props.config);
                        const sanitizedDict = Object.fromEntries(
                            Object.entries(def.value).map(([key, value]) => {
                                return [key, Array.isArray(value) ? value[level] : value]
                            })
                        );
                        const multiplier = extractMultiplier(level, def.multiplier)?.[0];

                        return <BasicAttackDamage 
                            key={def.label} 
                            name={def.label} 
                            status={props.status} 
                            config={sanitizedDict}
                            multiplier={multiplier}
                            disableCritical={def.type.critical == "none"}
                            summonedName={def.type.fromSummoned ? summonedName : undefined} 
                        />
                    } else {
                        return <SkillDamage {...def as any} status={props.status} config={props.config} />
                    }
                        */
                })
            }
            {props.children}
        </tbody>
    )
};

export default basicAttack;