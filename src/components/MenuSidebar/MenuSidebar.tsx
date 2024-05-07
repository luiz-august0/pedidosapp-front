import * as MUIcon from '@mui/icons-material';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch } from 'react';
import { Menu, MenuItem, Sidebar as ReactSidebar } from 'react-pro-sidebar';
import { ItemProps, menuItems } from './store/menuItems';

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<React.SetStateAction<boolean>>;
};

type SidebarProps = Props & {
  logout: () => Promise<void>;
};

type ItemPropsRender = ItemProps & Pick<Props, 'setIsCollapsed'>;

const Item = ({ title, to, icon, setIsCollapsed }: ItemPropsRender) => {
  const router = useRouter();
  const pathname = usePathname();
  const IconRender = MUIcon[icon];

  const handleChooseItem = () => {
    setIsCollapsed(true);
    router.push(to);
  };

  return (
    <MenuItem active={to == pathname} onClick={handleChooseItem} icon={<IconRender />}>
      <Typography fontWeight={'bold'}>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed, logout }: SidebarProps) => {
  return (
    <ReactSidebar collapsed={isCollapsed} backgroundColor="#f2f0f0">
      <div className="flex flex-col h-screen justify-between">
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
              <Item key={e.to} title={e.title} to={e.to} icon={e.icon} setIsCollapsed={setIsCollapsed} />
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
    </ReactSidebar>
  );
};

export default function MenuSidebar({ isCollapsed, setIsCollapsed }: Props) {
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.replace('/login');
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={true} setIsCollapsed={setIsCollapsed} logout={logout} />
      <Drawer open={!isCollapsed} onClose={() => setIsCollapsed(true)}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} logout={logout} />
      </Drawer>
    </div>
  );
}
