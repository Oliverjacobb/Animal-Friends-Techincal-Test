
export interface UserResult {
    results: User[];
}

export interface User {
    name: UserName;
    picture: UserPicture;
    login: UserLogin;
    email: string;
    location: UserLocation;
}

interface UserName {
    title: string;
    first: string;
    last: string;
}

interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface UserLogin {
    uuid: string;
}

interface UserLocation {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
}

interface Street {
    number: number;
    name: string;
}

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Timezone {
    offset: string;
    description: string;
}