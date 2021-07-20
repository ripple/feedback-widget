import React, { FC, useEffect, useState } from 'react';
import { Steps, Step } from 'react-step-builder';
import config from '../styles/theme.styles';
import StepComponent from './StepComponent';
import defaultWidgetProps from '../data/defaultWidgetProps';
import DefaultStepOne from './DefaultStep1';
import DefaultStepOneB from './DefaultStep1b';
import DefaultStepTwo from './DefaultStep2';
import WidgetClass from '../classes/WidgetClass';
import '../styles/widget.scss';

// ------------------------------ //
//  Widget Types
// ------------------------------ //
// TODO: expand on this
type WidgetProps = {
  widgetProps: any,
  theme: any,
}

// ########################## //
//                            //
//                            //
//  Widget Component
//                            //
//                            //
// ########################## //
const Widget = (widgetProps : WidgetProps) => {
  // ===================== // 
  //  State
  // ===================== //
  const [props, setProps] = useState({ ...defaultWidgetProps, ...widgetProps });
  const [ready, setReady] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [openAnimation, setOpenAnimation] = useState('entering');
  const [themeName, setThemeName] = useState(widgetProps?.theme);
  const [themeValues, setThemeValues] = useState(config.themes[themeName].styles);
  const [themeLabels, setThemeLabels] = useState(config.labels.en);


  // ===================== //
  //  Events
  // ===================== //
  const clickOnClose = () => {
    console.log('Close Feedback Widget.');
    setOpenAnimation('exiting');
    setIsOpen(false);
  };

  // - - - - - - - - - - - - - - - - //
  //  fn: Init
  // - - - - - - - - - - - - - - - - //
  const init = function init() {

    // ----- Insert Default Step ----- //
    if (!props.steps || props.steps.length <= 0) {
      const defaultSteps = [
        { component: DefaultStepOne },
        { component: DefaultStepOneB },
        { component: DefaultStepTwo },
      ];
      //TODO: this doesnt accept compoents from js. Only as React

      setProps((prevState) => {
        const newState = prevState;
        newState.steps = defaultSteps as any;
        return newState;
      });
    }

    // ----- Connect Analytics ----- //
    if (props.analyticsConfig) {
      setAnalytics(WidgetClass.connectAnalytics(props.analyticsConfig, props.analyticsName) as any);
    }

    // ----- Set Ready State ----- //
    setReady(true);
  }

  // - - - - - - - - - - - - - - - - //
  //  fn: Update Theme
  // - - - - - - - - - - - - - - - - //
  const updateTheme = function updateTheme() {
    setThemeName(widgetProps.theme);
    setThemeValues(config.themes[widgetProps.theme].styles);
    setThemeLabels(config.labels.en);
  }

  // ===================== //
  //  Hooks
  // ===================== //
  useEffect(init, []);
  useEffect(updateTheme, [widgetProps])

  // ===================== //
  //  JSX
  // ===================== //
  return (
    <>
      { ready ?
        <div className="cleanslate">
          <div style={themeValues?.container} className={`
            ${themeName}
            widget
            docked-widget
            widget-${openAnimation}
            docked-widget-${config.themes[themeName].position}
            `}>
            <div className={`widget widget-${isOpen}`}>
              <div><button type="button" id="closeFeedback" onClick={() => clickOnClose()}>X</button></div>
              <Steps>
                {props.steps.map((step, idx) => {
                  return (
                    <Step
                      key={idx}
                      component={StepComponent as FC}
                      stepData={step}
                      themeValues={themeValues}
                      themeLabels={themeLabels}
                      onSubmit={props.onSubmit}
                      handleClose={clickOnClose}
                      currentPath={props.currentPath} //TODO: this is not being passed to the final track
                      analytics={(analytics) ? analytics : null}
                    />
                  );
                })}
              </Steps>
            </div>
          </div>
        </div>
        : null}
    </>
  );
};

export {
  Widget,
};
