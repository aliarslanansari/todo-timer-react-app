import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd"

export interface TaskItemType {
  title: string
  duration: number
  completed: number
  createdAt: string
}

export const reorder = (
  list: TaskItemType[],
  startIndex: number,
  endIndex: number
): TaskItemType[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
})

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  ...draggableStyle,
})
