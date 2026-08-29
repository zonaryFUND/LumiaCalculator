import * as React from "react";
import Column from "../components/column";
import { Drop, FirstAidKit } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import { HealTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import ChunkHeader from "./chunk-header";

const heal: React.FC = () => {
    const normalLifeSteal = useSubjectStateStore(s => s.status.normalLifeSteal);
    const lifeSteal = useSubjectStateStore(s => s.status.lifeSteal);
    const healerGiveHpHealRatio = useSubjectStateStore(s => s.status.healerGiveHpHealRatio);

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(HealTableHiddenKey);

    return (
        <tbody>
            <ChunkHeader 
                intlID="app.heal" 
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
            <Column 
                name={<><Drop /><FormattedMessage id="status.lifesteal" /></>} 
                value={normalLifeSteal.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><Drop /><FormattedMessage id="status.omnisyphon" /></>} 
                value={lifeSteal.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><FirstAidKit /><FormattedMessage id="status.heal-power" /></>} 
                value={healerGiveHpHealRatio.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default heal;