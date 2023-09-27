<script lang="ts">
	import { goto } from '$app/navigation';

	export let redirectionContainerStyle: string = '';
</script>

<div style={redirectionContainerStyle}>
	<button on:click={() => goto('/')} aria-label="duel">duel</button>
	<button on:click={() => goto('/decks')} aria-label="your decks">your decks</button>
</div>
