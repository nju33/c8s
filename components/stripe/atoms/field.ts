import styled from '../../styled';
import {theme} from '../../../helpers';

export const Field = styled.div`
  & .StripeElement {
    transition: ${theme.transition};
    box-shadow: ${theme.boxShadow};
    border: 1px solid ${theme.get('HoverItem')};
    padding: .5em;
    border-radius: ${theme.borderRadius};
  }

  & .StripeElement--focus {
    border: 1px solid ${theme.get('ActivePresence')};
  }
`;
