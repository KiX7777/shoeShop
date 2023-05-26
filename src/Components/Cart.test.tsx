export {}
import {
  findAllByTestId,
  findByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from '../App'
import store from '../store/Store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('cart testing', () => {
  beforeAll(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )
  })

  test('adds to cart', async () => {
    const productsLink = screen.getAllByRole('link')
    await userEvent.click(productsLink[0])
    const prodLink = await screen.findAllByRole('listitem')
    await userEvent.click(prodLink[0])
    // const price = await screen.findByText('€109.95')
    const addBtn = await screen.findByText('Add to cart')
  })
})
