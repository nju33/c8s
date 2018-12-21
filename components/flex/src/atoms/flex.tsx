import styled, {css} from '@c8s/theme';

/**
 * @alias
 */
type C = CSSStyleDeclaration;
interface FlexTagProps {
  display?: C['display'];
  flexDirection?: C['flexDirection'];
  flex?: C['flex'];
}

// tslint:disable
export const Flex = styled.div`
  ${(props: FlexTagProps) => {
    console.log(props);
    if (props.display === undefined) {
      return css``;
    }

    return css`
      display: ${() => props.display};
    `;
  }}

  ${(props: FlexTagProps) => {
    console.log(props);
    if (props.flexDirection === undefined) {
      return css``;
    }

    return css`
      flex-direction: ${() => props.flexDirection};
    `;
  }}
`;
