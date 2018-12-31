import React from 'react';
import {
  injectStripe,
  CardElement,
  ReactStripeElements,
} from 'react-stripe-elements';
import Button from '@c8s/button';
import {ThemeContext, ThemeValues} from '@c8s/theme';
import {Form, Field} from '../atoms';

export const Default = injectStripe(
  class extends React.PureComponent<ReactStripeElements.InjectedStripeProps> {
    static displayName = 'Default';

    handleSubmit = async (ev: React.SyntheticEvent<unknown>) => {
      ev.preventDefault();

      if (this.props.stripe === undefined) {
        return;
      }

      // const token = await this.props.stripe.createToken();
    };

    render() {
      return (
        <ThemeContext.Consumer>
          {(theme: ThemeValues) => {
            return (
              <Form onSubmit={this.handleSubmit}>
                <Field>
                  <CardElement
                    style={{
                      base: {
                        color: theme.textColor,
                        lineHeight: '2.1',
                        fontFamily: 'inherit',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                          color: theme.hoverItem,
                        },
                      },
                      invalid: {
                        color: theme.mentionBadge,
                        iconColor: theme.mentionBadge,
                      },
                    }}
                    hidePostalCode
                  />
                </Field>
                <Button type="submit">購入</Button>
              </Form>
            );
          }}
        </ThemeContext.Consumer>
      );
    }
  },
);
