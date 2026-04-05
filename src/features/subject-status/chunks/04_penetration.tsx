import * as React from "react";
import Column from "../components/column";
import { ShieldSlash } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import { PenetrationTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

import ExpandStatus from "../components/inner-table/expanded-status-description";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import ChunkHeader from "./chunk-header";

const penetration: React.FC = () => {
    const penetrationDefense = useSubjectStateStore(s => s.status.penetrationDefense);
    const penetrationDefenseRatio = useSubjectStateStore(s => s.status.penetrationDefenseRatio);

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(PenetrationTableHiddenKey);

    return (
        <tbody>
            <ChunkHeader 
                intlID="status.armor-penetration" 
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
            <Column 
                name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-constant" /></>} 
                value={penetrationDefense.calculatedValue} 
                isHidden={hidden} 
            />
            <Column 
                name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-ratio" /></>} 
                value={penetrationDefenseRatio.calculatedValue} 
                expand={
                    penetrationDefenseRatio.components.findIndex(c => c.origin != "equipment") > -1 ?
                    <ExpandStatus {...penetrationDefenseRatio} percent /> : null
                }
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default penetration;