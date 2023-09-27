<script lang="ts">
	import { onMount } from 'svelte';
	import Notification from '../components/notification.svelte';
	import { lastCardsReleaseDate, setAllCards } from '../store/all-cards.store';

	let showNotification: boolean = false;
	let notificationText: string = '';

	async function setCards(): Promise<void> {
		const date = $lastCardsReleaseDate === null ? null : new Date($lastCardsReleaseDate);
		const response = await setAllCards(date);
		if (response === 'noDataToUpdate') return;
		if (response === 'error') notificationText = 'There was an error downloading last cards';
		if (response === 'dataUpdated') notificationText = 'Last cards has been downloaded';
		showNotification = true;
	}
	onMount(() => {
		setCards();
	});
</script>

<div style="display: flex; width: 100%; height: 100vh; justify-content: flex-end; overflow: hidden;">
	<slot />
	<Notification isVisible={showNotification}>{notificationText}</Notification>
</div>
