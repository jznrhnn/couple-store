import { useCart } from './CartContext';
import { useTranslation } from 'react-i18next';

/**
 * 
 * @param {product} 商品信息,包含ID,数量,价格等 
 * @returns 
 */
const AddBotton = ({ product }) => {
    const { t } = useTranslation();

    // 设置最大商品数量和最小商品数量
    const MAX_QUANTITY = 200;
    const MIN_QUANTITY = 0;

    const { addToCart, removeFromCart, updateCartItem, cartItems } = useCart();

    const itemQuantity = cartItems.find(item => item.id === product.id)?.quantity || 0;

    const handleInputChange = (event, productId) => {
        let quantity = parseInt(event.target.value);
        // 使用正则表达式检查输入是否为数字
        if (!/^\d*$/.test(quantity)) {
            // 如果不是数字，则不做任何操作
            return;
        }
        if (quantity === '') {
            quantity = 0;
        }
        if (quantity < MIN_QUANTITY) {
            alert(t('message.minQuantity') + MIN_QUANTITY);
            quantity = MIN_QUANTITY;
        }
        if (quantity > MAX_QUANTITY) {
            alert(t('message.maxQuantity') + MAX_QUANTITY);
            quantity = MAX_QUANTITY;
        }
        updateCartItem(productId, quantity);
    };

    return (
        <>
            <button onClick={() =>
                addToCart(product)
            }>+</button >
            {itemQuantity > 0 && (
                <>
                    <input value={itemQuantity} style={styles.quantity}
                        onChange={(event) => handleInputChange(event, product.id)}
                    ></input>
                    <button onClick={() =>
                        removeFromCart(product.id)
                    }>-</button>
                </>
            )
            }
        </>
    );
}

const styles = {
    quantity: {
        maxWidth: '30px',
        textAlign: 'center',
    },
};

export default AddBotton;