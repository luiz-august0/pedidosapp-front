import * as Icon from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

type Props = {
  children: ReactNode;
};

type ItemProps = {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const Item = ({ title, to, icon }: ItemProps) => {
  const router = useRouter();

  return (
    <MenuItem active={to == '/produtoss' ? true : false} onClick={() => router.push(to)} icon={icon}>
      <Typography fontWeight={'bold'}>{title}</Typography>
    </MenuItem>
  );
};

export default function MenuSideBar({ children }: Props) {
  const [selected, setSelected] = useState<string>('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const router = useRouter();

  const logout = () => {
    signOut({ redirect: false });
    router.replace("/login");
  }

  return (
    <div className="flex flex-row h-screen">
      <Sidebar collapsed={isCollapsed} backgroundColor="#f2f0f0">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Menu>
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <Icon.MenuOutlined color="primary" /> : undefined}
                style={{
                  margin: '10px 0 20px 0',
                }}
              >
                {!isCollapsed && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                    <Typography fontSize={24} color={'#1976D2'}>
                      Pedidos APP
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <Icon.MenuOutlined color="primary" />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
            </Menu>
            <Menu
              menuItemStyles={{
                button: ({ active }) => {
                  return {
                    color: active ? '#E6F4F1' : '#1976D2',
                    backgroundColor: active ? '#1976D2' : undefined,
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor: '#E6F4F1',
                      color: '#1976D2',
                    },
                  };
                },
              }}
            >
              <Item
                title="Produtos"
                to="/produtoss"
                icon={<Icon.Inventory />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Produtos"
                to="/produtos"
                icon={<Icon.Inventory />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
          </div>
          <Menu
            menuItemStyles={{
              button: () => {
                return {
                  color: '#1976D2',
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: '#E6F4F1',
                    color: '#1976D2',
                  },
                };
              },
            }}
          >
            <MenuItem icon={<Icon.Logout />} onClick={logout}>
              <Typography fontWeight={'bold'}>Sair</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      {!isCollapsed ? (
        <div className="flex h-screen w-screen p-3 bg-black bg-opacity-60 opacity-95 transition-all">{children}</div>
      ) : (
        <div className="flex h-screen w-screen p-3 transition-all">{children}</div>
      )}
    </div>
  );
}
