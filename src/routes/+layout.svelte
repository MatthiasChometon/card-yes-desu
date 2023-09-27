<script lang="ts">
	import { onMount } from 'svelte';
	import Notification from '../components/notification.svelte';
	import { lastCardsReleaseDate, setAllCards } from '../store/all-cards.store';
	import { notification, setNotificationIsVisible, setNotificationText } from '../store/notification.store';

	async function setCards(): Promise<void> {
		const date = $lastCardsReleaseDate === null ? null : new Date($lastCardsReleaseDate);
		const response = await setAllCards(date);
		if (response === 'noDataToUpdate') return;
		if (response === 'error') setNotificationText('There was an error downloading last cards');
		if (response === 'dataUpdated') setNotificationText('Last cards has been downloaded');
		setNotificationIsVisible(true);
	}
	onMount(() => {
		setCards();
	});
</script>

<div style="display: flex; width: 100%; height: 100vh; justify-content: flex-end; overflow: hidden;">
	<slot />
	<Notification>{$notification.text}</Notification>
</div>
