import * as React from "react";
import { useSubjectStateStore } from "../store";
import { DavidChestArmorUpgradeDictionary } from "core/equipment";
import EquipmentsLayout from "../components/equipments.layout";

const Equipments: React.FC = () => {
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

    return <EquipmentsLayout 
        davidUpgradable={davidUpgradable}
        isChestDavid={isChestDavid}
        onChangeDavidCheckBox={onChangeDavidCheckBox}
    />
}

export default Equipments;
