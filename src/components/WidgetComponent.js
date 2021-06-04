import React, { useEffect, useState } from 'react';
import { Steps, Step } from 'react-step-builder';
import config from '../styles/theme.styles';
import StepComponent from './StepComponent';
import defaultWidgetProps from '../data/defaultWidgetProps';
import { DefaultStepOne, DefaultStepTwo } from './DefaultSteps';
import WidgetClass from '../classes/WidgetClass';
import '../styles/widget.scss';

// ########################## //
//                            //
//                            //
//  Widget Component
//                            //
//                            //
// ########################## //
const Widget = (widgetProps) => {
  // ===================== //
  //  State
  // ===================== //
  const [props, setProps] = useState({ ...defaultWidgetProps, ...widgetProps });
  const [ready, setReady] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [openAnimation, setOpenAnimation] = useState('entering');

  // ===================== //
  //  Vars
  // ===================== //
  const cssContainer = props.themeValues?.container;
  const cssPosition = config.themes[props.theme].position;

  // ===================== //
  //  Events
  // ===================== //
  const clickOnClose = () => {
    setOpenAnimation('exiting');
    setIsOpen(false);
  };

  // ===================== //
  //  Init
  // ===================== //
  useEffect(() => {
    // ----- Insert Theme Values ----- //
    const themeValues = config.themes[props.theme].styles;

    setProps((prevState) => {
      const newState = prevState;
      newState.themeValues = themeValues;
      return newState;
    });

    // ----- Insert Default Step ----- //
    if (!props.steps) {
      const defaultSteps = [
        { component: DefaultStepOne },
        { component: DefaultStepTwo },
      ];

      setProps((prevState) => {
        const newState = prevState;
        newState.steps = defaultSteps;
        return newState;
      });
    }

    // ----- Connect Analytics ----- //
    if (props.analyticsConfig) {
      setAnalytics(WidgetClass.connectAnalytics(props.analyticsConfig, props.analyticsName));
    }

    // ----- Set Ready State ----- //
    setReady(true);
  }, []);

  return (
    <>
      { ready ?
        <div className="cleanslate">
          <div style={cssContainer} className={`widget docked-widget widget-${openAnimation} docked-widget-${cssPosition}`}>
            <div className={`widget widget-${isOpen}`}>
              <div><button type="button" id="closeFeedback" onClick={() => clickOnClose()}>X</button></div>
              <Steps>
                {props.steps.map((step, idx) => {
                  return (
                    <Step
                      key={idx}
                      component={StepComponent}
                      stepData={step}
                      themeValues={props.themeValues}
                      onSubmit={props.onSubmit}
                      handleClose={clickOnClose}
                      currentPath={props.currentPath}
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
