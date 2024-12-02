import { SubjectCodeWithOldID, SubjectCode } from "app-types/subject-static";
import * as React from "react";
import { StateProps } from "util/state";
import style from "./config.module.styl";
import Images from "@app/resources/image";
import PullDown from "components/common/pull-down";
import EquipmentSlot from "./equipment-slot";
import Modal from "react-modal";
import { useToggle } from "react-use";
import SubjectList, { style as subjectsStyle } from "components/modal/subject-list";
import common from "@app/common.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config/type";
import { FormattedMessage, useIntl } from "react-intl";
import ThrottleSlider from "./throttle-slider";
import { SubjectStackInfoDictionary } from "@app/ingame-params/subjects/dictionary";

export type ConfigModifierProps = {
    [K in keyof SubjectConfig]: StateProps<SubjectConfig[K]>
}

export type CurrentHPProps = {
    currentHP?: StateProps<number>
    maxHP?: number
}

const config: React.FC<ConfigModifierProps & CurrentHPProps> = props => {
    const intl = useIntl();
    const subjectID = SubjectCodeWithOldID[props.subject[0]];
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onChangeSubject = React.useCallback((code: SubjectCode) => {
        props.subject[1](code);
        toggleSelectingSubject(false);
    }, []);

    const stackInfo = React.useMemo(() => {
        return SubjectStackInfoDictionary[props.subject[0]];
    }, [props.subject[0]]);

    const gaugeTitle = React.useMemo(() => {
        switch (subjectID) {
            case "echion":
                return "暴走ゲージ";
            case "li_dailin":
                return "酔いゲージ";
        }
    }, [subjectID]);

    return (
        <>
            <div className={style.config}>
                <div className={style.top}>
                    <img className={common.hover} src={Images.subject[props.subject[0]]} onClick={toggleSelectingSubject} />
                    <div className={style.right}>
                        <h2><FormattedMessage id={`Character/Name/${props.subject[0]}`} /></h2>
                        <PullDown label="Lv" value={{max: 20, current: props.level[0], set: props.level[1]}} layout="config" />
                    </div>
                </div>
                
                <div>
                    <h3>熟練度</h3>
                    <div className={style.mastery}>
                        <PullDown label="武器" value={{max: 20, current: props.weaponMastery[0], set: props.weaponMastery[1]}} layout="config" />
                        <PullDown label="防御" value={{max: 20, current: props.defenseMastery[0], set: props.defenseMastery[1]}} layout="config" />
                        <PullDown label="移動" value={{max: 20, current: props.movementMastery[0], set: props.movementMastery[1]}} layout="config" />
                    </div>
                    {
                        props.currentHP ?
                        <ThrottleSlider 
                            label="現在HP"
                            value={props.currentHP}
                            max={props.maxHP!}
                        /> :
                        null
                    }
                    {
                        gaugeTitle ?
                        <ThrottleSlider 
                            label={gaugeTitle}
                            value={props.gauge}
                            max={100}
                        /> :
                        null
                    }
                    {
                        stackInfo ? 
                        <ThrottleSlider 
                            label={intl.formatMessage({id: stackInfo.nameIntlID})}
                            value={props.stack}
                            max={stackInfo.max}
                        /> :
                        null
                    }
                </div>

                <div>
                    <h3>装備</h3>
                    <div className={style.equipment}>
                    <EquipmentSlot slot="Weapon" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="Chest" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="Head" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="Arm" subject={props.subject[0]} equipment={props.equipment} />
                    <EquipmentSlot slot="Leg" subject={props.subject[0]} equipment={props.equipment} />
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