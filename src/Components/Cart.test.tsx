export {}
import {
  findAllByTestId,
  findByTestId,
  findByText,
  queryByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from '../App'
import store from '../store/Store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('cart testing', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    )
  })

  test('renders page', async () => {
    const productsLink = screen.getAllByRole('link')
    await userEvent.click(productsLink[0])
    const prodLink = await screen.findByText(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
    )
    await userEvent.click(prodLink)
    const delivery = await screen.findByText('Free delivery over 50€')

    const addBtn = await screen.findByText('Add to cart')
    expect(delivery).toBeInTheDocument()
    expect(addBtn).toBeInTheDocument()
  })
})

test('adds to cart', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    { wrapper: BrowserRouter }
  )
  const productsLink = await screen.findAllByRole('link')
  await userEvent.click(productsLink[0])
  const prodLink = await screen.findByText(
    'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
  )
  await userEvent.click(prodLink)

  const addBtn = await screen.findByText('Add to cart')
  await userEvent.click(addBtn)
  const cartItem = await screen.findByTestId('cartItem')
  expect(cartItem).toBeInTheDocument()
})
test('removes from cart', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    { wrapper: BrowserRouter }
  )
  const productsLink = await screen.findAllByRole('link')
  await userEvent.click(productsLink[0])
  const prodLink = await screen.findByText(
    'Mens Casual Premium Slim Fit T-Shirts'
  )
  await userEvent.click(prodLink)

  const addBtn = await screen.findByText('Add to cart')
  await userEvent.click(addBtn)
  const deleteBtn = await screen.findAllByTestId('deleteBtn')
  await userEvent.click(deleteBtn[0])
  // expect(deleteBtn).toBeInTheDocument()
  // waitForElementToBeRemoved(screen.queryByTestId('cartItem')).then(() => {
  //   console.log('removed')
  //   expect(cartItem).not.toBeInTheDocument()
  // })

  const cartItem = await screen.findByTestId('cartItem')
  setTimeout(() => {
    expect(cartItem).not.toBeInTheDocument()
  }, 600)
})
