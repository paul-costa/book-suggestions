export class Book {
    constructor(
        public id: string,
        public isbn: number,
        public title: string,
        public imageUrl: string,
        public link: string,
        public averageRating: number,
        public description: string,
        public author: string,
    ) {}
}


export class BookDetail {
    constructor(
        public id: number,
        public title: string,
        public isbn: string,
        public imageUrl: string,
        public pubYear: number,
        public pubMonth: number,
        public pubDay: number,
        public publisher: string,
        public languageCode: string,
        public desc: string,
        public avgRating: number,
        public numPages: number,
        public url: string,
        public authors: AuthorArr[],
        public similarBooks: string[],
        public genres: string[],
    ) {}
}

export class SavedBookDetail extends BookDetail {
    expanded: boolean;
    transitionOnGoing: boolean;
}


export class AuthorArr {
    constructor(
      public id: number,
      public name: string,
      public imageUrl: string,
      public link: string,
      public avgRating: number,
    ) {}
}

export class SimilarBook {
    constructor(
        public similarBookId: number,
        public similarBookTitle: string,
        public similarBookLink: string,
        public similarBookImageUrl: string,
    ) { }
}