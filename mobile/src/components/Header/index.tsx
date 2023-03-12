import { Container, Content, OrderHeader, Table } from './styles'

import { Text } from '../Text'
import { TouchableOpacity } from 'react-native'

interface HeaderProps {
  selectedTable: string
  onCancelOder: () => void
}

export function Header({ selectedTable, onCancelOder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>

            <TouchableOpacity onPress={onCancelOder}>
              <Text color="#d73035" weight="600" size={14}>
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  )
}
