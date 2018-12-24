import styled from '@c8s/theme';
import vwxy from 'vwxy';

const transitionDuration = vwxy().theme.transitionDuration;

interface Data {
  'data-state-current': number;
  'data-state-left': number;
  'data-length': number;
}

const push = (props: Data) => {
  return `calc(-100% / ${props['data-length']})`;
};

export const Row = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: ${transitionDuration};

  &:before,
  &:after {
    content: '';
    display: block;
    flex: 0;
    transition: ${transitionDuration};
  }

  &:before {
    margin-left: 0;
  }

  &[data-current-step-is='prepare'] {
    user-select: none;

    &:before {
      transition: none;
    }

    &[data-dir-is='left']:before {
      margin-left: ${push as any};
    }
  }

  &[data-current-step-is='process'] {
    user-select: none;

    &[data-dir-is='right']:before {
      margin-right: ${push as any};
    }
  }

  &[data-current-step-is='still'] {
    &[data-dir-is='right']:before {
      transition: none;
    }
  }
`;
