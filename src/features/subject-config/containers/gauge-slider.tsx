import * as React from "react";
import { useSubjectStateStore } from "../store";
import SliderSection from "../components/slider-section.view";
import { useIntl } from "react-intl";
import { SubjectGaugeInfoDictionary } from "@app/ingame-params/subjects/dictionary";

/**
 * 一部の実験体に定義された固有ゲージ（エキオンの暴走、ブレアの気力など）の表示・変更を行うスライダー
 */
const GaugeSlider: React.FC = () => {
    const intl = useIntl();
    const subject = useSubjectStateStore(s => s.config.subject);
    const maxHP = useSubjectStateStore(s => s.status.maxHp.calculatedValue.toNumber());
    const gauge = useSubjectStateStore(s => s.config.gauge);
    const setGauge = useSubjectStateStore(s => s.setGauge);

    const gaugeInfo = React.useMemo(() => {
        return SubjectGaugeInfoDictionary[subject];
    }, [subject]);

    if (gaugeInfo == undefined) return null;
    
    const gaugeMax = (() => {
        if (gaugeInfo.max == undefined) return 100;
        if (typeof gaugeInfo.max == "number") return gaugeInfo.max;
        return maxHP * gaugeInfo.max.maxHPRatio / 100
    })()

    return (
        <SliderSection
            style={{type: "gauge", threshold: gaugeInfo.threshold, changeColorOnMax: gaugeInfo.changeColorOnMax}}
            label={intl.formatMessage({id: gaugeInfo.nameIntlID})}
            value={[gauge, setGauge]}
            max={gaugeMax}
        />
    )
}

export default GaugeSlider;
