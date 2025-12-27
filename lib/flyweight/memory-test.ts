// 問題20-2: メモリ消費量の比較

import { BigString } from "./big-string";

// テスト用の長い文字列（同じ文字が繰り返される）
const testString = "1".repeat(1000) + "2".repeat(1000) + "3".repeat(1000);

console.log("=== Flyweight パターン メモリ比較 ===\n");
console.log(`テスト文字列長: ${testString.length}文字`);
console.log(`文字の種類: 3種類（"1", "2", "3"）\n`);

// 共有する場合
const beforeShared = process.memoryUsage().heapUsed;
const sharedStrings: BigString[] = [];
for (let i = 0; i < 100; i++) {
  sharedStrings.push(new BigString(testString, true));
}
const afterShared = process.memoryUsage().heapUsed;
const sharedMemory = afterShared - beforeShared;

console.log("【共有あり（shared = true）】");
console.log(`BigString 100個作成`);
console.log(`使用メモリ: ${(sharedMemory / 1024).toFixed(2)} KB`);
console.log(`BigCharインスタンス数: 3個のみ（全BigStringで共有）\n`);

// 共有しない場合
const beforeNotShared = process.memoryUsage().heapUsed;
const notSharedStrings: BigString[] = [];
for (let i = 0; i < 100; i++) {
  notSharedStrings.push(new BigString(testString, false));
}
const afterNotShared = process.memoryUsage().heapUsed;
const notSharedMemory = afterNotShared - beforeNotShared;

console.log("【共有なし（shared = false）】");
console.log(`BigString 100個作成`);
console.log(`使用メモリ: ${(notSharedMemory / 1024).toFixed(2)} KB`);
console.log(`BigCharインスタンス数: ${(testString.length * 100).toLocaleString()}個（${testString.length} × 100）\n`);

// 比較
console.log("=== 結果 ===");
const ratio = (notSharedMemory / sharedMemory).toFixed(2);
console.log(`共有なし / 共有あり = ${ratio}倍`);
console.log(`節約メモリ: ${((notSharedMemory - sharedMemory) / 1024).toFixed(2)} KB`);
