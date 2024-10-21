import { GridItem } from "@chakra-ui/react";
import { Footer, Info } from "../components";
import { useProducts } from "../hooks";
import Grid from "../components/common/Grid";
// import NavBar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { products } = useProducts();

  return (
    <>
      {/* <NavBar /> */}
      <Grid column={{ base: 1, md: 3, lg: 4 }} gap={4} px={5} mt={20}>
        {products.map((product, index) => (
          <GridItem key={index} borderRadius={16} overflow={"hidden"}>
            <ProductCard {...product} />
          </GridItem>
        ))}
      </Grid>
      <Info />
      <Footer />
    </>
  );
}

export default HomePage;
