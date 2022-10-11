import MagicString from 'magic-string';
import type { Plugin } from 'rollup';

export default function addCliEntry(): Plugin {
	return {
		name: 'add-cli-entry',
		buildStart() {
			this.emitFile({
				fileName: 'bin/aliyun-ddns',
				id: 'cli/cli.ts',
				preserveSignature: false,
				type: 'chunk'
			});
		},
		renderChunk(code, chunkInfo) {
			if (chunkInfo.fileName === 'bin/aliyun-ddns') {
				const magicString = new MagicString(code);
				magicString.prepend('#!/usr/bin/env node\n\n');
				return { code: magicString.toString(), map: magicString.generateMap({ hires: true }) };
			}
			return null;
		}
	};
}
