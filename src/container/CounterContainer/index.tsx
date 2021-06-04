import { cloneDeep, debounce } from "lodash"
import React from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd"
import styled, { css } from "styled-components"
import AddIcon from "../../Assets/Icons/AddIcon"
import PausePlayButton from "../../components/PausePlayButton"
import {
  getItemStyle,
  getListStyle,
  reorder,
  TaskItemType,
} from "../../utils/dndUtils"
import { rippleEffect } from "../../utils/styleUtils"

const PageContainer = styled.div`
  padding-top: 10px;
  padding-right: 20%;
  padding-left: 20%;
  background-color: #deeeff;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  @media (max-width: 700px) {
    padding-right: 10%;
    padding-left: 10%;
  }
  @media (max-width: 500px) {
    padding-right: 5%;
    padding-left: 5%;
  }
`
const Timer = styled.div`
  font-size: 4rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
`

const Controller = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
`

const TaskCardStyle = css`
  border-radius: 5px 5px 5px 5px;
  -moz-border-radius: 5px 5px 5px 5px;
  -webkit-border-radius: 5px 5px 5px 5px;
  height: 4rem;
  width: 50%;
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: column;
  margin: 0 0 1rem 0;
  justify-content: center;
  @media (max-width: 1100px) {
    min-width: 90%;
  }
  @media (max-width: 700px) {
    min-width: 93%;
  }
  @media (max-width: 500px) {
    min-width: 95%;
  }
`
const TaskCard = styled.div`
  background-color: #f1f8ff;
  box-shadow: rgb(224 224 224) 0px 2px 3px;
  ${TaskCardStyle}
  justify-content: space-around;
  flex-direction: column;
`

const StyledTitle = styled.input`
  font-size: 1rem;
  padding: 0 0.5rem;
  margin: 0;
  border: none;
  background: none;
  line-height: 2rem;
  &:focus {
    border: 1px dashed rgb(221, 221, 221);
    outline: none;
    border-radius: 6px;
  }
`

const TaskController = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
`
const TaskControl = styled.button`
  font-size: 0.7rem;
  cursor: pointer;
  background: none;
  border: none;
  &:hover {
    transform: scale(1.05, 1.05);
  }
`
const CompleteTimeDiv = styled.span`
  font-size: 0.8rem;
  background-color: #d4e9ff;
  padding: 0.2rem;
  border-radius: 4px;
`
const IncDecButton = styled.button`
  margin: 0 2rem;
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  user-select: none; /* Standard */
`
const StyledAddIcon = styled(AddIcon)`
  margin-bottom: 0.5rem;
  width: 2rem;
  font-weight: 500;
`

const AddTaskCard = styled.div`
  font-size: 0.7rem;
  background-color: #d1ddeb;
  ${TaskCardStyle}
  ${rippleEffect("#d1ddeb", "#deeeff")}
  &:hover {
    box-shadow: rgb(224 224 224) 0px 2px 3px;
  }
`

const DurationInput = styled.input`
  display: flex;
  font-size: 0.8rem;
  cursor: pointer;
  background: none;
  border: none;
  width: 30px;
  cursor: pointer;
  &:focus {
    border-radius: 6px;
  }
`

const CounterContainer = () => {
  const [taskList, setTaskList] = React.useState<TaskItemType[]>([
    {
      title: "Reply Emails",
      duration: 10,
      completed: 120,
      createdAt: "2021-05-19T14:21:05.505Z",
    },
    {
      title: "Read The Almanack of NR",
      duration: 30,
      completed: 0,
      createdAt: "2021-05-19T14:23:17.157Z",
    },
  ])
  const [currentTimer, setCurrentTimer] = React.useState("00:00")
  const [paused, setPaused] = React.useState(true)

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items: TaskItemType[] = reorder(
      taskList,
      result.source.index,
      result.destination.index
    )

    setTaskList(items)
  }

  const updateState = debounce((newState: TaskItemType[]) => {
    setTaskList(newState)
  }, 500)

  const handleTimeIncrementDecrement = (by: number) => () => {
    const newTaskList = cloneDeep(taskList)
    const duration = newTaskList[0].duration + by
    newTaskList[0].duration = duration >= 0 ? duration : 0
    setTaskList(newTaskList)
  }

  return (
    <PageContainer>
      <Timer>{currentTimer}</Timer>
      <span>{taskList.length ? taskList[0].title : "no task"}</span>
      <Controller>
        <IncDecButton onClick={handleTimeIncrementDecrement(5)}>
          +5
        </IncDecButton>
        <PausePlayButton paused={paused} onClick={() => setPaused((p) => !p)} />
        <IncDecButton onClick={handleTimeIncrementDecrement(-5)}>
          -5
        </IncDecButton>
      </Controller>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot): JSX.Element => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {taskList.map((item, index) => (
                <Draggable
                  key={item.createdAt}
                  draggableId={item.createdAt}
                  index={index}>
                  {(provided, snapshot): JSX.Element => (
                    <TaskCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}>
                      <StyledTitle
                        onChange={(e) => {
                          const newArr = taskList.map((item, ind) => {
                            if (ind === index) {
                              return {
                                ...item,
                                title: e.currentTarget?.value,
                              }
                            }
                            return item
                          })
                          updateState(newArr)
                        }}
                        defaultValue={item.title || "no name"}
                      />
                      <TaskController>
                        <DurationInput
                          value={item.duration}
                          type="number"
                          onChange={(e) => {
                            const newArr = taskList.map((item, ind) => {
                              if (ind === index) {
                                return {
                                  ...item,
                                  duration: +e.currentTarget?.value,
                                }
                              }
                              return item
                            })
                            updateState(newArr)
                          }}
                        />
                        <TaskControl
                          onClick={() => {
                            setTaskList((tasks) =>
                              tasks.filter((i, ind) => ind !== index)
                            )
                          }}>
                          Delete
                        </TaskControl>
                        <TaskControl
                          onClick={() => {
                            setTaskList((tasks) => {
                              tasks[index] = {
                                ...tasks[index],
                                completed: 0,
                              }
                              return tasks
                            })
                          }}>
                          Reset
                        </TaskControl>
                        <TaskControl>Complete</TaskControl>
                        <CompleteTimeDiv>{item.completed}</CompleteTimeDiv>
                      </TaskController>
                    </TaskCard>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddTaskCard
        onClick={() => {
          setTaskList((tasks) => [
            ...tasks,
            {
              title: "New Task",
              duration: 10,
              completed: 120,
              createdAt: new Date().toISOString(),
            },
          ])
        }}>
        <StyledAddIcon height={20} />
        <span>ADD TASK</span>
      </AddTaskCard>
    </PageContainer>
  )
}

export default CounterContainer
