import { render, screen } from '@testing-library/react'
import App from 'src/App'

describe('Test App', () => {
  it('Should render MyView view', () => {
    render(<App />)

    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
