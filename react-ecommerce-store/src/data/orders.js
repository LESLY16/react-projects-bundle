export const orders = [
  {
    id: 1,
    userId: 1,
    orderNumber: 'ORD-2024-001',
    date: '2024-02-10',
    status: 'delivered',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Wireless Bluetooth Headphones',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
      },
      {
        id: 2,
        productId: 3,
        productName: 'Laptop Stand Aluminum',
        price: 39.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    shippingMethod: {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99
    },
    paymentMethod: 'card',
    subtotal: 229.97,
    tax: 18.40,
    shippingCost: 5.99,
    total: 254.36,
    trackingNumber: 'TRK123456789'
  },
  {
    id: 2,
    userId: 1,
    orderNumber: 'ORD-2024-002',
    date: '2024-02-15',
    status: 'shipped',
    items: [
      {
        id: 3,
        productId: 5,
        productName: 'Running Shoes Pro',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    shippingMethod: {
      id: 'express',
      name: 'Express Shipping',
      price: 12.99
    },
    paymentMethod: 'paypal',
    subtotal: 89.99,
    tax: 7.20,
    shippingCost: 12.99,
    total: 110.18,
    trackingNumber: 'TRK987654321'
  },
  {
    id: 3,
    userId: 3,
    orderNumber: 'ORD-2024-003',
    date: '2024-02-16',
    status: 'processing',
    items: [
      {
        id: 4,
        productId: 13,
        productName: 'Cookbook Mediterranean Diet',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
      },
      {
        id: 5,
        productId: 7,
        productName: 'Coffee Maker Deluxe',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'
      }
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    shippingMethod: {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99
    },
    paymentMethod: 'card',
    subtotal: 109.98,
    tax: 8.80,
    shippingCost: 5.99,
    total: 124.77,
    trackingNumber: null
  }
];
