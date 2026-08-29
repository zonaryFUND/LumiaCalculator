import * as React from "react";
import Modal from "react-modal";
import { useToggle } from "react-use";
import { ArmorTypeID } from "app-types/equipment/armor";
import { Equipment } from "app-types/subject-dynamic/config/equipment";
import EquipmentIconBlank from "../components/equipment-icon-blank.view";
import EquipmentIcon from "../components/equipment-icon.view";
import EquipmentListModal, { style as listStyle } from "./equipment-list-modal";
import { styles } from "@app/util/style";
import common from "@app/common.module.styl";
import style from "./equipment-slot.module.styl";
import { useSubjectStateStore } from "@app/features/subject-config/store";


type Props = {
    /**
     * 対応する装備スロット
     */
    slot: "Weapon" | ArmorTypeID 
}

/**
 * 実験体の状態編集において装備1か所を表示・変更するためのスロットコンポーネント
 */
const equipmentSlot: React.FC<Props> = props => {
    const [selecting, toggleSelecting] = useToggle(false);
    const code = useSubjectStateStore(s => s.config.subject);
    const equipment = useSubjectStateStore(s => s.config.equipment);
    const setEquipment = useSubjectStateStore(s => s.setEquipment);
    
    const onSelect: React.Dispatch<React.SetStateAction<Equipment>> = React.useCallback(equipment => {
        setEquipment(equipment);
        toggleSelecting(false);
    }, []);

    return (
        <div className={style.slot}>
            <div className={styles(style.equipment, common["hover-bright"])}>
                {
                    equipment[props.slot] ?
                    <EquipmentIcon
                        itemID={equipment[props.slot]!}
                        isDavid={equipment.isChestDavid == true}
                        slot={props.slot}
                        inSlot={true}
                        onSingleClick={toggleSelecting}
                    /> :
                    <EquipmentIconBlank slot={props.slot} onClick={toggleSelecting} />
                }
            </div>
            <Modal
                isOpen={selecting} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelecting}
                className={listStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <EquipmentListModal code={code} slot={props.slot} equipment={[equipment, onSelect]} />
            </Modal>
        </div>
    );
};

export default equipmentSlot;