export class Word {

    id: number;
    length: number;
    wrongLetters: string[];
    word: string[];

    constructor() {
        this.word = [];
        this.wrongLetters = [];
    }
}
