import styled from '../../styled';

export const Box = styled.div<{
  'data-position': 'top' | 'right' | 'bottom' | 'left';
}>`
  &[data-ref='organisms/tab'] {
    display: flex;
  }

  &[data-ref='organisms/tab'][data-position='top'],
  &[data-ref='organisms/tab'][data-position='bottom'] {
    flex-direction: column;
  }

  &[data-ref='molecules/head'] {
    display: flex;
  }

  &[data-ref='molecules/head'][data-position='left'],
  &[data-ref='molecules/head'][data-position='right'] {
    display: flex;
    flex-direction: column;
  }

  &[data-ref='organisms/tab'][data-position='top'],
  &[data-ref='organisms/tab'][data-position='left'] {
    & [data-ref='molecules/head'] {
      order: 1;
    }

    & [data-ref='organisms/panel'] {
      order: 2;
    }
  }

  &[data-ref='organisms/tab'][data-position='right'],
  &[data-ref='organisms/tab'][data-position='bottom'] {
    & [data-ref='molecules/head'] {
      order: 2;
    }

    & [data-ref='organisms/panel'] {
      order: 1;
    }
  }
`;
