import styled from '@c8s/theme';

export const Cover = styled.div`
  /* ボタンを押した後なので、同じように見せるため */
  cursor: pointer;

  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &[aria-hidden='true'] {
    display: none;
  }
`;