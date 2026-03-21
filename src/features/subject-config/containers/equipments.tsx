import * as React from "react";
import EquipmentSlot from "./equipment-slot";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { useSubjectStateStore } from "../store";
import { DavidChestArmorUpgradeDictionary } from "app-types/equipment";
import style from "./equipments.module.styl";

type Props = {

}

const Equipments: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();
    const chest = useSubjectStateStore(s => s.config.equipment.Chest);
    const isChestDavid = useSubjectStateStore(s => s.config.equipment.isChestDavid);
    const setEquipment = useSubjectStateStore(s => s.setEquipment);

    const davidUpgradable = React.useMemo(() => {
        if (chest == null) return undefined;

        return DavidChestArmorUpgradeDictionary[chest] != null;
    }, [chest]);

    const onChangeDavidCheckBox = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEquipment(prev => ({...prev, isChestDavid: event.target.checked}));
    }, [])

    return (
        <div>
            <h3>
                装備
                <span>
                    {
                        uiType == "mobile" ? "ダブルタップでツールチップを表示" : "マウスオーバーでツールチップを表示"
                    }
                </span>
            </h3>
            <div className={style.equipment}>
                <EquipmentSlot slot="Weapon" />
                <EquipmentSlot slot="Chest" />
                <EquipmentSlot slot="Head" />
                <EquipmentSlot slot="Arm" />
                <EquipmentSlot slot="Leg" />
                <div />
                <div className={style.david}>
                {
                    davidUpgradable ? 
                    <label><input type="checkbox" checked={isChestDavid} onChange={onChangeDavidCheckBox} />David</label> : 
                    null
                }
                </div>
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Equipments;
