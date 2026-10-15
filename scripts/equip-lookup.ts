import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 装備スキル（equipment-abilities）の逆引き・検証CLI。
//
// パッチノートの装備スキル調整は「装備名 スキル名 - 変更内容」という日本語表記で書かれるが、実装側は
// 装備ID・スキルコード・英語ディレクトリ名で管理しており、両者の対応は l10.json・fabricated/*.json・
// 各ディレクトリの index.ts に分散している。その突き合わせを一度に行う。
//
//   yarn equip <クエリ>          装備名・スキル名・ディレクトリ名・装備ID・スキルコード、またはパッチノートの1行
//   yarn equip --file <md>       ファイルの各行のうち、装備名を含む行をすべて解決する
//   yarn equip --list            ディレクトリ ↔ 日本語スキル名 ↔ スキルコードの一覧
//   yarn equip --check           fabricated/*.json の整合性検証（エラーがあれば終了コード1）
//   --desc                       スキルのツールチップ本文（Item/Skills/<code>/Desc）も表示する

// `yarn equip ... | head` 等でパイプが閉じられた場合に例外を出さず終了する
process.stdout.on("error", e => { if ((e as NodeJS.ErrnoException).code == "EPIPE") process.exit(0); throw e; });

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p: string) => path.relative(root, p).replaceAll("\\", "/");
const readJSON = (p: string) => JSON.parse(fs.readFileSync(path.join(root, p), "utf-8"));

const abilityDir = path.join(root, "src/ingame-params/equipment-abilities");
const fabricatedPaths = {
    weapon: "src/params-json/fabricated/weapon-skill.json",
    armor: "src/params-json/fabricated/armor-skill.json"
} as const;
type Category = keyof typeof fabricatedPaths;

type FabricatedEntry = {
    skillCode: number | number[],
    name: string | string[],
    dmg?: unknown,
    values?: unknown
}

const l10: Record<string, string> = readJSON("src/intl/locales/ja/l10.json");
const stripTags = (s: string) => s.replace(/<[^>]+>/g, "").replaceAll("\\n", " ").trim();
const itemName = (code: number | string) => l10[`Item/Name/${code}`] ?? "(名称不明)";
const skillName = (code: number) => stripTags(l10[`Item/Skills/${code}/Name`] ?? "(名称不明)");

// ---- 装備（API取得データ）とfabricated -----------------------------------------------------------

type Item = { code: number, category: Category, type: string, grade: string, fabricated?: FabricatedEntry }

const fabricated: Record<Category, Record<string, FabricatedEntry>> = {
    weapon: readJSON(fabricatedPaths.weapon),
    armor: readJSON(fabricatedPaths.armor)
};

const items: Item[] = [
    ...(readJSON("src/params-json/nimbleapi/weapon.json") as any[]).map(e => ({
        code: e.code, category: "weapon" as const, type: e.weaponType, grade: e.itemGrade, fabricated: fabricated.weapon[e.code]
    })),
    ...(readJSON("src/params-json/nimbleapi/armor.json") as any[]).map(e => ({
        code: e.code, category: "armor" as const, type: e.armorType, grade: e.itemGrade, fabricated: fabricated.armor[e.code]
    }))
];
const itemByCode = new Map(items.map(i => [i.code, i]));

// skillCode/nameは配列の場合がある（core/equipment/dictionary.tsのabilities()と同じ解釈）。
// アプリ本体はskillCodeでアビリティを解決し、nameは表示・テスト用のラベルにすぎないため、
// ディレクトリはskillCodeから引く（nameとの不一致は--checkで報告する）
function skillsOf(entry: FabricatedEntry): { skillCode: number, dir: string, name: string }[] {
    const pairs = Array.isArray(entry.skillCode)
        ? entry.skillCode.map((skillCode, i) => ({ skillCode, name: (entry.name as string[])[i] }))
        : [{ skillCode: entry.skillCode, name: entry.name as string }];
    return pairs.map(p => ({ ...p, dir: abilityByCode.get(p.skillCode)?.dir ?? p.name }));
}

// ---- equipment-abilities ディレクトリ ---------------------------------------------------------------

// uses*: 装備から注入される値を参照する
// requires*: 非nullを前提に参照する（`!`・`as`・プロパティアクセス）。装備側に値がなければ実行時にクラッシュしうる
type Ability = {
    dir: string, codes: number[], hasConstants: boolean,
    usesDamage: boolean, usesValues: boolean, requiresDamage: boolean, requiresValues: boolean,
    // importedValuesから直接読み取っているトップレベルのキー。importedValuesを丸ごと別の変数や関数に
    // 渡している（`as`でのキャスト等）場合は読み取りキーを静的に追えないためundefined
    valuesKeys?: Set<string>
}

