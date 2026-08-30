import * as React from "react";
import Column from "../components/column";
import { HandFist, SneakerMove, Boot, Eye, ArrowFatLineRight } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import { MiscTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

import ExpandStatus from "../components/inner-table/expanded-status-description";
import MoveSpeedSubRow from "./move-speed-sub-row";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import useStatusWithoutBuffs from "../use-status-without-buffs";
import ChunkHeader from "./chunk-header";

const misc: React.FC = () => {
    const tenacity = useSubjectStateStore(s => s.status.tenacity);
    const moveSpeed = useSubjectStateStore(s => s.status.moveSpeed);
    const slowResist = useSubjectStateStore(s => s.status.slowResist);
    const sightRange = useSubjectStateStore(s => s.status.sightRange);
    const attackRange = useSubjectStateStore(s => s.status.attackRange);
    const withoutBuffs = useStatusWithoutBuffs();

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(MiscTableHiddenKey);

    return (
        <tbody>
            <ChunkHeader 
                intlID="app.others" 
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
            <Column
                name={<><HandFist /><FormattedMessage id="status.tenacity" /></>}
                value={tenacity.calculatedValue}
                baseline={withoutBuffs.tenacity.calculatedValue}
                expand={
                    tenacity.components.findIndex(c => c.origin != "equipment") > -1 ?
                    <ExpandStatus {...tenacity} /> : null
                }
                percent
                isHidden={hidden}
            />
            <Column
                name={<><SneakerMove /><FormattedMessage id="status.movement-speed" /></>}
                value={moveSpeed.calculatedValue}
                baseline={withoutBuffs.moveSpeed.calculatedValue}
                expand={
                    <ExpandStatus
                        {...moveSpeed}
                        additionalSubRow={<MoveSpeedSubRow {...moveSpeed} />}
                    />
                }
                isHidden={hidden}
            />
            <Column
                name={<><Boot />移動速度減少耐性</>}
                value={slowResist.calculatedValue}
                baseline={withoutBuffs.slowResist.calculatedValue}
                isHidden={hidden}
                percent
            />
            <Column
                name={<><Eye /><FormattedMessage id="status.vision" /></>}
                value={sightRange.calculatedValue}
                baseline={withoutBuffs.sightRange.calculatedValue}
                expand={
                    sightRange.components.findIndex(c => c.origin != "subject-status") > -1 ?
                    <ExpandStatus {...sightRange} />
                    : null
                }
                isHidden={hidden}
            />
            <Column
                name={<><ArrowFatLineRight />基本攻撃射程</>}
                value={attackRange.calculatedValue}
                baseline={withoutBuffs.attackRange.calculatedValue}
                expand={
                    attackRange.components.findIndex(c => c.value.type != "weapon-base") > -1 ?
                    <ExpandStatus {...attackRange} />
                    : null
                }
                isHidden={hidden}
            />
        </tbody>
    );
}

export default misc;