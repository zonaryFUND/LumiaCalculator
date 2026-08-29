import { execSync } from "child_process";
import * as path from "path";

// resources/ はsrc/から見て ../resources に存在する想定（vite.config.tsのエイリアス解決と同じ）。
// 新規実験体・装備の追加時（1〜2ヶ月に1度程度）にしかresources/側の更新は発生しないため、
// 更新のcommit/pushを忘れがちになる。yarn deploy実行時に毎回自動でチェックすることで、
// うっかり忘れて未commit・未pushのまま気づかない事態を防ぐ。

// yarn経由でsrc/ディレクトリから実行される前提（package.jsonの他スクリプトと同様）
const resourcesPath = path.resolve(process.cwd(), "../resources");

function run(command: string): string {
    return execSync(command, { cwd: resourcesPath, encoding: "utf-8" });
}

function main() {
    let hasWarning = false;

    const dirty = run("git status --porcelain").trim();
    if (dirty.length > 0) {
        hasWarning = true;
        console.warn("\n⚠ resources/ に未commitの変更があります:");
        console.warn(dirty);
    }

    try {
        const unpushed = run("git log --oneline @{u}..HEAD").trim();
        if (unpushed.length > 0) {
            hasWarning = true;
            console.warn("\n⚠ resources/ に未pushのコミットがあります:");
            console.warn(unpushed);
        }
    } catch {
        hasWarning = true;
        console.warn("\n⚠ resources/ にupstream追跡ブランチが設定されていないため、未push確認をスキップしました。");
    }

    if (hasWarning) {
        console.warn("\n新規実験体・装備の画像素材追加時は、resources/側でも忘れずにcommit・pushしてください。\n");
    } else {
        console.log("resources/ はcommit・push済みです。");
    }
}

main();
