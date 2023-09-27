<script lang="ts">
	import { onMount } from 'svelte';
	import Notification from '../components/notification.svelte';
	import { lastCardsReleaseDate, setAllCards } from '../store/all-cards.store';

	let showNotification: boolean = false;
	let notificationText: string = '';

	async function setCards(): Promise<void> {
		const date = $lastCardsReleaseDate === null ? null : new Date($lastCardsReleaseDate);
		const response = await setAllCards(date);
		notificationText =
			response === null ? 'There was an error downloading last cards' : 'Last cards has been downloaded';
		showNotification = true;
	}
	onMount(() => {
		setCards();
	});
</script>

<div style="display: flex; width: 100%; height: 100vh; justify-content: flex-end;">
	<slot />
	<Notification isVisible={showNotification}>{notificationText}</Notification>
</div>
