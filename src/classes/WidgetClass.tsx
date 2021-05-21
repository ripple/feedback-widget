import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/WidgetComponent';
import { Analytics } from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import googleAnalytics from '@analytics/google-analytics';
import defaultWidgetProps from '../data/defaultWidgetProps'

// const defaultConfig = {
//   style: {
//     primaryColor: 'red',
//     secondaryColor: 'green'
//   }
// }

// let defaultWidgetProps = {
//   theme: 'ripplex',
//   opened: true,
//   parentElement: '#root',
//   currentPath: window.location.pathname,
//   mounted: false,
//   analytics: null,
//   analyticsConfig: null,
//   analyticsAppName: 'ripple-widget'
// }

// ======================== //
//                          //
//  RippleWidget: Class
//                          //
// ======================== //
export default class RippleWidget {

  // ------------------------------ //
  //  Class Types
  // ------------------------------ //
  props: {
    analytics: any
    analyticsAppName: string
    analyticsConfig: Array<{
      name: string
      id: string
    }>
    currentPath: string
    opened: boolean
    parentElement: string
    steps: Array<any>  // TODO: Specify array content
    theme: string
  }
  component: any // TODO: Lookup React Component syntax
  el?: HTMLElement

  // ------------------------------ //
  //  Constructor
  // ------------------------------ //
  constructor(options, steps) {
    this.props = {...defaultWidgetProps, ...options, steps}
    this.el
    this.component

    // ----- Init ----- //
    this.init()
  }

  // TODO: handle widget submit. Acommodate custom submit functions being passed in props
  handleWidgetSubmit(abc) {
    console.log('handleWidgetSubmit abc: ', abc)
  }

  // ------------------------------ //
  //  Init
  // ------------------------------ //
  init() {

    // Setup Analytics Config (Google Analytics, Tag Manager, etc...)
    if (this.props.analyticsConfig) {
      this.connectAnalytics()
    }

    // Create React <Widget />
    this.component = <Widget {...this.props} onSubmit={this.handleWidgetSubmit} />;

    // Call render when ready
    if (document.readyState === 'complete') {
      this.render();
    } else {
      window.addEventListener('load', () => this.render());
    }

  }

  // ------------------------------ //
  //  Render
  // ------------------------------ //
  render() {
    if (this.el) throw new Error('Widget is already rendered.');

    // Create HTML <element>
    const el = document.createElement('div');
    el.setAttribute('class', 'cleanslate');

    // Insert the widget inside the parent element if it was defined,
    // otherwise default to <body>
    if (this.props.parentElement) {
      const selector = document.querySelector(this.props.parentElement)
      if (selector) selector.appendChild(el)
      else throw new Error(`${this.props.parentElement} is undefined.`)
    }
    else {
      document.body.appendChild(el);
    }

    // Render React <Widget />
    ReactDOM.render(this.component, el);

    // Store element in class instance
    this.el = el;
  }

  // ------------------------------ //
  //  Connect Analytics
  // ------------------------------ //
  connectAnalytics() {

    // Format analytics config to work with 'analytics' node package. 
    const plugins: any[] = [];
    this.props.analyticsConfig.forEach(source => {
      switch (source.name) {
        case 'ga':
          plugins.push(googleAnalytics({ trackingId: source.id }))
          break;
        case 'gtm':
          plugins.push(googleTagManager({ containerId: source.id }))
          break;
      }
    })

    // Init 'analytics' node package
    this.props.analytics = Analytics({
      debug: true,
      app: this.props.analyticsAppName,
      plugins,
    });

  }

  // ------------------------------ //
  //  Track
  // ------------------------------ //
  track(eventName, eventLabel) {
    console.log('| TRACK EVENT |')
    const path = window.location.pathname
    this.props.analytics.track(eventName, {
      category: path,
      label: eventLabel
    })
  }

}


// ------------------------------ //
//  window.RippleWidget
// ------------------------------ //
declare global {
  interface Window {
    RippleWidget: any
  }
}
window.RippleWidget = RippleWidget


// ------------------------------ //
//  EmbeddableWidgetMountProps
// ------------------------------ //
// interface EmbeddableWidgetMountProps {
//   parentElement : string
//   [key:string] : any
// }










// class Greeter {
//   greeting: string;

//   constructor(message: string) {
//     this.greeting = message;
//   }

//   greet() {
//     return "Hello, " + this.greeting;
//   }
// }

// declare global {
//   interface Window {
//       Greeter: any
//   }
// }

// window.Greeter = Greeter

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

//window.greeter = new Greeter("world");


// class App extends React.Component<{}, {}> {
//   render() {
//     return (
//       <div className="app cleanslate">
//         Hi
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById('root'));






// function App() {
//   console.log('Inside <App />')
//   return (
//     <>
//       Hi
//     </>
//   )
// }

// const dom = document.getElementById('root')
// console.log('dom: ', dom)

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )








// import * as React from 'react';
// import { render } from 'react-dom';
// import FeedbackWidget from './feedbackWidget';


// // This is not used or only used for the widget.js file?  But nothing uses that.
// // eslint-disable-next-line react/prefer-stateless-function
// class App extends React.Component<{}, {}> {
//   render() {
//     return (
//       <div className="app cleanslate">
//         <FeedbackWidget theme="paystring" />
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById('content'));
