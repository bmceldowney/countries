import debounce from './debounce'

describe('debounce', () => {
  let testFn
  let debouncedFn
  jest.useFakeTimers()

  beforeEach(() => {
    testFn = jest.fn(x => x)
    debouncedFn = debounce(testFn, 1000)
  })

  test('returns a function', () => {
    expect(debouncedFn).toBeInstanceOf(Function)
  })

  test('the returned function cannot be invoked until the cooldown time has passed', () => {
    debouncedFn()
    jest.advanceTimersByTime(500)
    expect(testFn.mock.calls.length).toBe(0)

    debouncedFn()
    jest.advanceTimersByTime(700)
    expect(testFn.mock.calls.length).toBe(0)

    jest.advanceTimersByTime(1100)
    debouncedFn()
    expect(testFn.mock.calls.length).toBe(1)
  })

  test('the returned function should pass along the arguments to the wrapped function', () => {
    testFn = () => {}
    testFn.apply = jest.fn(x => x)
    debouncedFn = debounce(testFn)
    debouncedFn('tested', 'again')

    jest.advanceTimersByTime(1100)
    expect(testFn.apply.mock.calls[0][1][0]).toBe('tested')
    expect(testFn.apply.mock.calls[0][1][1]).toBe('again')
  })

  test('the returned function should pass along the context of the wrapped function', () => {
    const context = {}
    testFn = () => {}
    testFn.apply = jest.fn(x => x)
    debouncedFn = debounce(testFn)
    debouncedFn.call(context, 'tested', 'again')

    jest.advanceTimersByTime(1100)
    expect(testFn.apply.mock.calls[0][0]).toBe(context)
  })
})
