<script lang="ts">
	import type { CardType } from '../types/card.type';
	export let style: string = '',
		card: CardType;
</script>

<div role="button" tabindex="0" style="background-color: {card.color}; color: white; {style}" />
