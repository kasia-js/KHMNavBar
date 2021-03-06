import React, { useState, useRef } from 'react'
import styles from './styles.module.css';
import { Link } from 'react-router-dom'
// import useClickOutside from './customHook.js'
// const icon = require('./assets/menuIcon.jpeg')
 //loader for jpeg files
// const searchIcon = require('../../assets/searchIcon.png')
// import './styles.scss'

interface Props {
  orientation?: string
  lang?: string
  searchFunction: Function
  option: string
  theme: string
  search: string
  optionsArray: Options[],
}
export interface Options {
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
export const NavBar = (props: Props) => {

  let orientation:string;
  if (props.orientation === 'rtl') orientation = 'RTL'
  else orientation = 'LTR'


  let langjson = props.optionsArray

  let inputMenu : Options[] = langjson
  // let inputMenu : Options[] = langjson.menu;
  interface Result {
    [key: string]: boolean,
  }
// setInitialSubMenuState
  const setInitialSubMenuState = (navigationOptions: Options[]) => {
    const result: Result = {}
    navigationOptions.forEach((option: Options) => result[option.text] = false);
    console.log('setInitialSubMenuState',result)
    return result;
  }
  const [menuHeader] = useState<Result>(setInitialSubMenuState(props.optionsArray));

  const dropDown = useRef([React.createRef<HTMLDivElement>(),React.createRef<HTMLDivElement>()])
  // useClickOutside(menuHeader, dropDown.current[0], hideSubMenu, 'Services')
  // useClickOutside(menuHeader, dropDown.current[1], hideSubMenu, 'Contact')

  const [input, setInput] = useState<string>('')

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value)
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('heyyyyyyyy')
    e.preventDefault()
    props.searchFunction(input)
    setInput('')
  }


  const inputList = inputMenu.map(function (ele: Options, index: number) {
    if (ele.children?.length === 0 && ele.path) { //if children defined & length=0
      return (
        <li key={ele.id} data-testid='homeBtnId'>
          <Link to={ele.path}
            style={ props.option=== 'vertical'
            ? {textDecoration:'none', color:'yellow'}
            : {textDecoration:'none', color:'white'}}
            >
              {ele.text}
            </Link>
        </li>
      )
    } else //if children is not an empty array, parents will be displayed in li
      return (
        <React.Fragment>
          <li

            data-testid='childrenHeadersId'
            className={styles.nav_title}
            // className='nav_title'
            key={ele.id}
            // onClick={() => changeInitialSubMenuState(ele.text)}
            style={
              props.option === 'vertical'
                    ? {
                        position: 'relative',
                        float: 'right',
                        color:'red'
                      }
                    : {
                      position: 'relative',
                      float: 'right',
                      color:'purple'
                  }
              }
          >
        {/*renders parent text */}
            {ele.text}

            {/*checks horizontal or vertical option prop */}
            {props.option === 'horizontal' && (
              <div ref={dropDown.current[index - 1]}>
          {/*children rendered in ul// checks isShown state*/}
          {/*if isShown === 'services' or 'contact'*/}
              <ul
                className={styles.ul_child}
                // {
                //   orientation === 'RTL'
                //     ? styles.menuitemNestedVRTL
                //     : styles.menuitemNestedV
                // }
                style={
                  menuHeader[ele.text]
                    ? {
                        position: 'absolute',
                        display: 'block',
                        float: 'right',
                        backgroundColor: 'blue'
                      }
                    : { display: 'none' }
                }
              >
                {ele?.children.map((subEl: Suboptions) => {
                  return (
                    <li data-testid='subMenu'>
                      <Link to={subEl.path as string} style={{textDecoration:'none', color:'yellow'}}>
                        {subEl.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              </div>
            )}
            {props.option === 'vertical' && (
              <div ref={dropDown.current[index - 1]}>
              <ul
                className={
                  orientation === 'RTL'
                    ? styles.menuitemNestedHRTL
                    : styles.menuitemNestedH
                }
                style={
                  menuHeader[ele.text]
                    ? {
                        position: 'absolute',
                        display: 'block',
                        float: 'right',
                        backgroundColor: "gainsboro"
                      }
                    : { display: 'none' }
                }
              >
                {ele?.children.map((subEl: Suboptions) => (
                  // eslint-disable-next-line react/jsx-key
                  <li><Link to={subEl.path} style={{textDecoration:'none',color:'black'}}>{subEl.text}</Link></li>
                ))}
              </ul>
              </div>
            )}
          </li>
        </ React.Fragment>
      )
  })

  return (
      <div >
        {props.option === 'horizontal' && props.orientation === 'ltr' && (
          <div className={styles.navbarH} data-testid='navbar-horizontal-ltr'>
            <nav>
              <ul
                className={styles.menuitemH}
                style={props.theme ? { backgroundColor: props.theme } : {}}
              >
                {/* <img src={icon} alt='menu icon' width='100' height='100' /> */}
                {inputList}
                <div
                  style={
                    props.search
                      ? { display: 'inline - block' }
                      : { display: 'none' }
                  }
                  className={styles.searchBarH}
                >
                  <input
                    className={styles.searchBarHInput}
                    type='text'
                    placeholder='HELLO FROM SEARCH'
                    value={input}
                    onChange={() => handleChange}
                  />
                  <button
                    data-testid='go-btn'
                    type='submit'
                    className={styles.formsubmit}
                    onClick={handleSubmit}
                  >
                    Go
                  </button>
                </div>
              </ul>
            </nav>
          </div>
        )}
        {/* no search input in horizontal in rtl */}

         {props.option === 'horizontal' && props.orientation === 'rtl' && (
          <div data-testid='navbar-horizontal-rtl' className={styles.navbar}>
            <ul
              className={styles.menuitemHRTL}
              style={props.theme ? { backgroundColor: props.theme } : {}}
            >
              {/* <img src={icon} alt='menu icon' width='50px' height='40px' /> */}
              {inputList}
            </ul>
          </div>
        )}


        {props.option === 'vertical' && (
          <div style={{display: 'flex'}} className={styles.navbarV} data-testid='navbar-vertical'>
            <nav>
              <ul
                className={styles.menuitemV}
                style={props.theme ? { backgroundColor: props.theme } : {}}
              >
                {/* <img src={icon} alt='menu icon' width='50px' height='40px' /> */}
                <br />
                <div
                  style={
                    props.search
                      ? { display: 'inline - block' }
                      : { display: 'none' }
                  }
                  className={styles.searchBarV}
                >
                  <input
                    className={styles.searchBarVInput}
                    type='text'
                    placeholder='Enter to Search'
                    value={input}
                    onChange={handleChange}
                  />
                  <br />
                  <button
                  onClick={handleSubmit}
                  data-testid='go-btn'>
                    Go
                  </button>
                </div>
                {inputList}
              </ul>
            </nav>
          </div>
        )}
      </div>
  )
}
