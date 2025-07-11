'use client';

import { useState, useEffect } from 'react';
import { Button } from 'rizzui';
import ListingCard from '@/components/cards/listing-card';
import hasSearchedParams from '@/utils/has-searched-params';
import { currentSession } from '@/config/session';
import Filters from './filters';
import { filterProductsData } from '@/data/filter-products-data';
// Note: using shuffle to simulate the filter effect
import shuffle from 'lodash/shuffle';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, getDocs, where } from "firebase/firestore";

let countPerPage = 12;

interface DataFieldsType {
  id: string;
  data: any;
  // Define properties here
}

export default function ProductsGrid(props: { isPublic?: boolean }) {
  const { isPublic = false } = props;
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);
  const currentUser = currentSession() as any;
  const [data, setData] = useState([]) as any;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  useEffect(() => {

    listingData();
  }, [currentUser?.id]);

  const listingData = async () => {
    const q = query(collection(firebase.firestore, "listings"), where("status", "==", "active"));
    const querySnapshot = await getDocs(q);
    const dataFields: DataFieldsType[] = [];
    querySnapshot.forEach((doc) => {
      const dataValue = doc.data() as DataFieldsType;
      dataFields.push({ ...dataValue });
    });
    setData(dataFields);
  };


  const parseSearchParams = () => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const priceParam = urlParams.get('price');
    const sectorParam = urlParams.get('primary_sector');
    const sectorSecondaryParam = urlParams.get('secondary_sector');
    const favoritesParam = urlParams.get('isMyFavorites');


    if (priceParam) {
      const [minPrice, maxPrice] = priceParam.split(',').map(price => parseInt(price, 10));
      return { minPrice, maxPrice };
    }

    if (sectorParam) {
      const sectors = sectorParam.split(',');
      return { sectors };
    }

    if (sectorSecondaryParam) {
      const sectorSecondary = sectorSecondaryParam.split(',');
      return { sectorSecondary };
    }

    if (favoritesParam) {
      const favorites = favoritesParam.split(',');
      return { favorites };
    }

    return null; // If no search parameters or invalid parameters
  }

  const filteredData = hasSearchedParams()
    ? shuffle(data).filter(product => {
      const searchParams = parseSearchParams();
      if (searchParams) {
        const { minPrice, maxPrice, sector, sectorSecondary, favorites } = searchParams as any;
        // Assuming your product object has a price property
        if (product?.price?.original >= minPrice && product?.price?.original <= maxPrice) {
          return true; // Keep the product in the filtered array
        }

        if (sector) {
          // Assuming product has a property called 'primary_sector'
          if (sector.includes(product?.primary_sector)) {
            return true;
          } else {
            return false;
          }
        }

        if (sectorSecondary) {
          // Assuming product has a property called 'primary_sector'
          if (sectorSecondary.includes(product?.secondary_sector)) {
            return true;
          } else {
            return false;
          }
        }

        if (favorites) {
          // Assuming product has a property called 'primary_sector'
          if (favorites.includes(product?.favorites)) {
            return true;
          } else {
            return false;
          }
        }

      }
      return false; // Exclude the product from the filtered array
    })
    : data;

  return (
    <>
      <div className='pb-4'>
        <Filters />
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData
          ?.slice(0, nextPage)
          ?.map((product: any, index: any) => (
            <ListingCard
              key={`filterProduct-${index}`}
              user={currentUser}
              product={product}
              isPublic={isPublic}
            />
          ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
