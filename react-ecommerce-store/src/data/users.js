export const users = [
  {
    id: 1,
    email: 'john.doe@example.com',
    password: 'password123', // In a real app, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '555-0101',
    createdAt: '2023-01-15',
    addresses: [
      {
        id: 1,
        type: 'home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true
      }
    ]
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=2',
    phone: '555-0100',
    createdAt: '2023-01-01',
    addresses: []
  },
  {
    id: 3,
    email: 'sarah.smith@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '555-0102',
    createdAt: '2023-02-20',
    addresses: [
      {
        id: 2,
        type: 'home',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        isDefault: true
      }
    ]
  },
  {
    id: 4,
    email: 'mike.johnson@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '555-0103',
    createdAt: '2023-03-10',
    addresses: []
  },
  {
    id: 5,
    email: 'emily.brown@example.com',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Brown',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '555-0104',
    createdAt: '2023-04-05',
    addresses: [
      {
        id: 3,
        type: 'work',
        street: '789 Business Blvd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
        isDefault: true
      }
    ]
  }
];
