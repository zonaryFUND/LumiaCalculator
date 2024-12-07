import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import StandardExpand from "./expand/standard";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { FirstAid, Shield, Sword, ArrowFatLinesUp, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import style from "./00_toughness.module.styl";
import useStorageBoolean from "@app/storage/boolean";
import { ToughnessTableHiddenKey } from "@app/storage/status";

type Props = SubjectConfig & {
    status: Status
}

const toughness: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(ToughnessTableHiddenKey);
    const effectiveToughness = React.useMemo(() => {
        return props.status.maxHp.calculatedValue.times(props.status.defense.calculatedValue.add(100).dividedBy(100));
    }, [props.status.maxHp.calculatedValue, props.status.defense.calculatedValue]);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}>
                <td colSpan={2}><div><p><FormattedMessage id="app.toughness-header" />: {effectiveToughness.toString()}</p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
            </tr>
            <Column 
                name={<><FirstAid weight="fill" /><FormattedMessage id="status.maxhp"/></>} 
                value={props.status.maxHp.calculatedValue} 
                expand={<StandardExpand {...props.status.maxHp} level={props.level} digit={0} />}
                isHidden={hidden}
            />
            <Column 
                name={<><FirstAid /><FormattedMessage id="status.hpregen"/></>} 
                value={props.status.hpRegen.calculatedValue} 
                expand={<StandardExpand {...props.status.hpRegen} level={props.level} digit={2} />}
                isHidden={hidden}
            />
            <Column 
                name={<><Shield /><FormattedMessage id="status.defense"/></>} 
                value={props.status.defense.calculatedValue} 
                isHidden={hidden}
                expand={<StandardExpand {...props.status.defense} level={props.level} digit={0} />}
            />
            <Column 
                name={<><span className={style.reduction}><Shield /><Sword /></span><FormattedMessage id="status.basic-attack-damage-reduction" /></>} 
                value={
                    props.status.preventBasicAttackDamaged.calculatedValue.greaterThan(0) ?
                    <>
                        {props.status.preventBasicAttackDamagedRatio.calculatedValue.toString()}
                        <>% / </>
                        {props.status.preventBasicAttackDamaged.calculatedValue.toString()}
                    </> :
                    props.status.preventBasicAttackDamagedRatio.calculatedValue
                } 
                percent 
                isHidden={hidden}
                expand={
                    <InnerTable>
                        <Mastery perMastery={props.status.preventBasicAttackDamagedRatio.perMastery!} name={<FormattedMessage id="status.defense-mastery" />} mastery={props.defenseMastery} />
                        {
                            props.status.preventBasicAttackDamaged.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.preventBasicAttackDamaged.overrideAdditional.nameKey} /></td>
                                <td>{props.status.preventBasicAttackDamaged.overrideAdditional.value?.floor().toString()}</td>
                            </tr> 
                            :
                            null
                        }
                    </InnerTable>
                }
            />
            <Column 
                name={<><span className={style.reduction}><Shield /><ArrowFatLinesUp weight="fill" /></span><FormattedMessage id="status.skill-damage-reduction" /></>} 
                value={props.status.preventSkillDamagedRatio.calculatedValue} 
                percent 
                isHidden={hidden}
                expand={
                    <InnerTable>
                        <Mastery perMastery={props.status.preventSkillDamagedRatio.perMastery!} name={<FormattedMessage id="status.defense-mastery" />} mastery={props.defenseMastery} />
                        {props.status.preventSkillDamagedRatio.equipment ? <Equipment {...props.status.preventSkillDamagedRatio.equipment} level={props.level} percent={true} /> : null} 
                    </InnerTable>
                }
            />
        </tbody>
    )
};

export default toughness;