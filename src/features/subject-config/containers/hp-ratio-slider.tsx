import * as React from "react";
import { useSubjectStateStore } from "../store";
import SliderSection from "../components/slider-section.view";
import { useIntl } from "react-intl";

/**
 * 現在HPを表示・変更するためのスライダー
 * 内部的には0~100%の割合で管理し、表示時に最大HPを乗算する
 */
const HPRatioSlider: React.FC = () => {
    const intl = useIntl();
    const maxHP = useSubjectStateStore(s => s.status.maxHp.calculatedValue.toNumber());
    const hpRatio = useSubjectStateStore(s => s.hpRatio);
    const setHpRatio = useSubjectStateStore(s => s.setHpRatio);

    return (
        <SliderSection
            style={{type: "hp-ratio"}}
            label={intl.formatMessage({id: "status.hp"})}
            value={[hpRatio, setHpRatio]}
            max={maxHP}
        />
    )
}

export default HPRatioSlider;
