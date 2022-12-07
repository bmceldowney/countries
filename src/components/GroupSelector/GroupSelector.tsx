import React, { FC, useContext, useState } from 'react'
import AppDataContext, { PrefilteredCollection } from '../../state/AppDataContext'
import Icon from '@material-ui/core/Icon'
import {
  AppState,
  AppStateDispatch,
  possibleModes,
  UPDATE_GROUP_ITEM_INDEX
} from '../../state/AppStateContext'
import Popover from '@material-ui/core/Popover'

import './GroupSelector.css'
import { ScrollState } from '../../state/ScrollContext'

type GroupSelectorProps = {
  appState: AppState
  scrollState: ScrollState
}

const GroupSelector: FC<GroupSelectorProps> = (props) => {
  const { appState, scrollState } = props
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const appDispatch = useContext(AppStateDispatch)
  const appData = useContext(AppDataContext)
  const modeKey: string = possibleModes[appState.currentModeIndex].dataKey
  const modeData: PrefilteredCollection = appData[modeKey]
  const groupName = modeData.mapArray[scrollState.topItemIndex]

  const clickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = event.currentTarget.dataset.index || ''
    const index = parseInt(value, 10)
    appDispatch && appDispatch({ type: UPDATE_GROUP_ITEM_INDEX, payload: index })
    handleClose()
  }

  const groupButtons = Object.entries(modeData.breakData).map(
    ([key, value], index) => {
      const selectedClass = groupName === value ? 'group-button-selected' : ''
      return (
        <div
          className={`group-button ${selectedClass}`}
          key={index}
          data-index={key}
          onClick={clickHandler}
        >
          {value}
        </div>
      )
    }
  )

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className='group-selector-container'>
      <div className='group-selector' onClick={handleClick}>
        <div>{groupName}</div>
        <Icon>keyboard_arrow_right</Icon>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: 'group-popover-paper'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {groupButtons}
      </Popover>
    </div>
  )
}

export default GroupSelector
