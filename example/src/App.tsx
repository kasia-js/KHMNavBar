import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {NavBar} from './dist/index' //import from package when we publish
// import NavBar from 'j'
import About from './About'
import Consulting from './Consulting.js'
import Projects from './Projects.js'
import Ventures from './Ventures.js'
import Info from './Info.js'
import Help from './Help.js'


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

const searchFunction = (input: string) => {
  return input
}

const App = () => {

  return (
    <div>
      <BrowserRouter>

      <NavBar optionsArray={optionsArray}  option = "horizontal"  orientation = "ltr" theme="slategrey" search = "search" searchFunction={searchFunction}/>

      <Switch>
          <Route exact path="/about" component={About} />
          <Route path="/consulting" component={Consulting}/>
          <Route path="/projects" component = {Projects} />
          <Route path="/ventures" component = {Ventures} />
          <Route path="/info" component = {Info} />
          <Route path="/help" component = {Help} />
      </Switch>

      </BrowserRouter>
    </div>

  )

}

export default App
