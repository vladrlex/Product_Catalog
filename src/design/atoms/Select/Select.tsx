import { useState, useRef, useEffect, type FC, type ChangeEvent } from 'react';
import './Select.scss';

type SelectProps = {
  id: string;
  label: string;
  options: string[];
  multiple?: boolean;
  onChange?: (val: string | string[]) => void;
  value: string[];
  placeholder?: string;
};

export const Select: FC<SelectProps> = ({
  id,
  label,
  options,
  onChange,
  multiple = false,
  value,
  placeholder = 'Select options',
}) => {
  const getInitState = () => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    } else {
      return Array.isArray(value) && value.length > 0
        ? [value[0]]
        : [];
    }
  };
  const [selectedValues, setSelectedValues] = useState<string[]>(getInitState);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: string) => {
    if (multiple) {
      let newValues = [...selectedValues];
      if (newValues.includes(option)) {
        newValues = newValues.filter(item => item !== option);
      } else {
        newValues = [...newValues, option];
      }
      setSelectedValues(newValues);

      if (onChange) {
        if (multiple) {
          onChange([...newValues]);
        } else {
          onChange(newValues[0] || '');
        }
      }
    } else {
      if (onChange) {
        onChange(option);
      }
      setSelectedValues([option]);
      setIsOpen(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (multiple) {
      return selectedValues.join(', ');
    } else {
      return selectedValues[0];
    }
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: string,
  ) => {
    e.stopPropagation();
    handleOptionSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValues(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.join('')]);

  return (
    <div
      className="select__filter"
      ref={dropdownRef}
      style={
        multiple ? { width: '150px', maxWidth: '150px', minWidth: '150px' } : {}
      }
    >
      <label htmlFor={id} className="select__label">
        {label}
      </label>

      <div
        className={`select__select-header ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <div className="select__selected-text">{getDisplayText()}</div>
        <div className="select__arrow">{isOpen ? '▲' : '▼'}</div>
      </div>

      {isOpen && (
        <div className="select__options-container">
          {options.map(opt => (
            <div
              key={opt}
              className={`select__option ${selectedValues.includes(opt) ? 'selected' : ''}`}
              onClick={!multiple ? () => handleOptionSelect(opt) : undefined}
            >
              {multiple ? (
                <>
                  <input
                    type="checkbox"
                    id={`${id}-${opt}`}
                    checked={selectedValues.includes(opt)}
                    onChange={e => handleCheckboxChange(e, opt)}
                    className="select__checkbox"
                  />
                  <label
                    htmlFor={`${id}-${opt}`}
                    className="select__option-label"
                  >
                    {opt}
                  </label>
                </>
              ) : (
                <span className="select__option-text">{opt}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
