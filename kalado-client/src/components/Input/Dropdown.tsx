import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];
    placeholder?: string;
    onChange: (selectedOption: Option | null) => void;
    value?: Option | null;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder = 'Select an option',
    onChange,
    value
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: Option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleToggle}>
                {value ? value.label : placeholder}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={value?.value === option.value ? 'selected' : ''}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
