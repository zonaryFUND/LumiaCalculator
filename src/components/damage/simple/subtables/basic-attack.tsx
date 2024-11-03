import * as React from "react";
import table from "components/common/table.styl";
import { BasicAttackElement, DamageTable } from "components/subjects/damage-table";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "app-types/subject-dynamic/status/standard-values";
import StandardDamage from "./rows/standard-damage";
import UniqueExpression from "./rows/unique-expression";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage, useIntl } from "react-intl";
import CriticalAvailable from "./rows/critical-available";

type Props = {
    status: Status
    config: SubjectConfig
    elements: BasicAttackElement[]
    weaponType?: WeaponTypeID
}

const basicAttack: React.FC<Props> = props => {
    const intl = useIntl();
    const displayCriticalHead = props.elements.findIndex(element => { 
        if (element == "standard") return true;
        if (typeof element == "object" && element.type?.type == "basic" && element.type.critical != "none") return true;
        return false;
    }) != -1;

    const [standardBasicAttackRatio, standardBasicAttackLabelIntlID] = React.useMemo(() => {
        if (props.weaponType == "assault_rifle") {
            return [
                AssaultRifleAttackRatio.reduce((p, c) => p + c, 0),
                "app.basic-attack.assault-rifle"
            ]
        }
        if (props.weaponType == "dual_swords") {
            return [
                DualSwordsAttackRatio.reduce((p, c) => p + c, 0),
                "app.basic-attack.dual-sword"
            ]
        }
        if (props.weaponType == undefined) {
            return [undefined, undefined]
        }
        return [100, "app.basic-attack"]
    }, [props.weaponType]);

    return (
        <tbody>
            {
                <tr className={table.separator}>
                    {
                        displayCriticalHead ?
                        <>
                            <td><FormattedMessage id="app.basic-attack" /></td>
                            <td><FormattedMessage id="app.standard-value" /></td>
                            <td><FormattedMessage id="app.critical-hit" /></td>
                            <td><FormattedMessage id="app.expected-value" /></td>
                        </>
                        :
                        <>
                            <td colSpan={3}><FormattedMessage id="app.basic-attack" /></td>
                            <td><FormattedMessage id="app.standard-value" /></td>
                        </>
                    }
                </tr>
            }
            {
                props.elements.map(def => {
                    if (def == "standard" && standardBasicAttackRatio && standardBasicAttackLabelIntlID) {
                        return <CriticalAvailable
                            key="standard"
                            label={intl.formatMessage({id: standardBasicAttackLabelIntlID})}
                            value={{attack: standardBasicAttackRatio, basicAttackAmp: 100}}
                            config={props.config}
                            status={props.status}
                        />
                    }

                    if (def == "disable-critical" && standardBasicAttackRatio && standardBasicAttackLabelIntlID) {
                        return <StandardDamage 
                            key="disable-critical"
                            label={intl.formatMessage({id: standardBasicAttackLabelIntlID})}
                            type={{type: "basic", critical: "none"}}
                            value={{attack: standardBasicAttackRatio, basicAttackAmp: 100}}
                            config={props.config}
                            status={props.status}
                        />
                    }

                    if (typeof def == "object" && def.damageDependentHeal == undefined) {
                        if (typeof def.value == "function") {
                            return <UniqueExpression 
                                key={def.label}
                                {...def}
                                strategy={def.value}
                                config={props.config}
                                status={props.status}
                            />
                        } else if (def.type?.type == "basic" && def.type.critical == undefined) {
                            return <CriticalAvailable 
                                key={def.label}
                                label={def.label}
                                skillLevel={props.config.skillLevels[def.skill]}
                                value={def.value}
                                config={props.config}
                                status={props.status}
                            />
                        } else {
                            return <StandardDamage 
                                key={def.label}
                                {...def}
                                skillLevel={props.config.skillLevels[def.skill]}
                                value={def.value}
                                config={props.config}
                                status={props.status}
                            />
                        }
                    }

                    return null;
                })
            }
        </tbody>
    )
};

export default basicAttack;