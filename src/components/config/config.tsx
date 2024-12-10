import { SubjectCode } from "app-types/subject-static";
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
import { FormattedMessage, useIntl } from "react-intl";
import ThrottleSlider from "./throttle-slider";
import { SubjectGaugeInfoDictionary, SubjectStackInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { Upload, Download } from "@phosphor-icons/react"
import { SubjectConfigProps } from "./use-subject-config";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { ArmorStatusDictionary } from "app-types/equipment";

export type CurrentHPProps = {
    currentHP?: StateProps<number>
    maxHP?: number
}

const config: React.FC<SubjectConfigProps & CurrentHPProps> = props => {
    const intl = useIntl();
    const uiType = useResponsiveUIType();
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onChangeSubject = React.useCallback((code: SubjectCode) => {
        props.subject[1](code);
        toggleSelectingSubject(false);
    }, []);

    const stackInfo = React.useMemo(() => {
        return SubjectStackInfoDictionary[props.subject[0]];
    }, [props.subject[0]]);

    const gaugeInfo = React.useMemo(() => {
        return SubjectGaugeInfoDictionary[props.subject[0]];
    }, [props.subject[0]]);

    const [isDavid, showDavidCheckbox] = React.useMemo(() => {
        if (props.equipment[0].Chest == null) return [false, false];
        const status = ArmorStatusDictionary[props.equipment[0].Chest];
        return [
            status.david?.from != undefined,
            status.david != undefined
        ];
    }, [props.equipment[0].Chest]);
    const onChangeDavidCheckBox = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const to = event.target.checked;
        
        props.equipment[1](prev => {
            const Chest = ArmorStatusDictionary[prev.Chest!].david?.[to ? "to" : "from"]!;
            return {...prev, Chest}
        })
    }, [])

    // data
    const [showingLoad, toggleShowingLoad] = useToggle(false);
    const onLoad = React.useCallback((config: SubjectConfig) => {
        props.setConfig(config);
        toggleShowingLoad();
    }, [])

    const [showingSave, toggleShowingSave] = useToggle(false);

    return (
        <>
            <div className={style.config}>
                <div className={style.top}>
                    <img className={common.hover} src={Images.subject[props.subject[0]]} onClick={toggleSelectingSubject} />
                    <div className={style.right}>
                        <h2><FormattedMessage id={`Character/Name/${props.subject[0]}`} /></h2>
                        <div className={style.data}>
                            <button onClick={toggleShowingLoad}><Upload fontSize={28} /><p>ロード</p></button>
                            <button onClick={toggleShowingSave}><Download fontSize={28} /><p>セーブ</p></button>
                        </div>
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
                </div>
                {
                    props.currentHP ?
                    <ThrottleSlider 
                        style="hp"
                        label="現在HP"
                        value={props.currentHP}
                        max={props.maxHP!}
                    /> :
                    null
                }
                {
                    gaugeInfo ?
                    <ThrottleSlider 
                        style="gauge"
                        label={intl.formatMessage({id: gaugeInfo.nameIntlID})}
                        threshold={gaugeInfo.threshold}
                        value={props.gauge}
                        max={100}
                    /> :
                    null
                }
                {
                    stackInfo ? 
                    <ThrottleSlider 
                        style="stack"
                        label={intl.formatMessage({id: stackInfo.nameIntlID})}
                        value={props.stack}
                        max={stackInfo.max}
                    /> :
                    null
                }

                <div>
                    <h3>
                        装備<span>
                            {
                                uiType == "mobile" ? "ダブルタップでツールチップを表示" : "マウスオーバーでツールチップを表示"
                            }
                        </span>
                    </h3>
                    <div className={style.equipment}>
                        <EquipmentSlot slot="Weapon" subject={props.subject[0]} equipment={props.equipment} />
                        <EquipmentSlot slot="Chest" subject={props.subject[0]} equipment={props.equipment} />
                        <EquipmentSlot slot="Head" subject={props.subject[0]} equipment={props.equipment} />
                        <EquipmentSlot slot="Arm" subject={props.subject[0]} equipment={props.equipment} />
                        <EquipmentSlot slot="Leg" subject={props.subject[0]} equipment={props.equipment} />
                        <div />
                        <div className={style.david}>
                        {
                            showDavidCheckbox ? 
                            <label><input type="checkbox" checked={isDavid} onChange={onChangeDavidCheckBox} />David</label> : 
                            null
                        }
                        </div>
                        <div />
                        <div />
                        <div />
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
            <Modal
                isOpen={showingLoad}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingLoad}
                className={loadStyle.load}
                overlayClassName={common["modal-overlay"]}
            >
                <LoadBuild 
                    onSelect={onLoad} 
                />
            </Modal>
            <Modal
                isOpen={showingSave}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingSave}
                className={saveStyle.save}
                overlayClassName={common["modal-overlay"]}
            >
                <SaveBuild 
                    currentConfig={props.value}
                    onDone={toggleShowingSave}
                />
            </Modal>
        </>
    )
};

export default config;