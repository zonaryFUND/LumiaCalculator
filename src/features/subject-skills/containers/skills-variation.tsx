import * as React from "react";
import { SkillCodes } from "@app/ingame-params/subjects/type";
import Skill from "./skill";

type Props = {
    codes: SkillCodes
}

// 同一スキルキーに対して複数スキルが存在している（例：ティアのWの色バリエーション）場合、それらを縦に並べて表示する
// そうでない場合、単独でSkillコンポーネントを表示する
const SkillsVariation: React.FC<Props> = props => {
    if (typeof props.codes == "number") {
        // 同一スキルキーに対するスキルが1つしかない
        return <Skill key={props.codes} code={props.codes} />;
    } else if (Array.isArray(props.codes)) {
        // 同一スキルキーに対するスキルが複数ある
        // 最大スキルレベルは通常通りの場合、文字列配列が格納されている
        return props.codes.map(code => <Skill key={code} code={code} />)
    } else {
        // 最大スキルレベルが特殊な仕様（例：ティアW）の場合、codesはオブジェクトである
        // さらに、当該スキルキーに対するバリエーションがある場合とない場合とがある
        return (typeof props.codes.code == "number" ? [props.codes.code] : props.codes.code)
            .map(code => <Skill key={code} code={code} />)
    }
}

export default SkillsVariation;