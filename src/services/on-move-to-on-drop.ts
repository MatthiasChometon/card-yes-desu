import { DragEvent } from "../enums/drag-event";

export function onMoveToOnDrop (trigger: DragEvent, onDropAction: () => void) {
  if (trigger === DragEvent.draggedEntered) {
    console.log('trigger : ', trigger)
    onDropAction();
  }
}
