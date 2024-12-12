import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemCard from './ItemCard';

describe('ItemCard Component', () => {
    const item = {
        title: 'Samsung A54',
        imageUrl: 'https://example.com/image.jpg',
        price: 15000000,
        city: 'تهران',
        date: '2024-01-01T00:00:00Z',
        itemId: '1'
    };

    it('renders the item card with correct details', () => {
        render(
            <MemoryRouter>
                <ItemCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    city={item.city}
                    date={item.date}
                    itemId={item.itemId}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(item.title)).toBeInTheDocument();
        expect(screen.getByText(/تومان 15,000,000/i)).toBeInTheDocument();
        expect(screen.getByText(item.city)).toBeInTheDocument();
        expect(screen.getByText(new Date(item.date).toLocaleDateString())).toBeInTheDocument();
        const image = screen.getByAltText(item.title);
        expect(image).toHaveAttribute('src', item.imageUrl);
    });

    it('navigates to the correct item details page on click', () => {
        const navigate = jest.fn();

        render(
            <MemoryRouter>
                <ItemCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    city={item.city}
                    date={item.date}
                    itemId={item.itemId}
                />
            </MemoryRouter>
        );

        const card = screen.getByRole('button');
        fireEvent.click(card);

        expect(navigate).toHaveBeenCalledWith(`/item/${item.itemId}`);
    });
});
