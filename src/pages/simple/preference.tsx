import * as React from "react";
import Switch from "components/common/switch";
import { StateProps } from "@app/util/state";

type Props = {
    damageInFormula: StateProps<boolean>
}

const preference: React.FC<Props> = props => {
    return (
        <div>
            <label>
                <Switch {...props.damageInFormula} />
                <div>
                    <h3>
                        ツールチップのダメージをレシオで表記する
                    </h3>
                    <p>
                        スキルやスキル付き装備にマウスオーバーしたときのツールチップに表示されるダメージ量を、最終的な量ではなく10+(攻撃力の50%)のようにレシオで表記します
                    </p>
                </div>
            </label>
            
        </div>
    )
};

export default preference;