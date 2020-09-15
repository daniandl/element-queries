import add from '../src'

xdescribe('Test', () => {
  it('should do basic addition', () => {
    expect(add(1, 2)).toBe(3)
  })
})
