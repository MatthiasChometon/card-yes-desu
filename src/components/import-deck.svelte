<script lang="ts">
	import { convertFileListYdkToCustomDecks } from '../services/convert-file-list-ydk-to-custom-decks';
	import type { DeckType } from '../types/deck.type';

	export let onDecksImport: (decks: DeckType[]) => void;

	async function onDeckInputChange({ target: { files } }: { target: { files: FileList } }): Promise<void> {
		if (files === null || files.length === 0) return;
		const decks = await convertFileListYdkToCustomDecks(files);
		onDecksImport(decks);
	}
</script>

<div style="display: flex;">
	<label for="customDeckFromInput">Upload ydk deck:</label>
	<input on:change={onDeckInputChange} accept=".ydk" id="customDeckFromInput" multiple type="file" />
</div>
