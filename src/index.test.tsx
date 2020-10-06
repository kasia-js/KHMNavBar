import React from 'react'
import ReactDOM from 'react-dom'
import { NavBar } from '.'
import { screen, render } from '@testing-library/react'
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect'

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
      children: [],
      path: '/about'
    }
  ],
}

// Hamed 💩

describe('NavBar', () => {
  
  it("has child nodes", () => {
    render(<NavBar {...mockProps} />)
    expect(screen.getByTestId('navbar-h').hasChildNodes()).toBeTruthy()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  // it('should expect props to be passed in to component', () => {
  //   render(<NavBar {...mockProps} />);
    // const wrapper = shallow(
    // <NavBar {...mockProps} orientation="rtl" option="horizontal" />
    // );

  //   expect(wrapper.find(NavBar).prop('orientation')).toBe('rtl');
  //   expect(wrapper.find(NavBar).prop('option')).toBe('horizontal');
  // })

  it('should display the home button', () => {
    render(<NavBar {...mockProps} />)
    expect(screen.getByTestId('homeBtnId')).toBeInTheDocument()
  });

  it('Should display Home', () => {
    screen.getByText((content: string) => content.startsWith('Home'))
  })

  it('should display a vertical menu if options===vertical', () => {
    render(<NavBar {...mockProps} />);
    const vertical = getByTestId('navbarV')
    expect(vertical).toHaveStyle(`
      display: flex;
      float:left;
      flex-direction: column;
      align-items: center;
    `)
  })

  it('should show sub headers', () => {
    render(<NavBar {...mockProps} />);
    mockProps.optionsArray.map(el => {
      expect(screen.getByText(el.text)).toBeInTheDocument();
    })
  })

  it('should show submenu', () => {
    render(<NavBar {...mockProps} />);
    mockProps.optionsArray.map(el => {
      el.children.map(item => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      })
    })
  })


})

