import React from 'react'

import { NavBar } from '../../src/index'

// import 'j/dist/index.css'
// import {Options} from ''
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
const optionsArray : Options[] = [
  {
    "id":1,
    "text":"Home",
    "children":[],
    "path": "/about"
  },
  {
    "id":2,
    "text":"Services",
    "children":[{"id":2.1,"text":"Consulting","path":"/consulting"},{"id":2.2,"text":"Projects","path":"/projects"}, {"id":2.3,"text":"Ventures","path":"/ventures"}]
  },
  {
    "id":3,
    "text":"Contact",
    "children":[{"id":3.1,"text":"Contact Info","path":"/info"},{"id":3.1,"text":"Reach us on mail","path":"/help"}]
  }
]

const App = () => {

  return <NavBar optionsArray={optionsArray}  option = "horizontal"  orientation = "ltr" theme="slategrey" search = "search"/>


}

export default App
