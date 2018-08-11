import router from '@/router'

/**
 * These tests should better be done integrated (w/ App) instead.
 */

it('should contain Home component at root', () => {
  const atRoot = router.getMatchedComponents('/')
  expect(atRoot).toContainEqual(
    expect.objectContaining({ name: 'Home' })
  )
})

it('should contain Portfolio component at /portfolio', () => {
  const atPortfolio = router.getMatchedComponents('/portfolio')
  expect(atPortfolio).toContainEqual(
    expect.objectContaining({ name: 'Portfolio' })
  )
})

it('should contain Stocks component at /stocks', () => {
  const atStocks = router.getMatchedComponents('/stocks')
  expect(atStocks).toContainEqual(
    expect.objectContaining({ name: 'Stocks' })
  )
})
