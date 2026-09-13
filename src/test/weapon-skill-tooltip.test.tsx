import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import Bed from "./skill-tooltip-bed";

const CodeWithID = Object.entries(WeaponSkillCodeDictionary).map(([id, code]) => ({
    id, code
}))

// 実データ全量を対象にした、クラッシュしないことのみを保証するsmoke test
// （docs/testing-guidelines.md「④ 実データ全量スナップショット」参照。toMatchSnapshot()による厳密一致検証は
// バランス調整パッチのたびに大量に落ちシグナルとして機能しないため廃止した。render()が例外を投げなければ
// 成功とみなし、レンダリング結果が空でないことだけを確認する）
describe.each(CodeWithID)("$id's skill", ({ code }) => {
    test("tooltip renders without crashing", () => {
        const { container } = render(<Bed code={+code} showEquation={false} />);
        expect(container.textContent).not.toBe("")
    })
    test("detailed tooltip renders without crashing", () => {
        const { container } = render(<Bed code={+code} showEquation={true} />);
        expect(container.textContent).not.toBe("")
    })
})
