import React from 'react';
import {
  injectStripe,
  CardElement,
  ReactStripeElements,
} from 'react-stripe-elements';
import {Button} from '../../button';
import {ThemeContext} from 'styled-components';
import {ThemeContextProps} from '../../theme-context';
import {Form, Field} from '../atoms';

export const Default = injectStripe(
  class extends React.PureComponent<ReactStripeElements.InjectedStripeProps> {
    static displayName = 'Default';

    handleSubmit = async (ev: React.SyntheticEvent<unknown>) => {
      ev.preventDefault();

      if (this.props.stripe === undefined) {
        return;
      }

      const token = await this.props.stripe.createToken();
      console.log(token);
    };

    render() {
      return (
        <ThemeContext.Consumer>
          {(theme: ThemeContextProps) => {
            return (
              <Form onSubmit={this.handleSubmit}>
                <Field>
                  <CardElement
                    style={{
                      base: {
                        color: theme.TextColor,
                        lineHeight: '2.1',
                        fontFamily: 'inherit',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                          color: theme.HoverItem,
                        },
                      },
                      invalid: {
                        color: theme.MentionBadge,
                        iconColor: theme.MentionBadge,
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
