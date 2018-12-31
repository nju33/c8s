import styled from '@c8s/theme';
import vwxy from 'vwxy';

const activeItem = vwxy().theme.activeItem();
const columnBG = vwxy().theme.columnBG();

export const Table = styled.table`
  padding: 0.5em 3em;
  font-size: 0.9em;
  border-collapse: collapse;
  border: 1px solid ${columnBG};

  & th {
    color: ${activeItem};
    font-weight: bold;
    border-bottom: 1px solid ${activeItem};
  }

  & th,
  & td {
    padding: .5em .75em;
  }

  & tbody tr:nth-child(odd) {
    background-color: ${columnBG};
  }
`;


// export const Table = styled.table`
//   transition: ${theme.transition};
//   margin-top: ${theme.gutter};
//   padding: 0.5em 3em;
//   border: 1px solid ${theme.get('TextColor')};
//   border-top: 2px solid ${theme.get('ActivePresence')};
//   font-size: 0.9em;
//   border-radius: ${theme.borderRadius};

//   & th {
//     border-bottom: 1px solid ${theme.get('TextColor')}
//   }

//   & th,
//   & td {
//     padding: .5em 1em;
//   }

//   & th:not(:last-child),
//   & td:not(:last-child) {
//     border-right: 1px solid ${theme.get('HoverItem')};
//   }
// `;
