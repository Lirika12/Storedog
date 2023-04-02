export const Productcard = ({ product }) => {
  return (
    <div className="product">
      <div className="productcard_container">
        <div className="productcard_body">
          <div className="productcard_image">
            <img src={product.pictures} alt="Картинка продукта" />
          </div>
          <div className="productcard_price">{product.price} ₽</div>
          <div className="productcard_stock">{product.stock} шт.</div>
          <div className="productcard_name">{product.name}</div>
        </div>

        {product.available ? (
          <button className="product_btn_cart">В корзину</button>
        ) : (
          <button disabled className="product_btn_empty">
            Нет в наличии
          </button>
        )}
      </div>
    </div>
  );
};
