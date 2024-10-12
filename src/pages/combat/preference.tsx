import * as React from "react";
import Switch from "components/common/switch";
import { StateProps } from "@app/util/state";

type Props = {
    damageInFormula: [boolean, (to: boolean) => void]
    makeMasteryAlign: [boolean, (to: boolean) => void]
}

const preference: React.FC<Props> = props => {
    return (
        <>
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
            <label>
                <Switch {...props.makeMasteryAlign} />
                <div>
                    <h3>
                        右実験体のLv/熟練度を左実験体に合わせる
                    </h3>
                    <p>
                        左実験体のLv/熟練度を変更すると右実験体も同じ値に自動で変更されます。<br />(右実験体の変更は左実験体に適用されません)
                    </p>
                </div>
            </label>
        </>
    )
};

export default preference;