function valuesKeysOf(sources: string): Set<string> | undefined {
    // 引数の分割代入（`({ importedDamage, importedValues })`）は読み取りではないので除外する
    const body = sources.replace(/[{,]\s*importedValues\s*(?=[,}])/g, "");
    // `as`でのキャストや関数への丸ごとの受け渡しがあれば、読み取るキーは追えない
    if (/importedValues(\s+as\s|\s*[,)])/.test(body)) return undefined;
    return new Set([...body.matchAll(/importedValues[!?]?\.(\w+)/g)].map(m => m[1]));
}

const abilities: Ability[] =fs.readdirSync(abilityDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(abilityDir, d.name, "index.ts")))
    .map(d => {
        const dirPath = path.join(abilityDir, d.name);
        const index = fs.readFileSync(path.join(dirPath, "index.ts"), "utf-8");
        // import.meta.globはtsxで使えないため、`code: 6074001` / `code: [6007001, 6007002]` を正規表現で抽出する
        const match = index.match(/code:\s*(\[[^\]]*\]|\d+)/);
        const codes = match ? (match[1].match(/\d+/g) ?? []).map(Number) : [];
        const sources = fs.readdirSync(dirPath)
            .filter(f => /\.tsx?$/.test(f))
            .map(f => fs.readFileSync(path.join(dirPath, f), "utf-8"))
            .join("\n");
        return {
            dir: d.name,
            codes,
            usesDamage: sources.includes("importedDamage"),
            usesValues: sources.includes("importedValues"),
            requiresDamage: /importedDamage(!|\.|\s+as\s)/.test(sources),
            requiresValues: /importedValues(!|\.|\s+as\s)/.test(sources),
            hasConstants: fs.existsSync(path.join(dirPath, "constants.json")),
            valuesKeys: valuesKeysOf(sources)
        };
    });
const abilityByDir = new Map(abilities.map(a => [a.dir, a]));
const abilityByCode = new Map(abilities.flatMap(a => a.codes.map(c => [c, a] as const)));

const holders = (dir: string) => items.filter(i => i.fabricated && skillsOf(i.fabricated).some(s => s.dir == dir));
const abilityNames = (a: Ability) => [...new Set(a.codes.map(skillName))];

// ---- 名前による検索 --------------------------------------------------------------------------------

// 装備名はAPI取得対象（英雄等級以上）に限る。下位等級と同名の装備を拾わないため
const itemNameIndex = items.map(i => ({ name: itemName(i.code), item: i })).filter(e => e.name != "(名称不明)");
const skillNameIndex = abilities.flatMap(a => abilityNames(a).map(name => ({ name, ability: a })));

const normalize = (s: string) => s.replace(/[\s·・]/g, "");

// クエリ中に出現する名前のうち、最も長いものを返す（「迅速」と「迅速 - そよ風」のように前方一致する名前があるため）。
// 出現しなければ、名前の一部としてクエリを含むもの（partial）を返す
function findByName<T extends { name: string }>(index: T[], query: string): { found: T[], partial: boolean } {
    const q = normalize(query);
    const contained = index.filter(e => q.includes(normalize(e.name)));
    if (contained.length > 0) {
        const longest = Math.max(...contained.map(e => normalize(e.name).length));
        return { found: contained.filter(e => normalize(e.name).length == longest), partial: false };
    }
    return { found: q.length >= 2 ? index.filter(e => normalize(e.name).includes(q)) : [], partial: true };
}

// ---- 出力 ------------------------------------------------------------------------------------------

const compact = (v: unknown) => JSON.stringify(v);
const showDesc = process.argv.includes("--desc");

function printItem(item: Item, onlyDir?: string) {
    console.log(`[装備] ${item.code} ${itemName(item.code)} (${item.category}/${item.type}, ${item.grade})`);
    if (!item.fabricated) {
        console.log("  固有スキルなし（fabricated/*.json にエントリがない）");
        return;
    }
    for (const { skillCode, dir } of skillsOf(item.fabricated)) {
        if (onlyDir && dir != onlyDir) continue;
        console.log(`  スキル ${skillCode} ${skillName(skillCode)} → ${dir}`);
    }
    console.log(`  装備ごとの値: ${fabricatedPaths[item.category]} ["${item.code}"]`);
    if (item.fabricated.dmg !== undefined) console.log(`    dmg: ${compact(item.fabricated.dmg)}`);
    if (item.fabricated.values !== undefined) console.log(`    values: ${compact(item.fabricated.values)}`);
    if (item.fabricated.dmg === undefined && item.fabricated.values === undefined) console.log("    （なし）");
}

