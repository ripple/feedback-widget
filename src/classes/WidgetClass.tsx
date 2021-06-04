import React from 'react';
import ReactDOM from 'react-dom';
import { Widget } from '../components/WidgetComponent';
import { Analytics } from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import googleAnalytics from '@analytics/google-analytics';
import defaultWidgetProps from '../data/defaultWidgetProps';

// ======================== //
//                          //
//  WidgetClass
//                          //
// ======================== //
 export default class WidgetClass {

  // ------------------------------ //
  //  Class Types
  // ------------------------------ //
  props: {
    analyticsName: string
    analyticsConfig: Array<{
      name: string
      id: string
    }>
    currentPath: string
    opened: boolean
    parentElement?: string
    steps: Array<any>  // TODO: Specify array content
    theme: string
  }
  component: any // TODO: Lookup React Component syntax instead of 'any'
  el?: HTMLElement

  // ------------------------------ //
  //  Constructor
  // ------------------------------ //
  constructor(options, steps) {
    this.props = { ...defaultWidgetProps, ...options, steps };
    this.el;
    this.component;

    // ----- Start Init() ----- //
    this.init()
  }

  // ------------------------------ //
  //  Init
  // ------------------------------ //
  init() {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // The React implementation (aka NOT vanilla JS) will pass itself as the
    // component and therefor not need to be reinstantiated or rendered.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (!this.component) {

      // Create React <Widget />
      this.component = <Widget {...this.props} />

      // Call render when ready
      if (document.readyState === 'complete') {
        this.render();
      } else {
        window.addEventListener('load', () => this.render());
      }
    }
  }

  // ------------------------------ //
  //  Render
  // ------------------------------ //
  render() {
    if (this.el) throw new Error('Widget is already rendered.');

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Determine target element for rendering the <Widget> component.
    // Default to '#root' but can be overwritten by 'parentElement' prop.
    // TODO: Test the parentElement implementation on a page with lots of HTML.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    let el = (document.getElementById('root') as HTMLElement)
    const parentElement = this.props.parentElement

    if (parentElement) {
      const selector = (document.querySelector(parentElement) as HTMLElement)
      if (!selector) {
        throw new Error(`${parentElement} is undefined.`)
      }
      else if (selector && el) {
        el = selector
      }
    }

    // Render React <Widget />
    ReactDOM.render(this.component, el);

    // Store element in class instance
    this.el = el;
  }

  // ------------------------------ //
  //  Connect Analytics
  // ------------------------------ //
  static connectAnalytics(analyticsConfig, analyticsName) {

    // Format analytics config to work with 'analytics' node package. 
    const plugins: any[] = [];
    analyticsConfig.forEach(source => {
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
    return Analytics({
      debug: true,
      app: analyticsName,
      plugins,
    });

  }

  // ------------------------------ //
  //  Track
  // ------------------------------ //
  static track(analytics, eventName, eventValue) {
    const path = window.location.pathname
    analytics.track(eventName, {
      category: path,
      label: eventValue
    })
  }

}

// ------------------------------ //
//  window.WidgetClass
// ------------------------------ //
declare global {
  interface Window {
    WidgetClass: any
  }
}
window.WidgetClass = WidgetClass
