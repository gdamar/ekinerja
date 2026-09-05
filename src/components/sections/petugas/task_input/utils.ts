export interface CollagePayload {
  collageId: string;
  imageNames: string[];
  totalBytes: number;
}

export interface UserLocation {
  lat: number;
  long: number;
}

export const createPhotoCollagePayload = (files: File[]): CollagePayload => {
  return {
    collageId: `${Date.now()}-${files.length}`,
    imageNames: files.map((file) => file.name),
    totalBytes: files.reduce((total, file) => total + file.size, 0),
  };
};

const getLocationSuccess = (position: GeolocationPosition): UserLocation => {
  // const coordinate = document.getElementById("coordinate");
  return {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  } satisfies UserLocation;
};

export const getLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported in this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(getLocationSuccess(position)),
      (error) => reject(error),
    );
  });
};
