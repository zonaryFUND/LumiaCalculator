import * as React from "react";
import Column from "../components/column";
import { ArrowFatLinesUp, Hourglass } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import { SkillTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import ExpandStatus from "../components/inner-table/expanded-status-description";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import ChunkHeader from "./chunk-header";

const skill: React.FC = () => {
    const skillAmp = useSubjectStateStore(s => s.status.skillAmp);
    const cooldownReduction = useSubjectStateStore(s => s.status.cooldownReduction);
    const ultCooldownReduction = useSubjectStateStore(s => s.status.ultCooldownReduction);
    const tacticalSkillCooldownReduction = useSubjectStateStore(s => s.status.tacticalSkillCooldownReduction);

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(SkillTableHiddenKey);

    return (
        <tbody>
            <ChunkHeader 
                intlID="app.skill" 
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
            <Column 
                name={<><ArrowFatLinesUp weight="fill" /><FormattedMessage id="status.skill-amp" /></>} 
                value={skillAmp.calculatedValue}
                expand={
                    skillAmp.calculatedValue.isZero() ? null :
                    <ExpandStatus {...skillAmp} />
                }
                isHidden={hidden}
            />
            
            <Column 
                name={<><Hourglass /><FormattedMessage id="StatType/CooldownReduction" /></>} 
                value={<>{cooldownReduction.rawHasteValue.toString()}({cooldownReduction.calculatedValue.floor().toString()}%)</>} 
                isHidden={hidden}
                
            />
            <Column 
                name={<><Hourglass /><FormattedMessage id="StatType/UltCooldownReduction" /></>} 
                value={
                    <>
                        {ultCooldownReduction.rawHasteValue.sub(cooldownReduction.rawHasteValue).toString()}({ultCooldownReduction.calculatedValue.floor().toString()}%)</>
                }
                expand={
                    <ExpandStatus {...ultCooldownReduction} />
                }
                isHidden={hidden}
            />
            <Column 
                name={<><Hourglass /><FormattedMessage id="StatType/TacticalCooldownReduction" /></>} 
                value={<>{tacticalSkillCooldownReduction.rawHasteValue.toString()}({tacticalSkillCooldownReduction.calculatedValue.floor().toString()}%)</>} 
                isHidden={hidden}
            />
        </tbody>
    );
}

export default skill;
