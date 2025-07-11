import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'src/config/bots';

interface Package {
  id: number;
  name: string;
  details: string;
  price: string;
  description: string;
  category: string;
}

const useProviderPackagesByCategory = (packages: string[]) => {
  const [providerPackages, setProviderPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const packagePromises = packages.map(async (p) => {
          const response = await axios.post(
            `${BASE_URL}/api/bizbridge/serv/authenticate`,
            {
              function: 'getPackageByCategory',
              packageCategory: p,
            },
            {
              headers: {
                Authorization: 'skl-bhdbjcbcbcbdjb',
              },
              maxContentLength: Infinity, // This sets the max content length to unlimited
              maxBodyLength: Infinity, // This sets the max body length to unlimited
            }
          );
          const data = response.data.Message;
          console.log('response: ', response);

          return data;
        });
        const fulfilledPackages: any = [];
        const newPackages = await Promise.allSettled(packagePromises);
        newPackages.forEach(async (p) => {
          if (p.status == 'fulfilled') {
            if (p?.value?.[0]?.category) {
              await fulfilledPackages.push({
                category: p.value[0].category,
                data: p.value,
              });
            }
          }
        });
        setProviderPackages(fulfilledPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }
    if (packages?.length > 0) {
      fetchPackages();
    }
  }, [packages?.length]);

  return {
    providerPackages,
  };
};

export default useProviderPackagesByCategory;
