export type UserRole = 'public' | 'customer' | 'inventory_manager' | 'admin'

export const brands = [
  'TVS',
  'Lifan',
  'Wuling',
  '3B EV',
  'Dayang',
  'Loncin',
  'Yadea',
  'Bosch',
  'Chilwee',
]

export const categories = [
  'Motorcycles',
  'EV Motorcycles',
  'Electric Cars',
  'E-Rickshaws',
  'Three Wheelers',
  'Spare Parts',
]

export const products = [
  { sku: 'TVS-RTR-160-4V', name: 'TVS Apache RTR 160 4V', brand: 'TVS', category: 'Motorcycles', price: 248000, stock: 24, status: 'active', warehouse: 'Main Warehouse Addis Ababa' },
  { sku: 'LIFAN-KP165', name: 'Lifan KP165', brand: 'Lifan', category: 'Motorcycles', price: 219000, stock: 15, status: 'active', warehouse: 'Akaki Warehouse' },
  { sku: 'TVS-KING-DELUXE', name: 'TVS King Deluxe', brand: 'TVS', category: 'Three Wheelers', price: 390000, stock: 8, status: 'active', warehouse: 'Main Warehouse Addis Ababa' },
  { sku: '3B-ERICK-PRO', name: '3B E-Rickshaw Pro', brand: '3B EV', category: 'E-Rickshaws', price: 460000, stock: 12, status: 'active', warehouse: 'Bole Logistics Hub' },
  { sku: 'WULING-BINGO-EV', name: 'Wuling Bingo EV', brand: 'Wuling', category: 'Electric Cars', price: 1980000, stock: 6, status: 'active', warehouse: 'Main Warehouse Addis Ababa' },
  { sku: 'EV-CTRL-72V', name: '72V Controller', brand: 'Bosch', category: 'Spare Parts', price: 15500, stock: 51, status: 'active', warehouse: 'Akaki Warehouse' },
  { sku: 'EV-BAT-72V-45AH', name: '72V 45Ah Battery', brand: 'Chilwee', category: 'Spare Parts', price: 48000, stock: 28, status: 'active', warehouse: 'Bole Logistics Hub' },
  { sku: 'TYRE-JUMBO-300-17', name: 'Jumbo Tyre 300-17', brand: 'Dayang', category: 'Spare Parts', price: 48000, stock: 40, status: 'processing', warehouse: 'Main Warehouse Addis Ababa' },
  { sku: 'TYRE-JUMBO-300-18', name: 'Jumbo Tyre 300-18', brand: 'Dayang', category: 'Spare Parts', price: 52000, stock: 9, status: 'warning', warehouse: 'Main Warehouse Addis Ababa' },
  { sku: 'TVS-BRAKE-SHOE', name: 'TVS Brake Shoe', brand: 'TVS', category: 'Spare Parts', price: 2400, stock: 144, status: 'active', warehouse: 'Akaki Warehouse' },
  { sku: 'LIFAN-ENGINE-KIT', name: 'Lifan Engine Kit', brand: 'Lifan', category: 'Spare Parts', price: 16800, stock: 22, status: 'active', warehouse: 'Bole Logistics Hub' },
  { sku: 'TUBE-300-18', name: 'Tube 300-18', brand: 'Loncin', category: 'Spare Parts', price: 1800, stock: 77, status: 'inactive', warehouse: 'Main Warehouse Addis Ababa' },
]

export const dealers = [
  { name: '3B Addis Bole', region: 'Addis Ababa', status: 'active', contact: '+251 911 000 111' },
  { name: '3B Mekelle Mobility Hub', region: 'Tigray', status: 'active', contact: '+251 912 000 222' },
  { name: '3B Hawassa EV Center', region: 'Sidama', status: 'active', contact: '+251 913 000 333' },
  { name: '3B Bahir Dar Fleet Center', region: 'Amhara', status: 'processing', contact: '+251 914 000 444' },
]

export const warehouses = [
  { name: 'Main Warehouse Addis Ababa', capacity: 95, status: 'warning' },
  { name: 'Akaki Warehouse', capacity: 62, status: 'active' },
  { name: 'Bole Logistics Hub', capacity: 73, status: 'active' },
]

export const customerProfile = {
  name: 'Daniel',
  loyaltyPoints: 2480,
  tier: '3B Elite',
  validTill: '12 Dec 2025',
}

export const vehicles = [
  { name: 'TVS Apache RTR 160 4V', color: 'Black Red', plate: 'AA 12345', year: 2024, km: 1250, primary: true },
  { name: '3B EV Car X1', color: 'White', plate: 'AA 67890', year: 2024, km: 2300, primary: false },
]

export const orders = [
  { id: 'ORD-2025-00876', item: 'Jumbo Tyre 300-17', status: 'processing', amount: 48000 },
  { id: 'ORD-2025-00832', item: 'TVS Brake Shoe', status: 'shipped', amount: 2400 },
  { id: 'ORD-2025-00791', item: '72V Battery 30Ah', status: 'delivered', amount: 18500 },
  { id: 'ORD-2025-00745', item: 'Engine Oil 20W-50', status: 'delivered', amount: 3600 },
  { id: 'ORD-2025-00712', item: 'Tube 300-18', status: 'cancelled', amount: 1800 },
]

export const importSteps = [
  'CSV Intake',
  'Schema Detection',
  'Normalization',
  'Category Intelligence',
  'Variant Resolution',
  'Duplicate Engine',
  'Approval Queue',
  'Warehouse Allocation',
  'Inventory Commit',
  'Audit Snapshot',
]

export const inventoryHealth = {
  total: 12548,
  valid: 10236,
  warning: 1456,
  critical: 856,
  rate: '81.6%',
  eta: '2m 45s',
  queue: '#3',
}

export const riskAlerts = [
  'Demand spike detected in Addis corridor',
  '38 SKUs below reorder threshold',
  '11 products missing model mapping',
  'Price anomaly on battery line items',
  'Main warehouse nearing capacity',
]

export const conflictRows = [
  { issue: 'Duplicate SKU', target: 'TVS-RTR-160-4V', action: 'merge' },
  { issue: 'Category mismatch', target: 'WULING-BINGO-EV', action: 'assign category' },
  { issue: 'Missing model', target: 'EV-CTRL-72V', action: 'send to approval queue' },
  { issue: 'Tyre variant conflict', target: 'TYRE-JUMBO-300-18', action: 'create variant' },
  { issue: 'Price anomaly', target: 'EV-BAT-72V-45AH', action: 'skip' },
]

export const importBatches = [
  { id: 'IMP-00184', status: 'processing', progress: 72, rows: 12548, uploadedBy: 'Meron T.' },
  { id: 'IMP-00183', status: 'completed', progress: 100, rows: 8042, uploadedBy: 'Nati B.' },
  { id: 'IMP-00182', status: 'failed', progress: 61, rows: 2211, uploadedBy: 'Ruth F.' },
]
