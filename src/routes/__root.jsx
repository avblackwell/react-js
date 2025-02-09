import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHome2, IconInfoCircle, IconBug } from '@tabler/icons-react'
import { ColorScheme } from '../components/ColorScheme'

export const Route = createRootRoute({
  component: () => (
    <>
      <FullLayout />
    </>
  ),
})

export function FullLayout() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <AppShell
        header={{ height: 70 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group justify="space-between" h="100%" px="md">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title size="h1">CyberTime</Title>
            </Group>
            <ColorScheme />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            component={Link}
            label="Home"
            to="/"
            leftSection={<IconHome2 size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            label="About"
            to="/about"
            leftSection={<IconInfoCircle size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            label="Test"
            to="/test"
            leftSection={<IconInfoCircle size={16} stroke={1.5} />}
          />
          <NavLink
            component={Link}
            label="Error"
            to="/error"
            leftSection={<IconBug size={16} stroke={1.5} />}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
    </>
  )
}
