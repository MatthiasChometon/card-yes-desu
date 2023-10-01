import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
import { DragEvent } from "../enums/drag-event";
import type { DragAndDropHoverOrDropEvent } from "../types/drag-and-drop-hover-or-drop-event";
import { createRandomId } from "./create-random-id";

interface ReturnType<ItemType extends { id: string, isDndShadowItem?: boolean }> {
  items: ItemType[];
}

export function handleDragAndDropConsiderCopy<ItemType extends { id: string, isDndShadowItem?: boolean }> ({ detail }: DragAndDropHoverOrDropEvent<ItemType[]>, items: ItemType[]): ReturnType<ItemType> {
  const { trigger, id } = detail.info;

  if (trigger === DragEvent.dragStarted) {
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) return { items: [...items] };
    let newItems = structuredClone(detail.items)
    newItems = newItems.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
    newItems.splice(idx, 0, { ...items[idx], id: createRandomId() });
    return { items: newItems };
  }
  return { items: [...items] };
}
