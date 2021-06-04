import React from 'react';
import ReactDOM from 'react-dom';
import { Widget } from './WidgetComponent';

// ---------------------------- //
//  Example Component for the
//  React implementation.
// ---------------------------- //
const ExampleComponent = () => <h1>Example Component</h1>;

// ----- Example Steps ----- //
const defaultReactExampleSteps = [
  { component: ExampleComponent },
  {
    form: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        workExperience: {
          description: 'Work experience in years',
          type: 'integer',
          minimum: 0,
          maximum: 100,
        },
      },
      required: ['firstName'],
    },
  },
  {
    form: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
];

// =============================================== //
//
//  The following is the React implementation which
//  is loaded into '/public/example-react.html'. To
//  see the vanilla javascript implementation check
//  out '/public/example-vanilla-js.html' instead.
//
// =============================================== //
const App = (props) => (
  <>
    <h1>Micro React App.</h1>
    <Widget {...props} />
  </>
);

// ================================================ //
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
  constructor(props) {
    props.steps = props.steps || defaultReactExampleSteps;
    this.props = props;
    this.init();
  }

  init() {
    ReactDOM.render(
      <App {...this.props} />,
      document.getElementById('root'),
    );
  }
}

window.MicroReactApp = MicroReactApp;
