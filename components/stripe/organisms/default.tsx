import React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import {Default as DefaultMolecule} from '../molecules';

export interface StripeOrganismDefaultProps {
  apiKey: string;
}

export class Default extends React.Component<StripeOrganismDefaultProps> {
  render() {
    return (
      <StripeProvider apiKey={this.props.apiKey}>
        <Elements locale="ja">
          <DefaultMolecule />
        </Elements>
      </StripeProvider>
    );
  }
}
