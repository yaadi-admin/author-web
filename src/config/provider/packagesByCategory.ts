/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { currentSession } from '../session';
import { BASE_URL } from 'src/config/bots';

export function providerPackagesByCategory(category: string) {
  const currentUser = currentSession() as any;
  const [packagesByCategory, setPackagesByCategory] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  console.log('category at packagesByCategory.ts is:', category);

  useEffect(() => {
    Promise.all([fetchPackagesByCategory()]).catch((error) => {
      console.error('Error fetching data:', error);
      // Handle error (e.g., display error message, retry logic)
    });
  }, [category]);

  const fetchPackagesByCategory = async () => {
    const response = await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        function: 'getPackageByCategory',
        packageCategory: category,
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb',
        },
        maxContentLength: Infinity, // This sets the max content length to unlimited
        maxBodyLength: Infinity, // This sets the max body length to unlimited
      }
    );
    console.log('Response is: ', response);
    setPackagesByCategory(response.data.Message);
  };

  const refresh = async () => {
    await fetchPackagesByCategory;
  };

  // Return the collection references
  return { refresh, loading, packagesByCategory };
}
