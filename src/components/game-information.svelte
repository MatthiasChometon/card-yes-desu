<script lang="ts">
	import { onMount } from 'svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import ConnectPlayersOnline from './connect-players-online.svelte';
	import type { PlayersConnectionType } from '../types/players-connection.type';

	export let style = '',
		fieldCards: CardFieldZoneType,
		playersConnection: PlayersConnectionType,
		connectToCreatedGame: () => void;

	const gameState = {
		rotation: 0,
		faceUp: true
	};
	const cardsExamples: PlayableCard[] = [
		{
			id: '1',
			frontPicture: 'https://m.media-amazon.com/images/I/51N+J-WhXCL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '2',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '3',
			frontPicture: 'https://m.media-amazon.com/images/I/51WGL9K+AQL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '42',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '22',
			frontPicture:
				'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '312',
			frontPicture: 'https://m.media-amazon.com/images/I/51WGL9K+AQL._AC_UF894,1000_QL80_.jpg',
			backPicture: 'back-card.png',
			gameState
		},
		{
			id: '42222',
			frontPicture: 'https://www.goatformat.com/uploads/1/1/9/9/119901143/magicianoffaith-sdcl-en-c-1e_orig.png',
			backPicture: 'back-card.png',
			gameState
		}
	];

	function setTestCards() {
		fieldCards = {
			...fieldCards,
			HostPlayer: { ...fieldCards.HostPlayer, Hand: cardsExamples },
			InvitedPlayer: {
				...fieldCards.InvitedPlayer,
				Hand: [
					{
						id: '4545454545455',
						frontPicture: 'https://m.media-amazon.com/images/I/51N+J-WhXCL._AC_UF894,1000_QL80_.jpg',
						backPicture: 'back-card.png',
						gameState
					},
					{
						id: '668886688',
						frontPicture:
							'https://images.saymedia-content.com/.image/t_share/MTc0NDYwODIxMDE4MTI1Njcy/top-10-strongest-yu-gi-oh-flip-effect-monsters.png',
						backPicture: 'back-card.png',
						gameState
					}
				]
			}
		};
	}

	onMount(() => {
		setTestCards();
	});
</script>

<div {style}>
	<button
		on:click={() => {
			fieldCards = getDefaultCardFieldZone();
			setTestCards();
		}}>Reset</button
	>
	<ConnectPlayersOnline bind:playersConnection {connectToCreatedGame} />
</div>
