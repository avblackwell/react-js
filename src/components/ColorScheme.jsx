import { useMantineColorScheme, Button } from '@mantine/core';
import { useState } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react'

export function ColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const handleToggle = () => {
    toggleColorScheme();
    setIsDark(!isDark);
  };

  return (
    <Button onClick={handleToggle} variant="default">
      {isDark ? <IconSun /> : <IconMoon />}
    </Button>
  );
}