import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Locales } from "@app/App";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { IntlProvider } from "react-intl";
import Tooltip from "@app/components/tooltip/item/item-tooltip"
import { NimbleAPIJSON } from "@app/params-json";
import { statusOf } from "core/subject-dynamic/status/calculation";

const config = SubjectConfigDefault;

const Bed: React.FC<{code: number, showEquation: boolean}> = ({ code, showEquation }) => {
    const status = statusOf(config, 100);
    return (
        <IntlProvider locale="ja" messages={Locales["ja"]}>
            <Tooltip 
                showEquation={showEquation}
                config={config}
                isDavid={false}
                status={status}
                itemID={+code}
            />
        </IntlProvider>
    )
}

const weaponCodeWithName = NimbleAPIJSON.WeaponStatus.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))
const armorCodeWithName = NimbleAPIJSON.ArmorStatus.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))

// 実データ全量を対象にした、クラッシュしないことのみを保証するsmoke test
// （docs/testing-guidelines.md「④ 実データ全量スナップショット」参照。toMatchSnapshot()による厳密一致検証は
// バランス調整パッチのたびに大量に落ちシグナルとして機能しないため廃止した。render()が例外を投げなければ
// 成功とみなし、レンダリング結果が空でないことだけを確認する）
describe.each([...weaponCodeWithName, ...armorCodeWithName])("$name's", ({ code }) => {
    test("tooltip renders without crashing", () => {
        const { container } = render(<Bed code={+code} showEquation={false} />);
        expect(container.textContent).not.toBe("")
    })
    test("detailed tooltip renders without crashing", () => {
        const { container } = render(<Bed code={+code} showEquation={true} />);
        expect(container.textContent).not.toBe("")
    })
})
