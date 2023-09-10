import { useState } from 'react';
import { TbPhotoSearch } from 'react-icons/tb';
import {
  Input,
  Label,
  SearchButton,
  SearchForm,
  StyledHeader,
} from './Searchbar.styled';
import toast from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = evt => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (inputValue === '') {
      toast('Please check your search query', {
        icon: '🔎',
      });
      return;
    }
    onSubmit(inputValue);
  };

  return (
    <StyledHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <TbPhotoSearch size={32} />
          <Label>Search</Label>
        </SearchButton>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </StyledHeader>
  );
};
