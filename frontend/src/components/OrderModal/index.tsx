import { useEffect } from 'react'

import { Overlay, ModalBody, OrderDetails, Actions } from './styles'

import closeIcon from '../../assets/images/close-icon.svg'

import { formatCurrency } from '../../utils/format-currency'
import { Order } from '../../@types/order'

interface OrderModalProps {
  visible: boolean
  order: Order | null
  isLoading: boolean
  onClose: () => void
  onCancelOrder: () => Promise<void>
  onChangeOrderStatus: () => Promise<void>
}

const STATUS_PROPS = {
  WAITING: {
    icon: '🕑',
    title: 'Fila de espera'
  },
  IN_PRODUCTION: {
    icon: '👩‍🍳',
    title: 'Em produção'
  },
  DONE: {
    icon: '✅',
    title: 'Pronto!'
  }
}

export function OrderModal({
  visible,
  order,
  isLoading,
  onClose,
  onCancelOrder,
  onChangeOrderStatus
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])
  if (!visible || !order) {
    return null
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity
  }, 0)

  const status = STATUS_PROPS[order.status]

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>

          <div>
            <span>{status.icon}</span>
            <strong>{status.title}</strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ product, quantity }) => (
              <div className="item">
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '👩‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          )}

          <button
            type="button"
            className="secondary"
            disabled={isLoading}
            onClick={onCancelOrder}
          >
            <span>Cancelar Pedido</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
