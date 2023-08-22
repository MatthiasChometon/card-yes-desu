<script lang="ts">
	import CardZone from '../components/card-zone.svelte';
	import type { CardType } from '../types/card.type';

	const cardRatio: number = 13.6 / 9;
	let cards: CardType[] = [
		{
			id: '1',
			frontPicture: 'https://m.media-amazon.com/images/I/51N+J-WhXCL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png'
		},
		{
			id: '2',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png'
		},
		{
			id: '3',
			frontPicture: 'https://m.media-amazon.com/images/I/51WGL9K+AQL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png'
		},
		{
			id: '4',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png'
		}
	];
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: center;">
	<div
		style="aspect-ratio: {cardRatio}; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column;"
	>
		<img
			style="aspect-ratio: {cardRatio}; height: 100%; position: absolute; z-index: -1;"
			src="yugioh-field.webp"
			alt="yugioh field"
		/>
		<div style="aspect-ratio: {cardRatio}; height: 100%; display: flex; flex-direction: column;">
			<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
				<CardZone superimposed {cards} style="margin-left: 2.1%;" />
				<CardZone style="margin-left: 12.2%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone superimposed style="margin-left: 12.2%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone superimposed style="margin-left: 2.1%;" />
				<CardZone superimposed style="margin-left: 1.8%;" />
				<CardZone style="margin-left: 2.2%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone superimposed style="margin-left: 2.5%;" />
				<CardZone style="margin-left: 1.6%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone style="margin-left: 34.4%; margin-top: 0.2%;" />
				<CardZone style="margin-left: 15.2%; margin-top: 0.2%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone style="margin-left: 2.3%;" />
				<CardZone superimposed style="margin-left: 1.6%;" />
				<CardZone style="margin-left: 2.4%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone superimposed style="margin-left: 2.4%;" />
				<CardZone superimposed style="margin-left: 1.6%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
				<CardZone superimposed style="margin-left: 2.3%;" />
				<CardZone style="margin-left: 12.2%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone superimposed style="margin-left: 12.2%;" />
			</div>
		</div>
	</div>
</div>
