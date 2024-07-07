// importing ReactDOM , this will be responsible for rendering app component on screen, its a special ReactDOM library that belongs to overall React Library
import ReactDOM from "react-dom/client";


// importing App component from "./App.jsx
// ./ represents App.jsx file present from the same directory where index.jsx file present "
// ../ represents the importing file present one directory up from the current file present "
// ../../ represents the importing file present two directory up from the current file present "
import App from "./App.jsx";

// importing index.css file (this css file contains all the styles for our tic-tac-toe project)
// styles present in index.css will be a global scope, any component function cause this styling , we can restrict this type of global scoping concept for index.css ,will cover later in this course..
// Due to underlying build process , import statements for this css code will be included in loaded webpage.
import "./index.css";


// getting the DOM representation value of id root element present in index.html file and storing in a const variable.
const entryPoint = document.getElementById("root");

// Here the breakdown of the below line does 
// render(<App/>), In React mentioning the Custom Component(component created by ourself) like this <App/> or <App></App> will call the App component function and return the jsx code that component return. Note : Here react find App component function because we imported the App component above. 
// so, render(<App/>) method will render the app component by calling and getting jsx code from App component and this render method is being called on object(that's created with another method createRoot(entryPoint), here this entry point refer DOM reprentation value of element with id root present in index.html, not element created by react.)

// In depth explanation, actually we are importing react-dom ,all the dependencies of the project like "react-dom"","react" will be in package.json (used for build process,react uses build process to get transformed our react code before handed off to browser),these gives a bunch of tools to transform our jsx code before its injected in to html.

// so, remember as simple. ReactDOM helps to render our App component and nested components of our App component and place them under our specified entry point and injects in to html for redering UI

ReactDOM.createRoot(entryPoint).render(<App />);
