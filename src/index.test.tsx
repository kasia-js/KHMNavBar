import React from 'react'
import ReactDOM from 'react-dom'
import { NavBar } from '.'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {
  renderIntoDocument,
  Simulate,
  // ReactTestUtils
} from 'react-dom/test-utils'

interface Options {
  id: number
  text: string
  children: Suboptions[]
  path?: string
}

interface Suboptions {
  id: number
  text: string
  path: string
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

const mockProps: Props = {
  orientation: 'rtl',
  searchFunction: jest.fn(),
  option: 'horizontal',
  theme: 'slategray',
  search: 'search',
  optionsArray: [
    {
      id: 1,
      text: 'Home',
      children: [{ id: 1, text: 'Contact Info', path: '/info' }],
      path: '/about'
    }
  ]
}

describe('NavBar', () => {
  it('has child nodes', () => {
    render(<NavBar {...mockProps} />)
    expect(screen.getByTestId('navbar-h').hasChildNodes()).toBeTruthy()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<NavBar {...mockProps} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  // it('should expect props to be passed in to component', () => {
  //   render(<NavBar {...mockProps} />);
  // const wrapper = shallow(
  // <NavBar {...mockProps} orientation="rtl" option="horizontal" />
  // );
  //   expect(wrapper.find(NavBar).prop('orientation')).toBe('rtl');
  //   expect(wrapper.find(NavBar).prop('option')).toBe('horizontal');
  // })

  // it('should be the same as snapshot', () => {
  //   const component = render(<NavBar {...mockProps} />)
  //   expect(component).toMatchSnapshot()
  // })

  it('Should display Home', () => {
    screen.getByText((content: string) => content.startsWith('Home'))
  })
  

  it('should display a vertical menu if options===vertical', () => {
    render(<NavBar {...mockProps} />)
    const vertical = screen.getByTestId('navbar-vertical')
    expect(vertical).toHaveStyle(`
      display: flex;
      float:left;
      flex-direction: column;
      align-items: center;
    `)
  })

  it('should show sub headers', () => {
    render(<NavBar {...mockProps} />)
    mockProps.optionsArray.map((el) => {
      expect(screen.getByText(el.text)).toBeInTheDocument()
    })
  })

  it('should show submenu', () => {
    render(<NavBar {...mockProps} />)
    mockProps.optionsArray.map((el) => {
      el.children.map((item) => {
        expect(screen.getByText(item.text)).toBeInTheDocument()
      })
    })
  })

  test('snapshot', () => {
    const { container } = render(<NavBar {...mockProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should show home header', () => {
    const { getByText } = render(<NavBar {...mockProps} />)
    const home = getByText(mockProps.optionsArray[0].text)
    // const home = getByText('home', { exact: false })
    expect(home).toBeTruthy()
  })

  it('should have a type attribute equals to submit', () => {
    const button = screen.getByTestId('go-btn')
    expect(button.hasAttribute('submit'))
  })

  test('search bar should display the right search value', () => {
    render(<input value='hello world'> </input>)
    expect(screen.getByDisplayValue('hello world')).toBeInTheDocument()
  })

  test('calls handleSubmit onClick', () => {
    const handleSubmit = jest.fn()
    const { container, getByText } = renderIntoDocument(
      <button onClick={handleSubmit} />
    )
    const formNode = container.querySelector('formsubmit')
    const submitButtonNode = getByText('submit')
    Simulate.submit(formNode)
    expect(submitButtonNode.type).toBe('submit')

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('submenu appears', () => {
    const menueTitle = screen.getByTestId('childrenHeadersId')
    // const mockFn = jest.fn()
    // ReactTestUtils.Simulate.click(menueTitle)
  })
})
