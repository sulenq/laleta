import React, { useRef, useEffect } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Tooltip,
} from "@chakra-ui/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import useProductSearch from "../globalState/useProductSearch";
import useOrder from "../globalState/useOrder";
import { RetailProduct } from "../types";
import useJwt from "../globalState/useJwt";
import useRetailProducts from "../globalState/useRetailProducts";

export default function RetailProductSearch() {
  const { retailProducts, setRetailProducts } = useRetailProducts();
  const { productSearch, setProductSearch } = useProductSearch();
  const { addOrder } = useOrder();
  const { outletId } = useParams();
  const jwt = useJwt();

  const searchProductButton = useRef(null);
  const productSearchInputRef = useRef<HTMLInputElement | null>(null);

  const handleClearIndexProduct = () => {
    productSearchInputRef.current?.focus();
    setProductSearch("");
  };

  const handleIndexProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };

  const handleIndexProductKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchProductButton.current) {
        const productFound = retailProducts?.find(
          (p: RetailProduct) => p.code === productSearch
        );

        if (productFound) {
          setProductSearch("");
          addOrder({
            id: productFound.id,
            code: productFound.code,
            name: productFound.name,
            price: parseInt(productFound.price),
            qty: 1,
            totalPrice: parseInt(productFound.price),
            stock: parseInt(productFound.stock),
            category: productFound.category,
          });
        } else {
          (searchProductButton.current as HTMLElement).click();
        }
      }
    }
  };

  useEffect(() => {
    productSearchInputRef.current?.focus();
  }, []);

  useEffect(() => {}, []);

  return (
    <form style={{ width: "100%", maxWidth: "400px" }}>
      <InputGroup position={"relative"}>
        <Input
          ref={productSearchInputRef}
          className="filled"
          name={"productSearch"}
          placeholder="Index product"
          pr={"40px !important"}
          value={productSearch}
          onChange={handleIndexProduct}
          onKeyDown={handleIndexProductKeydown}
        />
        <HStack gap={"2px"} position={"absolute"} right={0} top={0}>
          {productSearch && (
            <IconButton
              onClick={handleClearIndexProduct}
              _hover={{ bg: "transparent !important" }}
              _active={{ bg: "transparent !Important" }}
              zIndex={2}
              variant={"ghost"}
              className="sm-clicky"
              aria-label="clearSearchButton"
              icon={<Icon as={X} fontSize={16} />}
            />
          )}

          <Tooltip openDelay={500} label={"Open Seacrh Tab"}>
            <IconButton
              ref={searchProductButton}
              as={Link}
              to={"/product-search"}
              aria-label="indexProductButton"
              icon={<Icon as={MagnifyingGlass} fontSize={18} />}
              // colorScheme="bnw"
              className="btn-solid sm-clicky"
              zIndex={2}
            />
          </Tooltip>
        </HStack>
      </InputGroup>
    </form>
  );
}
