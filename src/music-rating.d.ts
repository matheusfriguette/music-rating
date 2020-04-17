export interface Review {
  id?: number;
  album: string;
  artist: string;
  releaseDate: Date;
  formattedReleaseDate?: string;
  cover: string;
  genres: string[];
  country: string;
  rating: Rating;
  songs: Song[];
  songsAverage: number;
}

interface Rating {
  primary: number;
  secondary: number;
}

interface Song {
  name: string;
  rating: number;
}
