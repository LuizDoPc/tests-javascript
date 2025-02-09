import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes - man',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas running shoes - woman',
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });
  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure no more than one product at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list items', () => {
      cart.add({
        product,
        quantity: 3,
      });

      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 3,
      });
      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('should return an object with the total and the list items when summary() is called', () => {
      cart.add({
        product,
        quantity: 3,
      });

      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.sumarry()).toMatchSnapshot();
    });

    it('should not reset the cart when summary() is called', () => {
      cart.add({
        product,
        quantity: 3,
      });
      cart.sumarry();

      expect(cart.getTotal()).toBeGreaterThan(0);
    });
  });
});
