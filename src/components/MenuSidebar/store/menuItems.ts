import * as Icon from "@mui/icons-material";

export type ItemProps = {
  title: string;
  to: string;
  icon: keyof typeof Icon;
};

export const menuItems : ItemProps[] = [
  {
    title: "Dashboard",
    to: "/",
    icon: 'Home'
  },
  {
    title: "Produtos",
    to: "/produtos",
    icon: 'Inventory'
  },
  {
    title: "Fornecedores",
    to: "/fornecedores",
    icon: 'People'
  },
  {
    title: "Clientes",
    to: "/clientes",
    icon: 'PeopleOutline'
  },
  {
    title: "Funcionários",
    to: "/funcionarios",
    icon: 'Groups'
  }
] 