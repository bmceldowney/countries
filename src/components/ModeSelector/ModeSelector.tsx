import React, { FC, useContext, useState } from 'react'
import Icon from '@material-ui/core/Icon'
import {
  AppState,
  AppStateDispatch,
  possibleModes,
  UPDATE_CURRENT_MODE
} from '../../state/AppStateContext'
import Popover from '@material-ui/core/Popover'
import './ModeSelector.css'

type ModeSelectorProps = {
  appState: AppState
}

const ModeSelector: FC<ModeSelectorProps> = (props) => {
  const { appState } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const appDispatch = useContext(AppStateDispatch)
  const selectedModeIndex = appState.currentModeIndex

  const clickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value: string = event.currentTarget.dataset.index || '';
    const index = parseInt(value, 10)
    appDispatch && appDispatch({ type: UPDATE_CURRENT_MODE, payload: index })
    handleClose()
  }

  const modeComponents = possibleModes.map((mode, index) => {
    const selectedClass = selectedModeIndex === index ? 'mode-selected' : ''
    return (
      <div
        key={index}
        data-index={index}
        className={`mode-item ${selectedClass}`}
        onClick={clickHandler}
      >
        {mode.name}
      </div>
    )
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className='mode-container'>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: 'mode-popover-paper'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className='popover-content'>
          <div className='modes'>{modeComponents}</div>
        </div>
      </Popover>
      <div className='selected-mode' onClick={handleClick}>
        <div>{possibleModes[selectedModeIndex].name}</div>
        <Icon>keyboard_arrow_right</Icon>
      </div>
      <div className='modes-container'>
        <div className='modes'>{modeComponents}</div>
      </div>
    </div>
  )
}

export default ModeSelector
