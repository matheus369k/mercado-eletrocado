import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import { ProductPreviewSlide } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';

describe('product preview slide component', () => {
  const userEvents = userEvent.setup();
  const mainImageUrl = faker.image.url();
  const product = {
    _id: faker.database.mongodbObjectId(),
    model: faker.commerce.productName(),
    img: mainImageUrl,
    slide: {
      slide1: mainImageUrl,
      slide2: faker.image.url(),
      slide3: faker.image.url(),
    },
  };

  it('should render first slide as main image', () => {
    render(<ProductPreviewSlide {...product} />);

    expect(screen.getByLabelText(/main preview image/i)).toHaveAttribute(
      'src',
      product.slide.slide1,
    );
  });

  it('should switch main image when clicked in another tumble image', async () => {
    render(<ProductPreviewSlide {...product} />);

    expect(screen.getByLabelText(/main preview image/i)).toHaveAttribute(
      'src',
      product.slide.slide1,
    );

    await userEvents.click(screen.getAllByLabelText(/preview product item/i)[0]);

    expect(screen.getByLabelText(/main preview image/i)).toHaveAttribute(
      'src',
      product.slide.slide2,
    );

    await userEvents.click(screen.getAllByLabelText(/preview product item/i)[2]);

    expect(screen.getByLabelText(/main preview image/i)).toHaveAttribute(
      'src',
      product.slide.slide3,
    );
  });
});
