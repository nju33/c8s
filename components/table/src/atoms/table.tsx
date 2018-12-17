import styled from '@c8s/theme';
// import {theme} from '../../../helpers';

export const Table = styled.table`
  padding: 0.5em 3em;
  font-size: 0.9em;

  & th {
  }

  & th,
  & td {
    padding: .5em 1em;
  }

  & th:not(:last-child),
  & td:not(:last-child) {
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
