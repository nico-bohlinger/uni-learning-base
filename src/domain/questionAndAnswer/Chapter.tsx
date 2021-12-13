export class Chapter {
    private _number: Number;
    private _text: string;
    
    constructor(number: Number, text: string) {
        this._number = number;
        this._text = text;
    }

    get number(): Number {
        return this._number;
    }

    get text(): string {
        return this._text;
    }
}