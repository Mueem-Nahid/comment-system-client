import {ActionIcon, rem, TextInput, TextInputProps, useMantineTheme} from '@mantine/core';
import {IconArrowRight, IconSearch} from '@tabler/icons-react';

export function PostInput(props: TextInputProps) {
   const theme = useMantineTheme();

   return (
      <TextInput
         radius="xl"
         size="md"
         placeholder="Share your thoughts ..."
         rightSectionWidth={42}
         // @ts-ignore
         leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
         rightSection={
            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
               <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
         }
         {...props}
      />
   );
}