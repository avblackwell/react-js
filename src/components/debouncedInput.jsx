import { useEffect, useState } from 'react';
import { TextInput, NumberInput } from '@mantine/core';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (val) => {
    if (val === '') return setValue('');
    setValue(val);
  };

  return props.type === 'number' ? (
    <NumberInput
      {...props}
      size='xs'
      value={value ?? ''}
      onChange={handleChange}
    />
  ) : (
    <TextInput
      {...props}
      size='xs'
      value={value ?? ''}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
