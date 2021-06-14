import React from 'react';
import ReactDOM from 'react-dom';
import { Widget } from './WidgetComponent';
import defaultReactExampleSteps from '../data/defaultReactExampleSteps';
import Playground from './Playground';

// =============================================== //
//
//  The following is the React implementation which
//  is loaded into '/public/example-react.html'. To
//  see the vanilla javascript implementation check
//  out '/public/example-vanilla-js.html' instead.
//
//
//
//  This class is NOT a necessary part of any other
//  React implementation and serves only as a work
//  around for this repository's webpack config. It
//  allows us to test the React implementation in
//  real-time without having to import directly into
//  a seperate project.
//
// ================================================ //
export default class MicroReactApp {

  // ------------------------------ //
  //  Class Types
  // ------------------------------ //
  props: any

  // ------------------------------ //
  //  Constructor
  // ------------------------------ //
  constructor(props) {
    props.steps = props.steps || defaultReactExampleSteps;
    this.props = props;

    if (props.isPlayground) {
      this.initPlayground();
    } else {
      this.initReactApp();
    }
  }

  // ------------------------------ //
  //  Init React App
  // ------------------------------ //
  initReactApp() {
    ReactDOM.render(
      <Widget {...this.props} />,
      document.getElementById('root'),
    );
  }

  // ------------------------------ //
  //  Init Playground
  // ------------------------------ //
  //
  //  The Playground is an environment specifically for a developer to
  //  expirement with building Uniforms JSON schema and watching it update
  //  the Feedback Widget in real time. A theme can also be previewed.
  //
  initPlayground() {
    ReactDOM.render(
      <Playground {...this.props} />,
      document.getElementById('root'),
    );
  }
}

// ------------------------------ //
//  window.MicroReactApp
// ------------------------------ //
declare global {
  interface Window {
    MicroReactApp: any
  }
}
window.MicroReactApp = MicroReactApp;