function printAbility(ability: Ability, focusItem?: Item) {
    console.log(`[スキル] ${ability.dir} ${abilityNames(ability).join(" / ")} (codes ${ability.codes.join(",")})`);
    const injected = [ability.usesDamage && "importedDamage", ability.usesValues && "importedValues"].filter(Boolean);
    console.log(`  装備からの注入: ${injected.length > 0 ? injected.join(", ") : "なし（全ての値がconstants.json等に定義）"}`);
    const constantsPath = path.join(abilityDir, ability.dir, "constants.json");
    if (ability.hasConstants) {
        console.log(`  constants: ${rel(constantsPath)}`);
        console.log(`    ${compact(JSON.parse(fs.readFileSync(constantsPath, "utf-8")))}`);
    } else {
        console.log("  constants.json なし");
    }
    if (showDesc) {
        for (const code of ability.codes) {
            const desc = l10[`Item/Skills/${code}/Desc`];
            if (desc) console.log(`  Desc(${code}): ${stripTags(desc)}`);
        }
    }
    const list = holders(ability.dir);
    console.log(`  所持装備 (${list.length}):`);
    for (const i of list) {
        const mark = focusItem && i.code == focusItem.code ? "*" : " ";
        const parts = [
            i.fabricated!.dmg !== undefined ? `dmg ${compact(i.fabricated!.dmg)}` : "",
            i.fabricated!.values !== undefined ? `values ${compact(i.fabricated!.values)}` : ""
        ].filter(Boolean).join(" ");
        console.log(`   ${mark}${i.code} ${itemName(i.code)} [${i.category}]${parts ? " " + parts : ""}`);
    }
}

// クエリ1件を解決して表示する。何も見つからなければfalse
function lookup(query: string): boolean {
    const trimmed = query.trim();
    if (/^\d+$/.test(trimmed)) {
        const code = Number(trimmed);
        const item = itemByCode.get(code);
        if (item) {
            printItem(item);
            item.fabricated && skillsOf(item.fabricated).forEach(s => abilityByDir.has(s.dir) && printAbility(abilityByDir.get(s.dir)!, item));
            return true;
        }
        const ability = abilityByCode.get(code);
        if (ability) {
            printAbility(ability);
            return true;
        }
        return false;
    }
    if (abilityByDir.has(trimmed)) {
        printAbility(abilityByDir.get(trimmed)!);
        return true;
    }

    const itemResult = findByName(itemNameIndex, trimmed);
    // 「寒波」のように、スキル名そのものが装備名（万年寒波）の一部でもある場合はスキル名を優先する
    const foundItems = itemResult.partial && findByName(skillNameIndex, trimmed).partial == false
        ? []
        : itemResult.found.map(e => e.item);
    // 装備名部分をスキル名として誤検出しないよう、装備名を取り除いてからスキル名を探す
    const rest = foundItems.length > 0 && !itemResult.partial
        ? normalize(trimmed).replace(normalize(itemName(foundItems[0].code)), "")
        : trimmed;
    const foundAbilities = [...new Set(findByName(skillNameIndex, rest).found.map(e => e.ability))];

    if (foundItems.length == 0 && foundAbilities.length == 0) return false;

    for (const item of foundItems) {
        const itemDirs = item.fabricated ? skillsOf(item.fabricated).map(s => s.dir) : [];
        const matchedDir = foundAbilities.find(a => itemDirs.includes(a.dir))?.dir;
        if (foundAbilities.length > 0 && !matchedDir) {
            console.log(`⚠ ${itemName(item.code)} は ${foundAbilities.map(a => a.dir).join("/")} を持っていない`);
        }
        printItem(item, matchedDir);
        for (const dir of matchedDir ? [matchedDir] : itemDirs) {
            const ability = abilityByDir.get(dir);
            if (ability) printAbility(ability, item);
        }
    }
    if (foundItems.length == 0) {
        foundAbilities.forEach(a => printAbility(a));
    }
    return true;
}

// ---- --file ----------------------------------------------------------------------------------------

// パッチノートの装備の節は、次のように装備名・スキル名・変更内容が別々の行に分かれることが多い
// （1行にまとまる場合もある）:
//
//   血色のマント
//   腐敗 - [固有装備効果]
//   ダメージ量 対象の最大体力の1.2(...)% → 最大体力の1.3(...)%
//   タクティカル·バイザー 最大体力 220 → 250        ← ステータスのみの調整（yarn update-valuesで反映）
//
// 装備名の行で「現在の装備」を切り替え、以降の行でその装備が持つスキル名が現れたらスキル調整として扱う。
// スキル名の判定を装備名より先に行うのは、「ファフニールの鱗」（スキル）が装備名「ファフニール」を含むため
const isChangeLine = (line: string) => /→|->|新規|削除/.test(line);

