import {Default, StripeOrganismDefaultProps} from './organisms';
import {beforeLoadStripeJs, BeforeLoadStripeJs} from './before-load-stripe-js';

const Stripe = (beforeLoadStripeJs as BeforeLoadStripeJs<
  React.ComponentClass<StripeOrganismDefaultProps>
>)(Default);

export {Stripe};
