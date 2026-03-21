import * as React from "react";
import { useSubjectStateStore } from "../store";
import PullDown from "@app/components/common/pull-down";
import style from "@app/components/config/config.module.styl";

const MasteryPulldowns: React.FC = () => {
    const weaponMastery = useSubjectStateStore(s => s.config.weaponMastery);
    const defenseMastery = useSubjectStateStore(s => s.config.defenseMastery);
    const movementMastery = useSubjectStateStore(s => s.config.movementMastery);
    const setWeaponMastery = useSubjectStateStore(s => s.setWeaponMastery);
    const setDefenseMastery = useSubjectStateStore(s => s.setDefenseMastery);
    const setMovementMastery = useSubjectStateStore(s => s.setMovementMastery);

    return (
        <div>
            <h3>熟練度</h3>
            <div className={style.mastery}>
                <PullDown label="武器" value={{max: 20, current: weaponMastery, set: setWeaponMastery}} layout="config" />
                <PullDown label="防御" value={{max: 20, current: defenseMastery, set: setDefenseMastery}} layout="config" />
                <PullDown label="移動" value={{max: 20, current: movementMastery, set: setMovementMastery}} layout="config" />
            </div>
        </div>
    )
}

export default MasteryPulldowns;