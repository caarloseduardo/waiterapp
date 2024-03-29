import { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'

import { Container } from './styles'

import { OrdersBoard } from '../OrdersBoard'

import { Order } from '../../@types/order'
import { api } from '../../utils/api'

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket']
    })

    socket.on('orders@new', order => {
      setOrders(prevState => {
        const itemIndex = prevState.findIndex(
          orderItem => orderItem._id === order._id
        )

        if (itemIndex < 0) {
          return prevState.concat(order)
        }

        return prevState
      })
    })
  }, [])

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data)
    })
  }, [])

  const waiting = orders.filter(order => order.status === 'WAITING')
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION')
  const done = orders.filter(order => order.status === 'DONE')

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState =>
      prevState.map(order =>
        order._id === orderId ? { ...order, status } : order
      )
    )
  }

  return (
    <Container>
      <OrdersBoard
        key="waiting"
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        key="production"
        icon="👩‍🍳"
        title="Em produção"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        key="done"
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  )
}
