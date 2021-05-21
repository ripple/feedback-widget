import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './WidgetComponent.js'; 

// =============================================== //
//
//  The following is the React implementation which
//  is loaded into '/public/example-react.html'. To
//  see the vanilla javascript implementation check
//  out '/public/example-vanilla-js.html' instead.
//
// =============================================== //
const App = () => {
  return (
    <>
      <h1>Micro React App.</h1>
      <Widget />
    </>
  )
}

// ================================================ //
//
//  This class is NOT a necessary part of any other
//  React implementation and serves only as a work
//  around for this repository's webpack config. It
//  allows us to test the React implementation in 
//  real-time without having to import directly into
//  a different seperate project.
//
// ================================================ //
export default class MicroReactApp {

  constructor() {
    this.init()
  }

  init() {
    console.log('start')
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    )
  }

}

window.MicroReactApp = MicroReactApp;