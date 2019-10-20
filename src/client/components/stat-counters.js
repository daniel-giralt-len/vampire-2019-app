import React from 'react'
import styled from 'styled-components'

const SquareCounter = styled.div`
    display: inline-block;
    margin-right: 5px;
    ${({ full, half, theme }) => {
        if (full) {
            return `background-color: ${theme.font};`
        }
        if (half) {
            return `background: linear-gradient(to right, transparent 50%, ${theme.font} 50%);`
        }
    }}
    ${({ size = '1em', theme }) => {
        return `
        width: ${size};
        height: ${size};
        border: 1px solid ${theme.font}
        `
    }}
`

const CircleCounter = styled(Square)`
    ${({ size = '1em' }) => `border-radius: ${size};`}
`

export {
  CircleCounter,
  SquareCounter
}