import { useState } from 'react'

import { Board, OrdersContainer } from './styles'

import { OrderModal } from '../OrderModal'

import { Order } from '../../@types/orders'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)

  function handleOpenModal(order: Order) {
    setSelectedOrder(order)
    setIsModalVisible(true)
  }

  function handleCloseModal() {
    setSelectedOrder(null)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>
                {order.products.length}
                {order.products.length > 1 ? ' itens' : ' item'}
              </span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}
