import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const GUEST_CART_ID_COOKIE = 'GuestCartId';

export const useGuestId = () => {
  const [guestId, setGuestId] = useState<string|null>(null);

  useEffect(() => {
    const storedGuestId = Cookies.get(GUEST_CART_ID_COOKIE);
    if (storedGuestId) {
      setGuestId(storedGuestId);
    }
  }, []);

  return guestId;
};