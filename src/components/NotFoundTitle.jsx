import { Button, Container, Group, Text, Title, Stack } from '@mantine/core'
import { Link } from '@tanstack/react-router'
// import classes from './NotFoundTitle.module.css';

export function NotFoundTitle() {
  return (
    // <Container>
    //   <div>404</div>
    //   <Title >You have found a secret place.</Title>
    //   <Text c="dimmed" size="lg" ta="center" >
    //     Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
    //     been moved to another URL.
    //   </Text>
    //   <Group justify="center">
    //     <Button variant="subtle" size="md">
    //       Take me back to home page
    //     </Button>
    //   </Group>
    // </Container>
    <Container size="xs">
      <Stack h="calc(100vh - 60px)" align="center" justify="center" gap="md">
        <Title>404</Title>
        <Text c="dimmed" size="lg" ta="center">
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group justify="center">
          
          <Button component={Link} variant="subtle" size="md">
            Take me back to home page
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}
