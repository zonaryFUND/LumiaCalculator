import fs from "fs";
import readline from "readline";

const rs = fs.createReadStream("./jp.txt");
const ws = fs.createWriteStream("./src/intl/locales/ja/l10.json");

const rl = readline.createInterface({input: rs, output: ws});

const availableRegexs = [
    /Item\/Name\/\d*/,
    /Character\/Name\/\d*/,
    /ArmorType\/[a-zA-z]*/,
    /MasteryType\/[a-zA-z]*/,
    /StatType\/[a-zA-z]*/,
    /Skill\/Group\/Name\/\d*/,
    /ItemGrade\/[a-zA-Z]*/,
    /StatType\/[a-zA-z]*/,
    /Item\/Skills\/\d*/
]

const result: Record<string, string> = {};

for await (const line of rl) {
    const [key, value] = line.split("┃");
    if (availableRegexs.findIndex(reg => reg.test(key)) > -1) {
        result[key] = value;
    }
}

ws.write(JSON.stringify(result, null, 4), "utf-8");
ws.close();

