import * as React from "react";
import Column from "../components/column";
import { ArrowFatLinesUp, Hourglass } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import { SkillTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import ExpandStatus from "../components/inner-table/expanded-status-description";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import useStatusWithoutBuffs from "../use-status-without-buffs";
import ChunkHeader from "./chunk-header";

const skill: React.FC = () => {
    const skillAmp = useSubjectStateStore(s => s.status.skillAmp);
    const withoutBuffs = useStatusWithoutBuffs();
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
                baseline={withoutBuffs.skillAmp.calculatedValue}
                expand={
                    skillAmp.calculatedValue.isZero() ? null :
                    <ExpandStatus {...skillAmp} />
                }
                isHidden={hidden}
                descriptionIntlID="tooltip.status.skill-amp"
            />

            <Column
                name={<><Hourglass /><FormattedMessage id="StatType/CooldownReduction" /></>}
                value={<>{cooldownReduction.rawHasteValue.toString()}({cooldownReduction.calculatedValue.floor().toString()}%)</>}
                isHidden={hidden}
                descriptionIntlID="tooltip.status.cooldown-reduction"
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
                descriptionIntlID="tooltip.status.ult-cooldown-reduction"
            />
            <Column
                name={<><Hourglass /><FormattedMessage id="StatType/TacticalCooldownReduction" /></>}
                value={<>{tacticalSkillCooldownReduction.rawHasteValue.toString()}({tacticalSkillCooldownReduction.calculatedValue.floor().toString()}%)</>}
                isHidden={hidden}
                descriptionIntlID="tooltip.status.tactical-cooldown-reduction"
            />
        </tbody>
    );
}

export default skill;
