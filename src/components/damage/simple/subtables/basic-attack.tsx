import * as React from "react";
import table from "components/common/table.styl";
import { BasicAttackElement, DamageTable } from "components/subjects/damage-table";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "app-types/subject-dynamic/status/standard-values";
import StandardDamage from "./rows/standard-damage";
import UniqueExpression from "./rows/unique-expression";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage, useIntl } from "react-intl";
import CriticalAvailable from "./rows/critical-available";
import { DamageTableUnit } from "app-types/damage-table/unit";
import useBasicAttackInfo from "components/damage/use-basic-attack-info";

type Props = {
    status: Status
    config: SubjectConfig
    elements: (BasicAttackElement | DamageTableUnit & { skillLevel?: number })[][]
}

const basicAttack: React.FC<Props> = props => {
    const intl = useIntl();
    const displayCriticalHead = props.elements.flat().findIndex(element => { 
        if (element == "standard") return true;
        if (typeof element == "object" && element.type?.type == "basic" && element.type.critical != "none") return true;
        return false;
    }) != -1;

    const { 
        attackRatio: standardBasicAttackRatio, 
        labelIntlID: standardBasicAttackLabelIntlID
    } = useBasicAttackInfo(props.config);

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
                props.elements.reduce((prev, array, index) => {                    
                    const separator = index == 0 ? undefined : <tr key={`separator-${index}`} className={table.border}><td colSpan={4}></td></tr>;

                    const units = array.map(definition => {
                        if (definition == "standard" && standardBasicAttackRatio && standardBasicAttackLabelIntlID) {
                            return <CriticalAvailable
                                key="standard"
                                label={intl.formatMessage({id: standardBasicAttackLabelIntlID})}
                                value={{attack: standardBasicAttackRatio, basicAttackAmp: 100}}
                                config={props.config}
                                status={props.status}
                            />
                        }
    
                        if (definition == "disable-critical" && standardBasicAttackRatio && standardBasicAttackLabelIntlID) {
                            return <StandardDamage 
                                key="disable-critical"
                                label={intl.formatMessage({id: standardBasicAttackLabelIntlID})}
                                type={{type: "basic", critical: "none"}}
                                value={{attack: standardBasicAttackRatio, basicAttackAmp: 100}}
                                config={props.config}
                                status={props.status}
                            />
                        }
    
                        if (typeof definition == "object" && definition.damageDependentHeal == undefined) {
                            const skillLevel = ("skill" in definition) ? props.config.skillLevels[definition.skill] : definition.skillLevel;
                            if (typeof definition.value == "function") {
                                return <UniqueExpression 
                                    key={definition.label}
                                    {...definition}
                                    strategy={definition.value}
                                    config={props.config}
                                    status={props.status}
                                />
                            } else if (definition.type?.type == "basic" && definition.type.critical == undefined) {
                                return <CriticalAvailable 
                                    key={definition.label}
                                    label={definition.label}
                                    skillLevel={skillLevel}
                                    value={definition.value}
                                    config={props.config}
                                    status={props.status}
                                    multiplier={definition.multiplier}
                                />
                            } else {
                                return <StandardDamage 
                                    key={definition.label}
                                    {...definition}
                                    skillLevel={skillLevel}
                                    value={definition.value}
                                    config={props.config}
                                    status={props.status}
                                />
                            }
                        }

                        return null;
                    })
                    .filter((item): item is React.ReactElement => item != null);

                    return (separator ? prev.concat(separator) : prev).concat(units)
                }, [] as React.ReactElement[])
            }
        </tbody>
    )
};

export default basicAttack;