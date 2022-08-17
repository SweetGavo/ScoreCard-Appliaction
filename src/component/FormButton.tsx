import React from 'react'
import styled from "styled-components"

type ButtonProps = {
  text: string
}

const ButtonBody = styled.button`
width: calc(100% - 0.21rem);
height: 2.5rem;
border: 1px solid rgba(33, 51, 79, 0.15);
margin: 0.4rem 0;
background: #14A800;
color: #fff
`

const FormButton = (props: ButtonProps) => {
  const { text } = props
  return (
    <ButtonBody type='submit'>
      {text}
    </ButtonBody>
  )
}

export default FormButton