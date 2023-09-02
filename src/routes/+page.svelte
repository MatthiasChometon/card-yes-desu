<script lang="ts">
	import { onMount } from 'svelte';
	import type { Peerjs } from '../types/Peerjs.type';

	let peer: Peerjs['Peer']['prototype'];
	let connection: Peerjs['DataConnection']['prototype'];
	let connectId: string;

	onMount(async () => {
		const peerjs: Peerjs = await import('peerjs');
		peer = new peerjs.Peer();

		peer.on('open', function (id) {
			console.log('My peer ID is: ' + id);

			peer.on('connection', function (conn) {
				console.log('connect another peer');
			});
		});
	});

	function connect() {
		connection = peer.connect(connectId);
		// connection.on('open', function () {
		// 	connection.send('hi!');
		// });
	}
</script>

<input type="text" bind:value={connectId} />
<button on:click={connect}>Connect</button>