type Block = { line: number, item: Item, name: string, ability?: Ability, changes: string[] }

function parseFile(text: string) {
    const blocks: Block[] = [];
    const unresolved: string[] = [];
    let current: Block | undefined;

    const abilityOf = (item: Item, text: string) => {
        const dirs = item.fabricated ? skillsOf(item.fabricated).map(s => s.dir) : [];
        const result = findByName(skillNameIndex, text);
        return result.partial ? undefined : result.found.find(e => dirs.includes(e.ability.dir))?.ability;
    };

    text.split(/\r?\n/).forEach((raw, n) => {
        const line = raw.trim();
        if (line == "") return;

        const ability = current && abilityOf(current.item, line);
        if (current && ability) {
            // 1つの装備に複数のスキル調整がある場合はブロックを分ける
            // また、スキル名の行より前の変更行（荒野の星の「攻撃速度 40% → 42%」等）は装備ステータスの調整なので、
            // スキル調整とは別のブロックに残す
            if (current.ability || current.changes.length > 0) {
                current = { ...current, line: n + 1, ability: undefined, changes: [] };
                blocks.push(current);
            }
            current.ability = ability;
            if (isChangeLine(line)) current.changes.push(line);
            return;
        }

        const itemResult = findByName(itemNameIndex, line);
        if (!itemResult.partial && itemResult.found.length > 0) {
            const { item, name } = itemResult.found[0];
            current = { line: n + 1, item, name, changes: [] };
            current.ability = abilityOf(item, normalize(line).replace(normalize(name), ""));
            if (isChangeLine(line)) current.changes.push(line);
            blocks.push(current);
            return;
        }

        if (line.includes("固有装備効果")) {
            unresolved.push(`L${n + 1} ${line}（直前の装備: ${current?.name ?? "なし"}）`);
        } else if (current && isChangeLine(line)) {
            current.changes.push(line);
        }
    });

    // 同じ内容が重複して貼り付けられている場合があるため、装備×スキルで重複を除く
    const seen = new Set<string>();
    const printedAbilities = new Set<string>();
    const skillBlocks = blocks.filter(b => b.ability).filter(b => {
        const key = `${b.item.code}/${b.ability!.dir}/${b.changes.join("|")}`;
        return seen.has(key) ? false : (seen.add(key), true);
    });
    const statBlocks = blocks.filter(b => !b.ability).filter(b => {
        const key = `${b.item.code}/${b.changes.join("|")}`;
        return seen.has(key) ? false : (seen.add(key), true);
    });

    console.log(`== 装備スキルの調整 (${skillBlocks.length}件) ==`);
    for (const b of skillBlocks) {
        console.log(`\n---- L${b.line}: ${b.name} / ${abilityNames(b.ability!).join(" / ")}`);
        b.changes.forEach(c => console.log(`  変更: ${c}`));
        printItem(b.item, b.ability!.dir);
        if (printedAbilities.has(b.ability!.dir)) {
            console.log(`[スキル] ${b.ability!.dir}（詳細は上記）`);
        } else {
            printedAbilities.add(b.ability!.dir);
            printAbility(b.ability!, b.item);
        }
    }

    console.log(`\n== スキル調整を含まない装備 (${statBlocks.length}件、yarn update-valuesで反映される想定) ==`);
    for (const b of statBlocks) {
        console.log(`  L${b.line} ${b.item.code} ${b.name}: ${b.changes.join(" / ") || "（変更行なし）"}`);
    }

    if (unresolved.length > 0) {
        console.log(`\n== ⚠ 装備を特定できなかったスキル調整 (${unresolved.length}件) ==`);
        unresolved.forEach(u => console.log(`  ${u}`));
    }
}

// ---- --list / --check ------------------------------------------------------------------------------

function list() {
    for (const a of [...abilities].sort((x, y) => x.dir.localeCompare(y.dir))) {
        console.log(`${a.dir}\t${abilityNames(a).join(" / ")}\t${a.codes.join(",")}\t装備${holders(a.dir).length}件`);
    }
}

function keyPaths(v: unknown, prefix = ""): string[] {
    if (v === null || typeof v != "object" || Array.isArray(v)) return [prefix];
    return Object.entries(v).flatMap(([k, child]) => keyPaths(child, prefix ? `${prefix}.${k}` : k));
}

