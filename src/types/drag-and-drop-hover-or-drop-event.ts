import type { DragEvent } from "../enums/drag-event"

export interface DragAndDropHoverOrDropEvent<T> {
  detail: {
    items: T
    info: {
      trigger: DragEvent
      id: string
    }
  }
}
