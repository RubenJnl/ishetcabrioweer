import styled, {css} from 'styled-components'

export const ErrorMessage = styled.div`
  color: red;
  border: 2px solid red;
`

const SunRiseSet = css`
  line-height: 2em;

  ::before {
    padding-right: 10px;
    display: inline-block;
  }
`

export const Sunrise = styled.div`
  ${SunRiseSet}

  ::before {
    content: '☀️'
  }
`

export const Sunset = styled.div`
  ${SunRiseSet}

  ::before {
    content: '🌚'
  }
`