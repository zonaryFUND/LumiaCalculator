import { SubjectID, name } from "app-types/subject-static";
import * as React from "react";
import { StateWrapped } from "util/state";
import style from "./config.module.styl";
import Images from "@app/resources/image";
import Selection from "components/common/number-selection";
import EquipmentSlot from "./equipment-slot";
import Modal from "react-modal";
import { useToggle } from "react-use";
import SubjectList, { style as subjectsStyle } from "components/modal/subject-list";
import common from "@app/common.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config/type";
import { SubjectStackInfo } from "components/subjects/stack";
import { FormattedMessage } from "react-intl";

type Props = StateWrapped<SubjectConfig>;

const config: React.FC<Props> = props => {
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onChangeSubject = React.useCallback((id: SubjectID) => {
        props.subject[1](id);
        toggleSelectingSubject(false);
    }, []);

    const onChangeGauge: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        props.gauge[1](+e.currentTarget.value);
    }, [])

    const onChangeStack: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        props.stack[1](+e.currentTarget.value);
    }, [])

    const stackInfo = React.useMemo(() => {
        return SubjectStackInfo[props.subject[0]];
    }, [props.subject[0]]);

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
                    {
                        props.subject[0] == "echion" ?
                        <div>
                            <div>
                                <h3>暴走ゲージ</h3>
                                <p>{props.gauge[0]}</p>
                            </div>
                            <input type="range" value={props.gauge[0]} max="100" onChange={onChangeGauge} />
                        </div>
                        :null
                    }
                    {
                        stackInfo ? 
                        <div>
                            <div>
                                <h3><FormattedMessage id={stackInfo.nameKey} /></h3>
                                <p>{props.stack[0]}</p>
                            </div>
                        <input type="range" value={props.stack[0]} max={stackInfo.max} onChange={onChangeStack} />
                    </div>
                    :null
                    }
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