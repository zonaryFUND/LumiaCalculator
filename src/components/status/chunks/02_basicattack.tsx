import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import BasePlusPerLevel from "./expand/base-plus-per-level";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { Sword, Plus, Wind, Crosshair, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import style from "./02_basicattack.module.styl";
import AttackSpeed from "./attack-speed";
import { BasicAttackTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

type Props = SubjectConfig & {
    status: Status
}
const basicAttack: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(BasicAttackTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}>
                <td colSpan={2}><div><p><FormattedMessage id="app.basic-attack" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
            </tr>
            <Column 
                name={<><Sword /><FormattedMessage id="status.attack-power" /></>} 
                value={props.status.attackPower.calculatedValue} 
                expand={
                    <InnerTable>
                        <BasePlusPerLevel 
                            {...props.status.attackPower} 
                            level={props.level} 
                            label={<FormattedMessage id="app.subject" />}
                            multiplierLabel={<FormattedMessage id="app.level" />}
                            digit={0}
                        />
                        {
                            props.status.attackPower.equipment ?
                            <Equipment
                                {...props.status.attackPower.equipment}
                                level={props.level}
                            />
                            : null
                        }
                        {
                            props.status.attackPower.perMastery ?
                            <Mastery 
                                perMastery={props.status.attackPower.perMastery} 
                                mastery={props.weaponMastery}
                                name={<FormattedMessage id="status.weapon-mastery" />}
                            />
                            : null
                        }
                        {
                            props.status.attackPower.equipment?.adaptive ?
                            <tr><td><FormattedMessage id="status.adaptive"/></td><td>{props.status.attackPower.equipment.adaptive.toString()}</td></tr>
                            : null
                        }
                        {
                            props.status.attackPower.overrideAdditional?.ratio ?
                            <tr><td><FormattedMessage id={props.status.attackPower.overrideAdditional.nameKey} /></td><td>{props.status.attackPower.overrideAdditional.ratio?.toString()}%</td></tr>
                            : null
                        }
                        {
                            props.status.attackPower.overrideAdditional?.value ?
                            <tr><td><FormattedMessage id={props.status.attackPower.overrideAdditional.nameKey} /></td><td>{props.status.attackPower.overrideAdditional.value.toString()}</td></tr>
                            : null
                        }
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><span className={style.basic_attack_amp}><Sword /><Plus weight="bold" /></span><FormattedMessage id="status.basic-attack-amp" /></>} 
                value={props.status.basicAttackAmp.calculatedValue}
                expand={
                    props.status.basicAttackAmp.calculatedValue.isZero() ? null :
                    <InnerTable>
                        <Mastery perMastery={props.status.basicAttackAmp.perMastery!} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                        {
                            props.status.basicAttackAmp.equipment?.perLevel ? 
                            <tr>
                                <td><FormattedMessage id="app.equipment" /></td>
                                <td>{props.status.basicAttackAmp.equipment.perLevel.toString()}% x <span className={table.small}><FormattedMessage id="app.level" /></span>{props.weaponMastery}
                                <> = {props.status.basicAttackAmp.equipment.perLevel.times(props.level).toString()}%</></td>
                            </tr> 
                            : null
                        }
                    </InnerTable>
                }
                percent
                isHidden={hidden}
            />
            <Column 
                name={<><AttackSpeed /><FormattedMessage id="status.attack-speed" /></>} 
                value={props.status.attackSpeed.calculatedValue} 
                expand={
                    <InnerTable>
                        <tr>
                            <td><FormattedMessage id="app.standard-value" /></td>
                            <td>
                                {
                                    props.status.attackSpeed.equipment?.constant ?
                                    <>
                                        <span className={table.small}><FormattedMessage id="app.standard-value" /></span>{props.status.attackSpeed.base?.toString()}
                                        <> + </>
                                        <span className={table.small}><FormattedMessage id="app.weapon" /></span>{props.status.attackSpeed.equipment.constant.toString()}
                                        <> = </>
                                        {props.status.attackSpeed.equipment.constant.add(props.status.attackSpeed.base ?? 0).cut(3, "floor").toString()}
                                    </>    
                                    :
                                    <><span className={table.small}><FormattedMessage id="app.standard-value" /></span>{props.status.attackSpeed.base?.toString()}</>
                                }                                            
                            </td>
                        </tr>
                        {
                            props.status.attackSpeed.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.attackSpeed.overrideAdditional.nameKey} /></td>
                                <td>{props.status.attackSpeed.overrideAdditional.ratio?.toString()}%</td>
                            </tr>
                            : null
                        }
                        {
                            props.status.attackSpeed.equipment?.ratio?.greaterThan(0) ?
                            <tr>
                                <td><FormattedMessage id="app.equipment" /></td>
                                <td>{props.status.attackSpeed.equipment.ratio.toString()}%</td>
                            </tr>
                            : null
                        }
                        {
                            props.status.attackSpeed.perMastery ? 
                            <Mastery perMastery={props.status.attackSpeed.perMastery} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                            : null
                        }
                        {
                            props.status.attackSpeed.overrideFix ?
                            <tr className={style.fixedvalue}><td><FormattedMessage id={props.status.attackSpeed.overrideFix.nameKey} /></td><td>{props.status.attackSpeed.overrideFix.value.toString()}</td></tr>
                            : null
                        }
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><Crosshair /><FormattedMessage id="status.critical-chance" /></>} 
                value={props.status.criticalChance.calculatedValue} 
                expand={
                    props.status.criticalChance.overrideAdditional == undefined ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.equipment" /></td><td>{props.status.criticalChance.equipment?.constant?.toString()}%</td></tr>
                        {
                            props.status.criticalChance.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.criticalChance.overrideAdditional.nameKey} /></td>
                                <td>{props.status.criticalChance.overrideAdditional.value?.toString()}%</td>
                            </tr>
                            : null
                        }
                    </InnerTable>
                }
                percent 
                isHidden={hidden}
            />
            <Column 
                name={<><span className={style.critical_damage}><Crosshair /><Plus weight="bold" /></span><FormattedMessage id="status.critical-damage" /></>} 
                value={props.status.criticalDamage.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default basicAttack;