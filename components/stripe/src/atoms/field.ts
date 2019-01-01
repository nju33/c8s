import styled from '@c8s/theme';
import vwxy from 'vwxy';

const transitionDuration = vwxy().theme.transitionDuration();
const columnBG = vwxy().theme.columnBG();
const borderRadius = vwxy().theme.borderRadius();
const activeItem = vwxy().theme.activeItem();

export const Field = styled.form`
  transition: ${transitionDuration};
  border: 1px solid ${columnBG};

  & .StripeElement {
    padding: .5em;
    border-radius: ${borderRadius};
  }

  & .StripeElement--focus {
    border: 1px solid ${activeItem};
  }
`;
