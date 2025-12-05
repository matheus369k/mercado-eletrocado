import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormFieldInput, FormFieldRoot, type FormFieldRootProps } from '.';
import { FormProvider, useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { HiCamera } from 'react-icons/hi';

const MetaFormField: Meta<FormFieldRootProps> = {
  title: 'Components/FormField',
  component: FormFieldRoot,
  tags: ['autodocs'],
  decorators: (Story) => {
    const formHook = useForm({
      defaultValues: {
        story_book: '',
      },
    });
    return (
      <FormProvider {...formHook}>
        <form onSubmit={(event) => event.preventDefault()} style={{ width: '300px' }}>
          {Story()}
        </form>
      </FormProvider>
    );
  },
  parameters: { layout: 'centered' },
  args: { customClass: 'none' },
  argTypes: { customClass: { control: 'select', options: ['none', 'user_avatar'] } },
};

export default MetaFormField;

export const Default: StoryObj<FormFieldRootProps> = {
  args: {
    children: (
      <FormFieldInput type="text" name="story_book" placeholder="Write your history here..." />
    ),
  },
};

export const WithIcon: StoryObj<FormFieldRootProps> = {
  args: {
    children: (
      <>
        <FormFieldInput type="text" name="story_book" placeholder="Write your history here..." />
        <FiMail />
      </>
    ),
  },
};

export const ImageField: StoryObj<FormFieldRootProps> = {
  args: {
    customClass: 'user_avatar',
    children: (
      <>
        <label htmlFor="story_book">Avatar</label>
        <FormFieldInput
          type="file"
          name="story_book"
          id="story_book"
          placeholder="select your image here..."
        />
        <HiCamera />
      </>
    ),
  },
};
