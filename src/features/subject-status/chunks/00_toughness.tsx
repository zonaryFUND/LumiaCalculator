import * as React from "react";
import Column from "../components/column";
import ExpandStatus from "../components/inner-table/expanded-status-description";
import { FirstAid, Shield, Sword, ArrowFatLinesUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import style from "./00_toughness.module.styl"
import useStorageBoolean from "@app/storage/boolean";
import { ToughnessTableHiddenKey } from "@app/storage/status";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import ChunkHeader from "./chunk-header";

const toughness: React.FC = () => {
    const maxHp = useSubjectStateStore(s => s.status.maxHp);
    const defense = useSubjectStateStore(s => s.status.defense);
    const hpRegen = useSubjectStateStore(s => s.status.hpRegen);
    const preventBasicAttackDamaged = useSubjectStateStore(s => s.status.preventBasicAttackDamaged);
    const preventBasicAttackDamagedRatio = useSubjectStateStore(s => s.status.preventBasicAttackDamagedRatio);
    const preventSkillDamagedRatio = useSubjectStateStore(s => s.status.preventSkillDamagedRatio);

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(ToughnessTableHiddenKey);
    const effectiveToughness = React.useMemo(() => {
        return maxHp.calculatedValue.times(defense.calculatedValue.add(100).dividedBy(100));
    }, [maxHp.calculatedValue, defense.calculatedValue]);

    return (
        <tbody>
            <ChunkHeader 
                intlID="app.toughness-header" 
                additionalHead={<span>: {effectiveToughness.toString()}</span>}
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
                <Column 
                    name={<><FirstAid weight="fill" /><FormattedMessage id="status.maxhp"/></>} 
                    value={maxHp.calculatedValue} 
                    expand={<ExpandStatus {...maxHp} />}
                    isHidden={hidden}
                />
                <Column 
                    name={<><FirstAid /><FormattedMessage id="status.hpregen"/></>} 
                    value={hpRegen.calculatedValue} 
                    expand={<ExpandStatus {...hpRegen} />}
                    isHidden={hidden}
                />
                <Column 
                    name={<><Shield /><FormattedMessage id="status.defense"/></>} 
                    value={defense.calculatedValue} 
                    isHidden={hidden}
                    expand={<ExpandStatus {...defense} />}
                />
                <Column 
                    name={<><span className={style.reduction}><Shield /><Sword /></span><FormattedMessage id="status.basic-attack-damage-reduction" /></>} 
                    value={
                        preventBasicAttackDamaged.calculatedValue.greaterThan(0) ?
                        <>
                            {preventBasicAttackDamagedRatio.calculatedValue.toString()}
                            <>% / </>
                            {preventBasicAttackDamaged.calculatedValue.toString()}
                        </> :
                        preventBasicAttackDamagedRatio.calculatedValue
                    } 
                    percent 
                    isHidden={hidden}
                    expand={
                        <ExpandStatus 
                            {...preventBasicAttackDamagedRatio} 
                            components={[...preventBasicAttackDamagedRatio.components, ...preventBasicAttackDamaged.components.map(c => ({...c, percent: false}))]} 
                            percent 
                        />
                    }
                />
                <Column 
                    name={<><span className={style.reduction}><Shield /><ArrowFatLinesUp weight="fill" /></span><FormattedMessage id="status.skill-damage-reduction" /></>} 
                    value={preventSkillDamagedRatio.calculatedValue} 
                    percent 
                    isHidden={hidden}
                    expand={<ExpandStatus {...preventSkillDamagedRatio} percent />}
                />
        </tbody>
    )
};

export default toughness;