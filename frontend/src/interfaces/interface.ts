
export interface pokemonInfo {
    id: number,
    name: string,
    stats: Array<any>,
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