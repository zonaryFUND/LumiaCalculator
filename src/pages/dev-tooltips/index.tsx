import * as React from "react";
import { Link } from "react-router-dom";
import style from "./tooltip-grid.module.styl";

/**
 * 開発用ツール2: 実験体スキル・武器スキル・装備アイテムの全ツールチップを、実験体・装備の切り替えや
 * マウスオーバーなしに一覧表示し、目視検査するためのページ群。ナビゲーションメニューにはリンクしておらず、
 * URLを直接開いてアクセスする想定（App.tsxのルーティング参照）。
 *
 * SubjectConfig/Statusは全項目に対して一律でSubjectConfigDefault（+その既定値でのStatus）を渡している。
 * プレースホルダの過不足チェック（tooltip-placeholder-consistency.test.tsx）と異なり、こちらは人間の目で
 * 文面・改行・表記ゆれを確認する用途のため、数値の正しさは問わない。
 */
const index: React.FC = () => (
    <div className={style.page}>
        <h1>ツールチップ目視検査（開発用）</h1>
        <p>
            パッチ対応が入っていない実験体・装備でも、ローカライズテキストの翻訳表現や追記が細かく変わることがある。
            数が多いため実験体・装備の種類ごとにページを分けている。
        </p>
        <ul>
            <li><Link to="/dev/tooltips/subjects">実験体スキル</Link></li>
            <li><Link to="/dev/tooltips/weapon-skills">武器スキル</Link></li>
            <li><Link to="/dev/tooltips/items">装備アイテム</Link></li>
        </ul>
    </div>
);

export default index;
