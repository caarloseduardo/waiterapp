import { Container } from './styles'

import { OrdersBoard } from '../OrdersBoard'
import { orders } from '../../mocks/orders'

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕑" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👩‍🍳" title="Em produção" orders={orders} />
      <OrdersBoard icon="✅" title="Pronto!" orders={orders} />
    </Container>
  )
}
