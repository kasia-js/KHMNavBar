# NavBar Generator

`navigation-bar-component-for-react` is a simple and customizable component to quickly create a navigation bar for your React UI.

## Getting started
1. Install the component
```bash
npm install navigation-bar-component-for-react
```
2. Import the component
```js
import NavBar from 'navigation-bar-component-for-react';
import 'navigation-bar-component-for-react/dist/index.css';
```

## How to configure

### Configuring your menu and routes

** optionsArray is an array of objects to help you set up the parent menu, submenus, and their paths. 

Here is an example:
```typescript jsx
const optionsArray = [
  {
    "id": 1,
    "text": "Home",
    "children": [
      { "id": 1.1,
        "text": "About",
        "path":"/about"
      }, 
      { "id": 1.2,
        "text": "Mission",
        "path":"/mission"
      }
    ],
    "path": "/home"
  }
```

** You will need to pass in the optionsArray and optional settings to NavBar in your main App component:
```typescript jsx
return (
    <div>
        <BrowserRouter>
          <NavBar optionsArray={optionsArray}  option = "horizontal"  orientation = "ltr" theme="blue" />
        </BrowserRouter>
    </div>

  )
```

** Please make sure to pass in the relevant paths and components for each parent menu and submenus:
```typescript jsx
return (
    <div>
        <BrowserRouter>
          <NavBar optionsArray={optionsArray}  option = "horizontal"  orientation = "ltr" theme="blue" />
          <Switch>
            <Route exact path="/home" component={ Home } />
            <Route exact path="/about" component={ About } />
            <Route exact path="/mission" component={ Mission } />
          </Switch>
        </BrowserRouter>
    </div>
  )
```

### Style configuration


|     **Value**         | **Type** | **Required** |     **Default**     |                **Options**                |
| :-------------------: | :------: | :----------: | :-----------------: | :---------------------------------------: |
|     **option**        |  String  |   Optional   |      horizontal     |                 `vertical`                |
|     **orientation**   |  String  |   Optional   |        ltr          |                   `rtl`                   |
|     **theme**         |  String  |   Optional   |        none         |      any HTML color code                  |


** `ltr` orientation is left-to-right; `rtl` orientation is right-to-left

## Authors
- Rashmi Menon Vellekkat - [GitHub](https://github.com/RashmiBalaji) - [LinkedIn](https://www.linkedin.com/in/rashmi-menon-vellekkat-96bb88118/)
- Katarzyna Kolny - [GitHub](https://github.com/kasia-js) - [LinkedIn](https://www.linkedin.com/in/katarzyna-kolny-8b3384b9/)
- Mo Wong - [GitHub](https://github.com/ommwong) - [LinkedIn](https://www.linkedin.com/in/mowong1/)
- Hamed Sedighi - [GitHub](https://github.com/herol3oy) - [LinkedIn](https://www.linkedin.com/in/hamed-sedighi/)

