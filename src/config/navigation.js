import {
  Boxes,
  ClipboardList,
  FileSearch,
  FileText,
  HandCoins,
  LayoutDashboard,
  Package,
  PackageCheck,
  ReceiptText,
  ShoppingCart,
  Truck,
  UserCog,
  Users,
  Warehouse,
  WalletCards,
} from 'lucide-react'

export const navigationGroups = [
  {
    label: 'Visão Geral',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        permission: 'dashboard.visualizar',
      },
    ],
  },
  {
    label: 'Comercial',
    items: [
      {
        label: 'Clientes',
        path: '/clientes',
        icon: Users,
        permission: 'cliente.visualizar',
      },
      {
        label: 'Pedidos',
        path: '/pedidos',
        icon: ShoppingCart,
        permission: 'pedido.visualizar',
      },
      {
        label: 'Solicitações',
        path: '/solicitacoes',
        icon: ClipboardList,
        permission: 'solicitacao.visualizar',
      },
      {
        label: 'Cotações',
        path: '/cotacoes',
        icon: FileText,
        permission: 'cotacao.visualizar',
      },
    ],
  },
  {
    label: 'Catálogo & Stock',
    items: [
      {
        label: 'Produtos',
        path: '/produtos',
        icon: Package,
        permission: 'produto.visualizar',
      },
      {
        label: 'Stock',
        path: '/stock',
        icon: Warehouse,
        permission: 'stock.visualizar',
      },
    ],
  },
  {
    label: 'Aquisições',
    items: [
      {
        label: 'Fornecedores',
        path: '/fornecedores',
        icon: Boxes,
        permission: 'fornecedor.visualizar',
      },
      {
        label: 'Compras',
        path: '/compras',
        icon: PackageCheck,
        permission: 'compra.visualizar',
      },
    ],
  },
  {
    label: 'Operações',
    items: [
      {
        label: 'Entregas',
        path: '/entregas',
        icon: Truck,
        permission: 'entrega.visualizar',
      },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      {
        label: 'Pagamentos',
        path: '/pagamentos',
        icon: WalletCards,
        permission: 'pagamento.visualizar',
      },
      {
        label: 'Financeiro',
        path: '/financeiro',
        icon: HandCoins,
        permission: 'financeiro.visualizar',
      },
    ],
  },
  {
    label: 'Administração',
    items: [
      {
        label: 'Utilizadores',
        path: '/utilizadores',
        icon: UserCog,
        permission: 'utilizador.visualizar',
      },
      {
        label: 'Auditoria',
        path: '/auditoria',
        icon: FileSearch,
        permission: 'auditoria.visualizar',
      },
    ],
  },
]