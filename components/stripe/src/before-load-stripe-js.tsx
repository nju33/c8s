import React from 'react';
import {StripeOrganismDefaultProps} from './organisms';

const ID = '@c8s/stripe';

export type BeforeLoadStripeJs<C> = (Component: C) => C;

export const beforeLoadStripeJs: BeforeLoadStripeJs<
  React.ComponentClass<StripeOrganismDefaultProps>
> = Component => {
  return class extends React.PureComponent<
    StripeOrganismDefaultProps,
    {loaded: boolean}
  > {
    static displayName = `beforeLoadStripeJS(${Component.displayName})`;

    constructor(props: StripeOrganismDefaultProps) {
      super(props);

      this.state = {
        loaded: false,
      };
    }

    private createScript() {
      return new Promise(r => {
        if (document.getElementById(ID) !== null) {
          return r();
        }

        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.id = ID;
        script.addEventListener('load', r);
        document.body.appendChild(script);
      });
    }

    async componentDidMount() {
      await this.createScript();
      this.setState({
        loaded: true,
      });
    }

    render() {
      if (this.state.loaded) {
        return <Component apiKey={this.props.apiKey} />;
      }

      return null;
    }
  };
};
