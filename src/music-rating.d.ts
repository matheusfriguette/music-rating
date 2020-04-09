export interface Review {
  id: number;
  name: string;
  album: string;
  cover: string;
  genres: string[];
  rating: number;
  finalRating: string;
  songs: Song[];
}

interface Song {
  name: string;
  rating: number;
}
