import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

const Grid = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  ...otherProps
}: SimpleGridProps) => (
  <SimpleGrid {...otherProps} columns={columns} py={".7rem"} spacing={3}>
    {children}
  </SimpleGrid>
);

export default Grid;
