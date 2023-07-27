// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type OnEvent =`on:${string}`

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      [key: OnEvent]: CompositionEventHandler<T>;
    }
}
}

export { };
