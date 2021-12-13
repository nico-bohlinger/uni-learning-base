export class Answer {
    private _text: string[];
    private _picture_sources: string[]
    
    constructor(text: string[], picture_sources: string[]) {
        this._text = text;
        this._picture_sources = picture_sources;
    }

    get text(): string[] {
        return this._text;
    }

    get picture_sources(): string[] {
        return this._picture_sources;
    }
}