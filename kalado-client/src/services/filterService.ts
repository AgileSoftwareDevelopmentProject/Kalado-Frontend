export const fetchItems = async (selectedFilter: string | null, minPrice: number | '', maxPrice: number | '') => {
    try {
        const response = await fetch('https://kaladoshop.com/v1/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: selectedFilter,
                minPrice,
                maxPrice,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};
