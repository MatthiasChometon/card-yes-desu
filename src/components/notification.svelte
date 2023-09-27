<script lang="ts">
	import { fade } from 'svelte/transition';
	export let isVisible: boolean = false;

	$: {
		if (isVisible) {
			setTimeout(() => {
				isVisible = false;
			}, 3000);
		}
	}
</script>

{#if isVisible}
	<div
		in:fade
		out:fade={{ duration: 400 }}
		style="border-radius: 5px; position: fixed; bottom: 5%; right: 5%; background-color: #f0f0f0; padding: 20px; border: 1px solid #ccc; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); z-index: 9999;"
	>
		<slot />
	</div>
{/if}
