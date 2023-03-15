import { ActivityIndicator, TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

import { Text } from '../Text'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

export function Button({ children, disabled, loading, ...rest }: ButtonProps) {
  return (
    <Container {...rest} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
    </Container>
  )
}
