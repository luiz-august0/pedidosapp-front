import * as MUIcon from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { ItemProps, menuItems } from './store/menuItems';

type Props = {
  children: ReactNode;
};

const Item = ({ title, to, icon }: ItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const IconRender = MUIcon[icon]; 

  return (
    <MenuItem active={to==pathname} onClick={() => router.push(to)} icon={<IconRender/>}>
      <Typography fontWeight={'bold'}>{title}</Typography>
    </MenuItem>
  );
};

export default function MenuSidebar({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.replace('/login');
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar collapsed={isCollapsed} backgroundColor="#f2f0f0">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Menu>
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MUIcon.MenuOutlined color="primary" /> : undefined}
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
                      <MUIcon.MenuOutlined color="primary" />
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
              {menuItems.map((e) => (
                <Item
                  key={e.to}
                  title={e.title}
                  to={e.to}
                  icon={e.icon}
                />
              ))}
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
            <MenuItem icon={<MUIcon.Logout />} onClick={logout}>
              <Typography fontWeight={'bold'}>Sair</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      {!isCollapsed ? (
        <div
          className="flex h-screen w-screen p-3 bg-black bg-opacity-60 opacity-95 transition-all"
          onClick={() => setIsCollapsed(true)}
        >
          {children}
        </div>
      ) : (
        <div className="flex h-screen w-screen p-3 transition-all">{children}</div>
      )}
    </div>
  );
}
