import dataFetch from './dataFetch'

describe('dataFetch', () => {
  let mockResponse = null

  beforeEach(() => {
    mockResponse = {
      json: () => {
        return { cards: {} }
      }
    }

    fetch = jest.fn().mockResolvedValue(mockResponse)
  })

  test('returns a json object', async done => {
    const json = await dataFetch()

    expect(json.cards).toBeInstanceOf(Object)
    done()
  })

  test('throws an exception if json cannot be parsed', async done => {
    mockResponse.json = () => {
      return { error: 'ohno' }
    }

    try {
      await dataFetch()
    } catch (error) {
      expect(error).toBe('ohno')
      done()
    }
  })
})
