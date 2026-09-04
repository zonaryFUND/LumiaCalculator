import * as ghPages from "gh-pages";

// src/独立リポジトリ化(2026-08-30)後もGitHub Pagesの公開設定はercalc_resources側のままのため、
// gh-pagesのデフォルト挙動（cwdが属するgitリポジトリ＝src/自身のorigin、zonaryFUND/LumiaCalculator.git）
// ではなく、明示的にercalc_resources側へpushする。CLAUDE.md参照
ghPages.publish("dist", {
    repo: "git@github.com:zonaryFUND/ercalc_resources.git",
    cname: "lumia-calculator.app"
})