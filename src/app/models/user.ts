
export interface UserResult {
    results: User[];
}

export interface User {
    name: UserName;
    gender: string;
    picture: UserPicture;
    login: UserLogin;
    email: string;
    location: UserLocation;
    dob: UserDOB;
    nat: string;
    registered: UserRegistration;
    phone: string;
    cell: string;
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
    username: string;
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

interface UserDOB {
    date: string;
    age: number;
}

interface UserRegistration {
    date: string;
    age: number;
}