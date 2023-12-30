import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartContextProvider, { CartContext } from './store/shopping-cart-context.jsx';


function App() {
 

  return (
    // have to provide a value if you want to use use context
    // the default value in the context file is for autocomplete help when accessing items in the context
    // <CartContext.Provider value={{ items: []}}>
    // <CartContext.Provider value={shoppingCart}>
    <CartContextProvider>
      {/* <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      /> */}
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* <Product {...product} onAddToCart={handleAddItemToCart} /> */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
