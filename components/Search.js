import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
 searchTerms: products(where:{Name_contains:$searchTerm}){
    Name,
    id,
    Price,
    Image{
      url,
      alternativeText
     }
    }
  }
`;

export default function Search() {
    const router = useRouter();
    const [findItems, { loading, data, error }] = useLazyQuery(
        SEARCH_PRODUCTS_QUERY,
        {
            fetchPolicy: 'no-cache',
        }
    );
    const items = data?.searchTerms || [];
    const findItemsButChill = debounce(findItems, 350);
    
    resetIdCounter();
    const {
        isOpen,
        inputValue,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
        highlightedIndex,
    } = useCombobox({
        items,
        onInputValueChange() {
            findItemsButChill({
                variables: {
                    searchTerm: inputValue,
                },
            });
        },
        onSelectedItemChange({ selectedItem }) {
            router.push({
                pathname: `/product/${selectedItem.id}`,
            });
        },
        itemToString: (item) => item?.Name || '',
    });
    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input
                    {...getInputProps({
                        type: 'search',
                        placeholder: 'Search for an Item',
                        id: 'search',
                        className: loading ? 'loading' : '',
                    })}
                />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen &&
                    items.map((item, index) => (
                        <DropDownItem
                            {...getItemProps({ item, index })}
                            key={item.id}
                            highlighted={index === highlightedIndex}
                        >
                            <img
                                src={item?.Image[0]?.url || "https://res.cloudinary.com/dxd0lzpm0/image/upload/v1629873181/m4o4qclkc2ctmitgzulc.png" }
                                alt={item?.Image[0]?.alternativeText || "No Image"}
                                width="50"
                            />
                            {item.Name}
                        </DropDownItem>
                    ))}
                {isOpen && !items.length && !loading && (
                    <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    );
}