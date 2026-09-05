import { useEffect } from 'react';
import { Paper, Skeleton, Typography } from '@mui/material';
import { getReverseGeocoding } from 'helpers/geocoding-utils';
import L, { MapOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapsProps {
  lat: number;
  long: number;
  zoom: number;
  options?: MapOptions;
}
export const Maps = ({ lat, long, zoom, ...options }: MapsProps) => {
  // const mapContainerRef = useRef<HTMLDivElement>(null);
  // const mapInstanceRef = useRef<L.Map | null>(null);
  const { data, isLoading } = getReverseGeocoding({ lat, long });

  useEffect(() => {
    // if (!mapContainerRef.current || !mapInstanceRef.current) return;
    const map = L.map('map', { center: [lat, long], zoom: zoom, ...options });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup(data);

    const popup = marker.getPopup();
    const popupContent = popup?.getContent();
    if (popupContent === undefined) {
      marker.setPopupContent('Alamat tidak ditemukan');
    }
    // mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => {
      map.remove();
      // mapInstanceRef.current = null;
    };
  }, [lat, long, zoom, options]);

  return (
    <Paper variant="elevation" elevation={0}>
      <Typography sx={{ fontSize: '12' }}>Lokasi</Typography>
      {isLoading ? <Skeleton /> : <div id="map" style={{ height: '320px', width: '100%' }}></div>}
    </Paper>
  );
};
