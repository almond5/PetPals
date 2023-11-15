import React, { useMemo, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const GoogleMapView = (props: { setLat: any; setLng: any; setAddress: any }) => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: 28.6024, lng: -81.2001 }), []);
  const [guessCoords, setGuessCoords] = useState({
    lat: 28.6024,
    lng: -81.2001,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setGuessCoords({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
    props.setLat(e.latLng!.lat());
    props.setLng(e.latLng!.lng());
    handleReverseGeocode(guessCoords.lat, guessCoords.lng);
  };

  const handleReverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results![0]) {
          console.log(results![0].formatted_address);
          props.setAddress(results![0].formatted_address)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="py-6">
      <div className=" flex justify-center ">
        <div
          className="block p-2.5 text-md w-min text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] border-neutral-700"
        >
          <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.TERRAIN}
            mapContainerStyle={{ width: '600px', height: '600px' }}
            onLoad={() => console.log('Map Component Loaded...')}
            onClick={(e) => {
              handleMapClick(e);
            }}
          >
            <MarkerF position={guessCoords} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapView;