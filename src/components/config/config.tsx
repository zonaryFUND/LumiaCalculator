import { SubjectCode } from "app-types/subject-static";
import * as React from "react";
import { StateProps } from "util/state";
import style from "./config.module.styl";
import Images from "@app/resources/image";
import PullDown from "components/common/pull-down";
import EquipmentSlot from "./equipment/equipment-slot";
import Modal from "react-modal";
import { useToggle } from "react-use";
import SubjectList, { style as subjectsStyle } from "components/modal/subject-list";
import common from "@app/common.module.styl";
import { FormattedMessage, useIntl } from "react-intl";
import SliderSection from "./slider/slider-section";
import { SubjectGaugeInfoDictionary, SubjectStackInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { Upload, Download } from "@phosphor-icons/react"
import { SubjectConfigProps, useSubjectConfigState } from "./use-subject-config";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { DavidChestArmorUpgradeDictionary } from "app-types/equipment";
import { useSubjectStateStore } from "@app/features/subject-config/store";

export type CurrentHPProps = {
    currentHPRatio?: StateProps<number>
    maxHP: number
}

const config: React.FC = props => {
    const intl = useIntl();
    const config = useSubjectStateStore(s => s.config);
    const setConfig = useSubjectStateStore(s => s.setConfig);
    const setSubject = useSubjectStateStore(s => s.setSubject);
    const setEquipment = useSubjectStateStore(s => s.setEquipment);
    const setLevel = useSubjectStateStore(s => s.setLevel);
    const setWeaponMastery = useSubjectStateStore(s => s.setWeaponMastery);
    const setDefenseMastery = useSubjectStateStore(s => s.setDefenseMastery);
    const setMovementMastery = useSubjectStateStore(s => s.setMovementMastery);
    const setStack = useSubjectStateStore(s => s.setStack);
    const setGauge = useSubjectStateStore(s => s.setGauge);
    const hpRatio = useSubjectStateStore(s => s.hpRatio);
    const setHpRatio = useSubjectStateStore(s => s.setHpRatio);
    const status = useSubjectStateStore(s => s.status);

    const maxHP = status.maxHp.calculatedValue.toNumber();

    const uiType = useResponsiveUIType();
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onChangeSubject = React.useCallback((code: SubjectCode) => {
        setSubject(code);
        toggleSelectingSubject(false);
    }, []);

    const stackInfo = React.useMemo(() => {
        return SubjectStackInfoDictionary[config.subject];
    }, [config.subject]);

    const gaugeInfo = React.useMemo(() => {
        return SubjectGaugeInfoDictionary[config.subject];
    }, [config.subject]);

    const davidUpgrade = React.useMemo(() => {
        if (config.equipment.Chest == null) return undefined;

        return DavidChestArmorUpgradeDictionary[config.equipment.Chest];
    }, [config.equipment.Chest]);
    const onChangeDavidCheckBox = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEquipment(prev => ({...prev, isChestDavid: event.target.checked}));
    }, [])

    // data
    const [showingLoad, toggleShowingLoad] = useToggle(false);
    const onLoad = React.useCallback((config: SubjectConfig) => {
        setConfig(config);
        toggleShowingLoad();
    }, [])

    const [showingSave, toggleShowingSave] = useToggle(false);

    return (
        <>
            <div className={style.config}>
                {/* 実験体選択セクション */}
                <div className={style.top}>
                    <img className={common.hover} src={Images.subject[config.subject]} onClick={toggleSelectingSubject} />
                    <div className={style.right}>
                        <h2><FormattedMessage id={`Character/Name/${config.subject}`} /></h2>
                        <div className={style.data}>
                            <button onClick={toggleShowingLoad}><Upload fontSize={28} /><p>ロード</p></button>
                            <button onClick={toggleShowingSave}><Download fontSize={28} /><p>セーブ</p></button>
                        </div>
                        <PullDown label="Lv" value={{max: 20, current: config.level, set: setLevel}} layout="config" />
                    </div>
                </div>
                
                {/* 熟練度設定セクション */}
                <div>
                    <h3>熟練度</h3>
                    <div className={style.mastery}>
                        <PullDown label="武器" value={{max: 20, current: config.weaponMastery, set: setWeaponMastery}} layout="config" />
                        <PullDown label="防御" value={{max: 20, current: config.defenseMastery, set: setDefenseMastery}} layout="config" />
                        <PullDown label="移動" value={{max: 20, current: config.movementMastery, set: setMovementMastery}} layout="config" />
                    </div>
                </div>

                {/* スライダー設定値セクション（現在体力・変動ゲージ・永続スタック） */}
                {
                    hpRatio != undefined ?
                    <SliderSection 
                        style={{type: "hp-ratio"}}
                        label="現在HP"
                        value={[hpRatio, setHpRatio]}
                        max={maxHP}
                    /> :
                    null
                }
                {
                    gaugeInfo ?
                    <SliderSection 
                        style={{type: "gauge", threshold: gaugeInfo.threshold, changeColorOnMax: gaugeInfo.changeColorOnMax}}
                        label={intl.formatMessage({id: gaugeInfo.nameIntlID})}
                        value={[config.gauge, setGauge]}
                        max={(() => {
                            if (gaugeInfo.max == undefined) return 100;
                            if (typeof gaugeInfo.max == "number") return gaugeInfo.max;
                            return maxHP * gaugeInfo.max.maxHPRatio / 100
                        })()}
                    /> :
                    null
                }
                {
                    stackInfo ? 
                    <SliderSection 
                        style={{type: "stack"}}
                        label={intl.formatMessage({id: stackInfo.nameIntlID})}
                        value={[config.stack, setStack]}
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
                        <EquipmentSlot slot="Weapon" />
                        <EquipmentSlot slot="Chest" />
                        <EquipmentSlot slot="Head" />
                        <EquipmentSlot slot="Arm" />
                        <EquipmentSlot slot="Leg" />
                        <div />
                        <div className={style.david}>
                        {
                            davidUpgrade != undefined ? 
                            <label><input type="checkbox" checked={config.equipment.isChestDavid} onChange={onChangeDavidCheckBox} />David</label> : 
                            null
                        }
                        </div>
                        <div />
                        <div />
                        <div />
                    </div>
                </div>

                {/*
                <div>
                    <h3>永続バフ</h3>
                    <PerpetualBuffs buffs={config.buffs} />
                </div>
                */}
            </div>
            <Modal 
                isOpen={selectingSubject} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelectingSubject}
                className={subjectsStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <SubjectList current={config.subject} onSelect={onChangeSubject} />
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
                    currentConfig={config}
                    onDone={toggleShowingSave}
                />
            </Modal>
        </>
    )
};

export default config;