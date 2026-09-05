import { useQuery } from '@tanstack/react-query';

interface GetReverseGeocodingProps {
  lat: number;
  long: number;
}

export const fetchAddress = async (coordinates: GetReverseGeocodingProps) => {
  const data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.long}&format=json`,
  );
  if (!data.ok) {
    throw new Error('Reverse geocoding failed');
  }
  const res = await data.json();

  if (!res.display_name) {
    return 'alamat tidak ditemukan';
  }

  return res.display_name;
};

export function getReverseGeocoding(coordinates: GetReverseGeocodingProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reverse-geocoding'],
    queryFn: () => fetchAddress(coordinates),
  });

  return { data, isLoading, error };
}
