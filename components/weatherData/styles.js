import styled from 'styled-components'
// import styled, { css } from 'styled-components'


export const ErrorMessage = styled.div`
  color: red;
  border: 2px solid red;
`

// export const ErrorMessage = `
//   ${({ theme }) => css`
//       position: relative;
//       margin-top: 15px;
//       color: ${theme.colors.secondary.error};
//       font-size: 14px;
//       padding-left: 44px;
//       font-family: ${({ theme }) => theme.fonts.body};

//       svg {
//           position: absolute;
//           top: 50%;
//           left: 0;
//           font-size: 21px;
//           transform: translateY(-50%);
//       }
//   `}
// `