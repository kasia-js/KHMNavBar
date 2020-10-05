import React from 'react'
import ReactDOM from 'react-dom'
import { NavBar } from './NavBar'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

 interface Options {
  id: number
  text: string
  children: Suboptions[]
  path?: string
}

interface Props {
  orientation: string
  lang?: string
  searchFunction?: Function
  option: string
  theme: string
  search: string
  optionsArray: Options[]
}

const mockProps:Props = {
  orientation: 'horizontal',
  searchFunction: jest.fn(),
  option: 'string',
  theme: 'string',
  search: 'string',
  optionsArray: ['str'],
}

describe('navbar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar {...mockProps}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('component found', () => {
    render(<NavBar {...mockProps} />)
    expect(screen.getByTestId('navbar99')).toBeInTheDocument()
  })
})


