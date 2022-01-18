import styled, { css } from 'styled-components'


export const ErrorMessage = styled.div`
  color: red;
  border: 2px solid red;
`


const tempSettings = ({ temperature }) => css`
    
    ${temperature <= 3 && css`
      color: #4aaaff;

      ::before {
        content: ' 🥶';
      }
    `}

    ${temperature > 3 && temperature <= 8 && css`
      color: #345f85;

      ::before {
        content: '😬';
      }
    `}

    ${temperature > 8 && temperature <= 15 && css`
      color: #7ead36;

      ::before {
        content: '🙂';
      }
    `}

    ${temperature > 15 && temperature <= 21 && css`
      color: #ccc704;
      
      ::before {
        content: '😎';
      }
    `}
    
    ${temperature > 21 && temperature <= 29 && css`
      color: #cc7d04;

      ::before {
        content: '😎';
      }
    `}
    
    ${temperature > 29 && css`
      color: #cc0504;

      ::before {
        content: '🥵';
      }
    `}


  ::before {
    margin: 0 3px;
    display: inline-block;
  }
`

export const Temperature = styled.span`
  ${tempSettings}
  font-size: 1.2em;
`

export const TemperatureWrapper = styled.p`
  line-height: 2em;
  text-align: bottom;
`