export class Word {

    id: number;
    length: number;
    wrongLetters: Set<string>;
    word: string[];

    constructor() {
        this.word = [];
        this.wrongLetters = new Set<string>();
    }
}
