import * as React from "react";
import { StateProps } from "util/state";
import style from "./config.module.styl";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import GaugeSlider from "@app/features/subject-config/containers/gauge-slider";
import HPRatioSlider from "@app/features/subject-config/containers/hp-ratio-slider";
import StackSlider from "@app/features/subject-config/containers/stack-slider";
import MasteryPulldowns from "@app/features/subject-config/containers/mastery-pulldowns";
import SubjectCardLayout from "@app/features/subject-config/components/subject-card-layout.view";
import Equipments from "@app/features/subject-config/containers/equipments";

export type CurrentHPProps = {
    currentHPRatio?: StateProps<number>
    maxHP: number
}

const config: React.FC = props => {
    const config = useSubjectStateStore(s => s.config);

    return (
        <div className={style.config}>
            {/* 実験体選択セクション */}
            <SubjectCardLayout subject={config.subject} />
            
            {/* 熟練度設定セクション */}
            <MasteryPulldowns />

            {/* スライダー設定値セクション（現在体力・変動ゲージ・永続スタック） */}
            <HPRatioSlider />
            <GaugeSlider />
            <StackSlider />

            {/* 装備セクション */}
            <Equipments />

            {/*
            <div>
                <h3>永続バフ</h3>
                <PerpetualBuffs buffs={config.buffs} />
            </div>
            */}
        </div>
    )
};

export default config;