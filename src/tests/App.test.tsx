import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from '../App'
import store from '../store/Store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

test('renders nav', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )

  const nav = screen.getByRole('navigation')
  const productsLink = screen.getByText('Products')
  expect(nav).toBeInTheDocument()
  expect(productsLink).toBeInTheDocument()
})

test('navigates to products', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )

  const productsLink = screen.getByRole('link', { name: 'Products' })
  await userEvent.click(productsLink)
  const productsh1 = await screen.findByRole('heading', { name: 'Products' })
  expect(productsh1).toBeInTheDocument()
})
