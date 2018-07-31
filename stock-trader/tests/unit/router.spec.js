import router from '@/router'

describe('Component Matching', () => {
  it('Home component at "/"', () => {
    const Home =
      router.getMatchedComponents('/')
      .filter(comp => comp.name === 'Home')
    expect(Home.length).toBe(1)
  })

  it('Portfolio component at "/portfolio"', () => {
    const Portfolio =
      router.getMatchedComponents('/portfolio')
      .filter(comp => comp.name === 'Portfolio')
    expect(Portfolio.length).toBe(1)
  })

  it('Stocks component at "/stocks"', () => {
    const Stocks =
      router.getMatchedComponents('/stocks')
      .filter(comp => comp.name === 'Stocks')
    expect(Stocks.length).toBe(1)
  })
})
