import * as React from "react";
import Switch from "components/common/switch";

type Props = {
    damageInFormula: [boolean, (to: boolean) => void]
    hideZeroStatus: [boolean, (to: boolean) => void]
}

const preference: React.FC<Props> = props => {
    return (
        <>
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
            <label>
                <div>
                    <h3>
                        0のステータス項目を表示しない
                    </h3>
                    <p>
                        計算されたステータスの表について、0または0%である値のセルを非表示にします
                    </p>
                </div>
                <Switch {...props.hideZeroStatus} />
            </label>
        </>
    )
};

export default preference;