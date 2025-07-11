import { useEffect, useState } from 'react';
import { Switch } from 'rizzui';

import {
  InitialStateType,
} from '@/app/shared/explore-listing/filters/filter-utils';

export default function MyFavoritesFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [, setMyFavorites] = useState<boolean>(false);

  useEffect(() => {
    if (typeof state.isMyFavorites != null) {
      setMyFavorites(state.isMyFavorites);
    }
  }, [state.isMyFavorites]);

  return (
    <Switch label="My Favorites" onChange={(e) => {
      const value = e.target.checked;
      setMyFavorites(value);
      applyFilter('isMyFavorites', value);
    }}
    />
  )

}
