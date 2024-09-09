import React, { useState } from 'react';

const SelectProduct: React.FC = () => {
    // State to store selected items
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Function to handle button click
    const handleButtonClick = (item: string) => {
        setSelectedItems(prevItems => {
            // Check if the item is already included
            if (prevItems.includes(item)) {
                // Remove the item if already selected
                return prevItems.filter(prevItem => prevItem !== item);
            } else {
                // Add the item if not already selected
                return [...prevItems, item];
            }
        });
    };

    // Function to submit the form
    const handleSubmit = () => {
        console.log('Submitted Items:', selectedItems);
        // Additional submission logic here
    };

    return (
        <div>
            <button onClick={() => handleButtonClick("Biorrefinery")}>
                Toggle Biorrefinery
            </button>
            <button onClick={() => handleButtonClick("BioChar")}>
                Toggle BioChar
            </button>
            <button onClick={() => handleButtonClick("BioFuel")}>
                Toggle BioFuel
            </button>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>Selected Items: {selectedItems.join(", ")}</div>
        </div>
    );
};

export default SelectProduct;
