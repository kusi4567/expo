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
    try {
        await fs_1.default.promises.rename(src, dest);
    }
    catch (error) {
        // NOTE(@kitten): Unsure if this can happen across file systems, so it's better to handle that case
        if (error.code === 'EXDEV') {
            await fs_1.default.promises.cp(src, dest, { errorOnExist: true, recursive: true });
            await fs_1.default.promises.rm(src, { recursive: true, force: true });
        }
        else {
            throw error;
        }
    }
}
exports.moveAsync = moveAsync;
//# sourceMappingURL=dir.js.map