import * as React from "react";
import Switch from "components/common/switch";

type Props = {
    damageInFormula: [boolean, (to: boolean) => void]
}

const preference: React.FC<Props> = props => {
    return (
        <div>
            <label>
                <div>
                    <h3>
                        ツールチップのダメージをレシオで表記する
                    </h3>
                    <p>
                        スキルやスキル付き装備にマウスオーバーしたときのツールチップに表示されるダメージ量を、最終的な量ではなく10+(攻撃力の50%)のようにレシオで表記します
                    </p>
                </div>
                <Switch {...props.damageInFormula} />
            </label>
            
        </div>
    )
};

export default preference;