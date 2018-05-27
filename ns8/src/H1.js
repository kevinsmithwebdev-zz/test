import React from 'react'

import styled from 'styled-components'

const Heading1 = styled.h1`
  font-size: ${props => props.fontSize || '1.5em'};
  color: ${props => props.fontColor || 'white'};
  &:hover {
    color: pink
  }
`

const H1 = ({fontSize, fontColor, children}) => {
  return (
    <Heading1 fontSize={fontSize} color={fontColor}>{children}</Heading1>
  )
}
export default H1
