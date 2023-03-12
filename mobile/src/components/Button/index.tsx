import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

import { Text } from '../Text'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Text weight="600" color="#fff">
        {children}
      </Text>
    </Container>
  )
}
