export interface Watcher {
    name: string,
    lastname: string,
    email: string,
    password: string,
    watchers: Array<Provider>,
    profileImageUrl: string
}

export interface Provider {
    name: string,
    lastname: string,
    email: string,
    password: string,
    watchers: Array<Provider>,
    profileImageUrl: string,
    videoUrl: string,
    audioUrl: string,
    products: Array<Product>
}

export interface Product {
    name: string,
    description: string,
    imageUrl: string,
    providerEmail: string
}