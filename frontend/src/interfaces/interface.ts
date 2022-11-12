
export interface pokemonInfo {
    id: number,
    stats: Array<any>,
    officialArtwork: string,
    types: Array<any>,
    abilities: Array<any>,
    height: number,
    weight: number,
    kind: string
}

export interface errorMessage {
    message: string,
    kind: string
}