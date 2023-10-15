import { writable, type Writable } from 'svelte/store';

function getFromLocalStorage<T> (isBrowser: boolean, initialValue: T, storageKey: string): T {
  if (!isBrowser) return initialValue;

  const localStorageData: null | string = localStorage.getItem(storageKey)

  if (localStorageData === null) return initialValue

  return JSON.parse(localStorageData)
}

export function localStorageStore<T> (storageKey: string, initialValue: T): Writable<T> {
  const isBrowser: boolean = typeof window !== 'undefined';
  const storedValue = getFromLocalStorage(isBrowser, initialValue, storageKey)
  const store = writable<T>(storedValue);

  store.subscribe(($store) => {
    if (!isBrowser) return
    localStorage.setItem(storageKey, JSON.stringify($store));
  });

  return store;
}
