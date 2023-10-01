<script lang="ts">
	import { onMount } from 'svelte';

	export let query: string;

	let mql: MediaQueryList | null = null;
	let mqlListener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null = null;
	let wasMounted = false;
	let matches = false;

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}

	function addNewListener(query: string) {
		mql = window.matchMedia(query);
		mqlListener = (ev: MediaQueryListEvent) => (matches = ev.matches);
		mql.addEventListener('change', mqlListener as EventListener);
		matches = mql.matches;
	}

	function removeActiveListener() {
		if (mql && mqlListener) {
			mql.removeEventListener('change', mqlListener as EventListener);
		}
	}
</script>

<slot {matches} />
