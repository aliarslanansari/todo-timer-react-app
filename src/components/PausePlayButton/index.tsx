import React from "react"
import styled, { css } from "styled-components"
import PauseButtonIcon from "../../Assets/Icons/PauseButtonIcon"
import PlayButtonIcon from "../../Assets/Icons/PlayButtonIcon"

const playPauseStyle = css`
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`
const StyledPauseButtonIcon = styled(PauseButtonIcon)`
  ${playPauseStyle}
`
const StyledPlayButtonIcon = styled(PlayButtonIcon)`
  ${playPauseStyle}
`

const PausePlayButton = ({
  paused,
  onClick,
}: {
  paused: boolean
  onClick: Function
}) => {
  return paused ? (
    <StyledPlayButtonIcon onClick={() => onClick()} />
  ) : (
    <StyledPauseButtonIcon onClick={() => onClick()} />
  )
}

export default React.memo(PausePlayButton)
