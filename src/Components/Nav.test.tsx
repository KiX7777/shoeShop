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
import { Swiper, SwiperSlide } from 'swiper/react'
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

  test('opens cart on click', async () => {
    const cart = screen.getByAltText('cart logo')
    await userEvent.click(cart)
    const cartCont = await screen.findByTestId('cartContainer')
    expect(cartCont).toHaveClass('openCart')
    const cartProducts = await screen.findByTestId('cartContainer')
    expect(cartProducts).toha
  })
})
