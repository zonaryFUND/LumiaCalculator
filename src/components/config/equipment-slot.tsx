import * as React from "react";
import Modal from "react-modal";
import { useToggle } from "react-use";

import { ArmorTypeID } from "app-types/equipment/armor";
import { Equipment } from "app-types/subject-dynamic/config/equipment";

import Blank from "components/item/blank";
import Item from "components/item/item";
import EquipmentList, { style as listStyle } from "../modal/equipment-list";

import { StateProps } from "@app/util/state";
import { styles } from "@app/util/style";

import common from "@app/common.module.styl";
import style from "./equipment-slot.module.styl";
import { SubjectCode } from "app-types/subject-static";
import { ArmorStatusDictionary } from "app-types/equipment";


type Props = {
    slot: "Weapon" | ArmorTypeID 
    subject: SubjectCode
    equipment: StateProps<Equipment>
}

const equipmentSlot: React.FC<Props> = props => {
    const [selecting, toggleSelecting] = useToggle(false);
    const [isDavid, showDavidCheckbox] = React.useMemo(() => {
        if (props.slot != "Chest" || props.equipment[0].Chest == null) return [false, false];
        const status = ArmorStatusDictionary[props.equipment[0].Chest];
        return [
            status.david?.from != undefined,
            status.david != undefined
        ];
    }, [props.equipment[0].Chest]);

    const onSelect: React.Dispatch<React.SetStateAction<Equipment>> = React.useCallback(equipment => {
        props.equipment[1](equipment);
        toggleSelecting(false);
    }, []);

    const onChangeDavidCheckBox = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const to = event.target.checked;
        
        props.equipment[1](prev => {
            const Chest = ArmorStatusDictionary[prev.Chest!].david?.[to ? "to" : "from"]!;
            return {...prev, Chest}
        })
    }, [])

    return (
        <div className={style.slot}>
            <div className={styles(style.equipment, common["hover-bright"])} onClick={toggleSelecting}>
                {
                    props.equipment[0][props.slot] ?
                    <Item itemID={props.equipment[0][props.slot]} slot={props.slot} inSlot={true} /> :
                    <Blank slot={props.slot} />
                }
            </div>
            {
                showDavidCheckbox ? 
                <label className={style.david}><input type="checkbox" checked={isDavid} onChange={onChangeDavidCheckBox} />David</label> : 
                <p />
            }
            <Modal
                isOpen={selecting} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelecting}
                className={listStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <EquipmentList {...props} equipment={[props.equipment[0], onSelect]} />
            </Modal>
        </div>
    );
};

export default equipmentSlot;