"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveAsync = exports.ensureDirectoryAsync = exports.directoryExistsAsync = void 0;
const fs_1 = __importDefault(require("fs"));
async function directoryExistsAsync(file) {
    return (await fs_1.default.promises.stat(file).catch(() => null))?.isDirectory() ?? false;
}
exports.directoryExistsAsync = directoryExistsAsync;
async function ensureDirectoryAsync(path) {
    await fs_1.default.promises.mkdir(path, { recursive: true });
}
exports.ensureDirectoryAsync = ensureDirectoryAsync;
async function moveAsync(src, dest) {
    await fs_1.default.promises.rename(src, dest);
}
exports.moveAsync = moveAsync;
//# sourceMappingURL=dir.js.map