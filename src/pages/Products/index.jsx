import React from "react";
import { getAllProductsWithSearch } from "../../api/products";
import { Productcard } from "../../components/Productcard";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { NoFoundSearch } from "../../components/NoFoundSearch";

export const Products = () => {
  const { token } = useAuth();
  const { search } = useSelector((state) => state.filter);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getallProductsWithSearch", search],
    queryFn: async () => {
      const res = await getAllProductsWithSearch(token, search);
      if (res.ok) {
        return await res.json();
      }
    },
  });

  if (isLoading) return <p> Загрузка </p>;
  if (isError) return <p> Произошла ошибка: {error} </p>;

  return (
    <div className="main">
      <div className="main_title">Товары:</div>
      <div className="main_container">
        {products.length ? (
          products.map((currentProduct) => {
            return (
              <Productcard product={currentProduct} key={currentProduct._id} />
            );
          })
        ) : (
          <NoFoundSearch />
        )}
      </div>
    </div>
  );
};
