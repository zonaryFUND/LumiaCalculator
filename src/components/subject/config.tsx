import { SubjectID, name } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import style from "./config.module.styl";
import Images from "@app/resources/image";
import Selection from "components/common/number-selection";
import EquipmentSlot from "./equipment-slot";
import { Equipment } from "components/subject/use-subject-config";
import Modal from "react-modal";
import { useToggle } from "react-use";
import SubjectList, { style as subjectsStyle } from "components/modal/subject-list";
import common from "@app/common.styl";

type Props = {
    subject: StateProps<SubjectID>
    level: StateProps<number>
    weaponMastery: StateProps<number>
    defenseMastery: StateProps<number>
    movementMastery: StateProps<number>
    equipment: StateProps<Equipment>
}

const config: React.FC<Props> = props => {
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onChangeSubject = React.useCallback((id: SubjectID) => {
        props.subject[1](id);
        toggleSelectingSubject(false);
    }, []);

    return (
        <>
            <div className={style.config}>
                <div className={style.top}>
                    <img className={common.hover} src={Images.subject[props.subject[0]]} onClick={toggleSelectingSubject} />
                    <div className={style.right}>
                        <h2>{name(props.subject[0], "jp")}</h2>
                        <Selection max={20} label="Lv" value={props.level} layout="config" />
                    </div>
                </div>
                
                <div>
                    <h3>熟練度</h3>
                    <div className={style.mastery}>
                        <Selection max={20} label="武器" value={props.weaponMastery} layout="config" />
                        <Selection max={20} label="防御" value={props.defenseMastery} layout="config" />
                        <Selection max={20} label="移動" value={props.movementMastery} layout="config" />
                    </div>
                </div>

                <div>
                    <h3>装備</h3>
                    <div className={style.equipment}>
                    <EquipmentSlot slot="weapon" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="chest" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="head" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="arm" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="leg" subject={props.subject[0]} equipment={props.equipment} />
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={selectingSubject} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelectingSubject}
                className={subjectsStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <SubjectList current={props.subject[0]} onSelect={onChangeSubject} />
            </Modal>
        </>
    )
};

export default config;