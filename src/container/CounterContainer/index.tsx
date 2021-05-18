import React from "react"
import styled, { css } from "styled-components"
import AddIcon from "../../Assets/Icons/AddIcon"
import PauseButtonIcon from "../../Assets/Icons/PauseButtonIcon"

const PageContainer = styled.div`
  padding-top: 10px;
  padding-right: 20%;
  padding-left: 20%;
  background-color: #deeeff;
  height: calc(100vh - 0px); // TODO: change this when header is added
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

const StyledTitle = styled.h2`
  font-size: 1rem;
  padding: 0 0.5rem;
  margin: 0;
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
const IncDecButton = styled.h1`
  margin: 0 2rem;
  font-size: 2rem;
  cursor: pointer;
`

const StyledPauseButtonIcon = styled(PauseButtonIcon)`
  height: 2rem;
`
const StyledAddIcon = styled(AddIcon)`
  margin-bottom: 0.5rem;
  width: 2rem;
  font-weight: 500;
`

const AddTaskCard = styled.div`
  font-size: 0.7rem;
  background-color: #d1ddeb;
  cursor: pointer;
  ${TaskCardStyle}
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
  const [taskList, setTaskList] = React.useState([
    {
      title: "Reply Emails",
      duration: 10,
      completed: 120,
    },
  ])
  React.useEffect(() => {
    setTaskList((p) => [
      ...p,
      {
        title: "Read The Almanack of NR",
        duration: 30,
        completed: 0,
      },
    ])
  }, [])
  return (
    <PageContainer>
      <Timer>00:00</Timer>
      <span>{taskList.length ? taskList[0].title : "no task"}</span>
      <Controller>
        <IncDecButton>+5</IncDecButton>
        <StyledPauseButtonIcon />
        <IncDecButton>-5</IncDecButton>
      </Controller>
      {taskList.map((item) => (
        <TaskCard>
          <StyledTitle>{item.title}</StyledTitle>
          <TaskController>
            <DurationInput value={item.duration} type="number" />
            <TaskControl>Delete</TaskControl>
            <TaskControl>Reset</TaskControl>
            <TaskControl>Complete</TaskControl>
            <CompleteTimeDiv>00:40</CompleteTimeDiv>
          </TaskController>
        </TaskCard>
      ))}
      <AddTaskCard>
        <StyledAddIcon />
        <span>ADD TASK</span>
      </AddTaskCard>
    </PageContainer>
  )
}

export default CounterContainer
