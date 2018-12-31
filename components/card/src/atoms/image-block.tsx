import styled from '@c8s/theme';
import vwxy from 'vwxy';

const backgroundImage = vwxy()['data-image']();
const columnBG = vwxy().theme.columnBG();

export const ImageBlock = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${columnBG};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: .5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
