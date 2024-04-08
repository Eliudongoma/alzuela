import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

interface SearchBarProp {
  searchvisible?: boolean;
}

function SearchBar({ searchvisible = true }: SearchBarProp) {
  // Destructure props and state
  const [searchItem, setSearchItem] = useState("");

  // Function to handle clearing the search input
  const handleClearSearch = () => setSearchItem("");

  // Function to handle input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchItem(e.target.value);

  return (
    <Box
      w={searchvisible ? "50%" : "80%"}
      display={
        searchvisible ? { base: "none", sm: "none", md: "block" } : "block"
      }
      pl={searchvisible ? 0 : 3}
    >
      <FormControl>
        <InputGroup>
          {/* Search icon */}
          <InputLeftElement>
            <SearchIcon color="gray.300" boxSize={6} />
          </InputLeftElement>

          {/* Input field */}
          <Input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchItem}
            onChange={handleInput}
            color="white"
            fontSize={16}
            h={10}
            _placeholder={{ fontSize: "20px" }}
            w="100%"
          />

          {/* Clear search icon (shown when searchItem has value) */}
          {searchItem && (
            <InputRightElement>
              <CloseIcon
                color="gray.300"
                boxSize={4}
                onClick={handleClearSearch}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </Box>
  );
}

export default SearchBar;