function check(): boolean {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const category of ["weapon", "armor"] as const) {
        for (const [code, entry] of Object.entries(fabricated[category])) {
            const label = `${fabricatedPaths[category]} ["${code}"] ${itemName(code)}`;
            const item = itemByCode.get(Number(code));
            if (!item) warnings.push(`${label}: nimbleapi/${category}.json に存在しない装備`);
            else if (item.category != category) errors.push(`${label}: ${item.category} の装備が ${category} 側に登録されている`);

            const skills = skillsOf(entry);
            const entryAbilities = skills.map(s => abilityByCode.get(s.skillCode)).filter((a): a is Ability => a != undefined);
            // skillCodeが配列の装備ではdmg/valuesを全スキルで共有するため、いずれかのスキルが参照していればよい
            if (entry.dmg !== undefined && !entryAbilities.some(a => a.usesDamage)) {
                warnings.push(`${label}: dmg があるが ${entryAbilities.map(a => a.dir).join("/")} は importedDamage を参照しない（未使用）`);
            }
            if (entry.values !== undefined && !entryAbilities.some(a => a.usesValues)) {
                warnings.push(`${label}: values があるが ${entryAbilities.map(a => a.dir).join("/")} は importedValues を参照しない（未使用）`);
            }
            // コード側が読まないキーは効果が反映されない（キー名の変更に追随していない等）
            const readers = entryAbilities.filter(a => a.usesValues);
            if (entry.values && typeof entry.values == "object" && readers.length > 0 && readers.every(a => a.valuesKeys)) {
                const read = new Set(readers.flatMap(a => [...a.valuesKeys!]));
                const unread = Object.keys(entry.values).filter(k => !read.has(k));
                if (unread.length > 0) {
                    errors.push(`${label}: values のキー ${unread.join(",")} を ${readers.map(a => a.dir).join("/")} は読み取らない（読み取るキー: ${[...read].join(",")}）`);
                }
            }

            for (const { skillCode, dir, name } of skills) {
                const ability = abilityByCode.get(skillCode);
                if (!ability) {
                    errors.push(`${label}: skillCode ${skillCode} を code に持つディレクトリが equipment-abilities/ に存在しない（name "${name}"）`);
                    continue;
                }
                // 注入値を参照するのに装備側にない場合は実行時にundefinedとなりクラッシュする
                if (name != dir) errors.push(`${label}: name "${name}" が skillCode ${skillCode} の実ディレクトリ "${dir}" と異なる`);
                if (ability.requiresDamage && entry.dmg === undefined) errors.push(`${label}: ${dir} は importedDamage を必須とするが dmg がない`);
                if (ability.requiresValues && entry.values === undefined) errors.push(`${label}: ${dir} は importedValues を必須とするが values がない`);
            }
        }
    }

    // 同じディレクトリの装備間でdmg/valuesのキー構成が異なるものを報告する。
    // 装備ごとに得られる効果自体が異なる（awakening等）正当なケースもあるため警告扱い
    for (const a of abilities) {
        const list = holders(a.dir);
        if (list.length < 2) continue;
        for (const field of ["dmg", "values"] as const) {
            const groups = new Map<string, number[]>();
            for (const i of list) {
                const key = keyPaths(i.fabricated![field]).sort().join(",");
                groups.set(key, [...(groups.get(key) ?? []), i.code]);
            }
            if (groups.size > 1) {
                const detail = [...groups].map(([k, codes]) => `{${k || "なし"}}: ${codes.join(",")}`).join(" | ");
                warnings.push(`${a.dir}: ${field} のキー構成が装備間で異なる → ${detail}`);
            }
        }
    }

    warnings.forEach(w => console.log(`⚠ ${w}`));
    errors.forEach(e => console.log(`✗ ${e}`));
    console.log(`\nエラー ${errors.length} 件 / 警告 ${warnings.length} 件`);
    return errors.length == 0;
}

// ---- main ------------------------------------------------------------------------------------------

const args = process.argv.slice(2).filter(a => a != "--desc");

if (args[0] == "--list") {
    list();
} else if (args[0] == "--check") {
    process.exitCode = check() ? 0 : 1;
} else if (args[0] == "--file") {
    parseFile(fs.readFileSync(path.resolve(process.cwd(), args[1]), "utf-8"));
} else if (args.length > 0) {
    if (!lookup(args.join(" "))) {
        console.log(`該当なし: ${args.join(" ")}`);
        process.exitCode = 1;
    }
} else {
    console.log("usage: yarn equip <装備名|スキル名|ディレクトリ名|ID|パッチノートの1行> [--desc] | --file <md> | --list | --check");
}
