import { RatioKeys } from "app-types/value-ratio";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    label: RatioKeys
}

const ratioKey: React.FC<Props> = props => {
    switch (props.label) {
        case "base":
            return null;
        case "attack":
            return <FormattedMessage id="status.attack-power" />;
        case "additionalAttack":
            return "追加攻撃力";
        case "additionalMaxHP":
            return <FormattedMessage id="status.additional-maxhp" />;
        case "maxHP":
            return <FormattedMessage id="status.maxhp" />;
        case "defense":
            return <FormattedMessage id="status.defense" />;
        case "amp":
            return <FormattedMessage id="status.skill-amp" />;
        case "level":
            return "レベル";
        case "basicAttackAmp":
            return "基本攻撃増幅";
        case "criticalChance":
            return "致命打確率";
        case "criticalDamage":
            return "致命打ダメージ増加量"
        case "stack":
            return "スタック";
        case "additionalAttackSpeed":
            return "追加攻撃速度(%)"
        case "gauge":
            return "ゲージ";
    }
}

export default ratioKey;