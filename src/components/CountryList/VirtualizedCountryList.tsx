import React, { useContext, useEffect, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import CircularProgress from '@material-ui/core/CircularProgress'
import CountryItem from '../CountryItem/CountryItem'
import AppDataContext from '../../state/AppDataContext'
import {
  ScrollDispatch,
  UPDATE_TOP_ITEM_INDEX
} from '../../state/ScrollContext'
import { possibleModes } from '../../state/AppStateContext'
import debounce from '../../utils/debounce'
import './CountryList.css'

const cache = new CellMeasurerCache({
  defaultHeight: 80,
  fixedWidth: true
})

const VirtualizedCountryList = ({ props: { appState } }) => {
  const [lastTopIndex, setLastTopIndex] = useState(0)
  const appData = useContext(AppDataContext)
  const scrollDispatch = useContext(ScrollDispatch)
  const byIds = appData.byIds
  const dataKey = possibleModes[appState.currentModeIndex].dataKey
  const items = appData[dataKey].ids
  const listComponentReference = useRef(null)

  // Recalculate the list elements row height after a window resize
  useEffect(() => {
    const handleResize = () => {
      cache.clearAll()
      if (!listComponentReference || !listComponentReference.current) return
      listComponentReference.current.recomputeRowHeights()
    }
    const debouncedResizeHandler = debounce(handleResize, 100)

    window.addEventListener('resize', debouncedResizeHandler)
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  })

  useEffect(() => {
    cache.clearAll()
    if (!listComponentReference || !listComponentReference.current) return
    listComponentReference.current.recomputeRowHeights()
  }, [dataKey])

  useEffect(() => {
    if (!listComponentReference || !listComponentReference.current) return
    listComponentReference.current.scrollToRow(appState.currentGroupItemIndex)
  }, [appState.currentGroupItemIndex])

  useEffect(() => {
    if (!listComponentReference || !listComponentReference.current) return
    listComponentReference.current.scrollToRow(0)
  }, [appState.currentModeIndex])

  const scrollHandler = event => {
    const { startIndex } = event
    if (startIndex !== lastTopIndex) {
      scrollDispatch({ type: UPDATE_TOP_ITEM_INDEX, payload: startIndex })
    }
    setLastTopIndex(startIndex)
  }

  const virtualizedWindow = (
    <AutoSizer>
      {({ width, height }) => (
        <List
          ref={listComponentReference}
          onRowsRendered={scrollHandler}
          width={width}
          height={height}
          rowCount={items.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          scrollToAlignment={'start'}
        />
      )}
    </AutoSizer>
  )

  const rowRenderer = ({ index, style, key, parent }) => {
    const id = items[index]
    // these are values from the css, inlining here as required by react-virtualized
    const paddingRem = 2
    const marginRem = 0.2
    const borderPx = 2
    const heightCalc = `${paddingRem + marginRem}rem - ${borderPx}px`

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <CountryItem
          style={{
            ...style,
            width: `calc(${style.width} - ${paddingRem}rem - ${borderPx}px)`,
            height: `calc(${style.height}px - ${heightCalc})`
          }}
          key={key}
          data={byIds[id]}
          languageData={appData[dataKey].mapArray[index]}
          currentModeIndex={appState.currentModeIndex}
        />
      </CellMeasurer>
    )
  }

  const loadingComponent = (
    <div className='country-loading'>
      <CircularProgress />
    </div>
  )

  return (
    <div className='country-list'>
      {items.length ? virtualizedWindow : loadingComponent}
    </div>
  )
}

export default VirtualizedCountryList
