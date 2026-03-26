import * as React from "react";
import style from "./index.module.styl";
import GaugeSlider from "@app/features/subject-config/containers/gauge-slider";
import HPRatioSlider from "@app/features/subject-config/containers/hp-ratio-slider";
import StackSlider from "@app/features/subject-config/containers/stack-slider";
import MasteryPulldowns from "@app/features/subject-config/containers/mastery-pulldowns";
import SubjectCardLayout from "@app/features/subject-config/components/subject-card.layout";
import Equipments from "@app/features/subject-config/containers/equipments";

const config: React.FC = () => {
    return (
        <div className={style.config}>
            {/* 実験体選択セクション */}
            <SubjectCardLayout />
            
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