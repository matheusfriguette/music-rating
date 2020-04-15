import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, FormikProps } from 'formik';
import { Link, useHistory, useParams } from 'react-router-dom';

import Input from './input';
import Select from './select';
import { api, lastFmApi } from '../../services/api';
import { Review } from '../../music-rating';

const Insert: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    artist: '',
    album: '',
    releaseDate: '',
    cover: 'https://i.scdn.co/image/',
    genres: '',
    rating: {
      primary: '',
      secondary: '1',
    },
    songs: [
      {
        name: '',
        rating: '',
      },
    ],
  });

  const secondaryRatingOptions = [
    { text: 'Light', value: 1 },
    { text: 'Decent', value: 2 },
    { text: 'Strong', value: 3 },
  ];

  useEffect(() => {
    const getReview = async () => {
      const response = await api.get(`/reviews/${id}`);

      setInitialValues({
        artist: response.data.artist,
        album: response.data.album,
        releaseDate: response.data.releaseDate.split('T')[0],
        cover: response.data.cover,
        genres: response.data.genres.join(', '),
        rating: response.data.rating,
        songs: response.data.songs,
      });
    };

    if (id !== undefined) {
      getReview();
    }
  }, [id]);

  const searchAlbum = async (values: any, setValues: (obj: any) => void) => {
    const response = await lastFmApi.get(
      `/?method=album.getinfo&api_key=6200ce63716b84bc8f67cf226a87082f&artist=${values.artist}&album=${values.album}&format=json`,
    );

    const tracks = response.data.album
      ? response.data.album.tracks.track.map((track: any) => ({
          name: track.name,
          rating: '',
        }))
      : [];

    setValues({ ...values, songs: tracks });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        const review: Review = {
          artist: values.artist,
          album: values.album,
          releaseDate: new Date(values.releaseDate),
          cover: values.cover,
          genres: values.genres.split(', '),
          rating: {
            primary: parseInt(values.rating.primary),
            secondary: parseInt(values.rating.secondary),
          },
          songs: values.songs.map((song) => {
            console.log(song);
            return {
              ...song,
              rating: parseInt(song.rating),
            };
          }),
          songsAverage: parseFloat(
            (
              values.songs.reduce(
                (previous, current) => previous + parseInt(current.rating),
                0,
              ) / values.songs.length
            ).toFixed(2),
          ),
        };

        if (id !== undefined) {
          await api.put(`reviews/${id}`, review).then(() => {
            setSubmitting(false);
            history.push('/');
          });
        } else {
          await api.post('reviews', review).then(() => {
            setSubmitting(false);
            history.push('/');
          });
        }
      }}
    >
      {({ values, setValues }: FormikProps<any>) => (
        <Form className="flex-grow flex flex-col">
          <div className="flex-grow container mx-auto px-2 mt-8">
            <div className="font-medium text-2xl">Rate new album</div>
            <hr className="mt-2 border-gray-400" />
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-1/3">
                <div className="font-semibold">Basic info</div>
              </div>
              <div className="w-full lg:w-2/3 mt-2 lg:mt-0">
                <div className="bg-white shadow-md rounded p-4">
                  <div className="flex flex-wrap items-end -mx-2">
                    <div className="w-full lg:w-6/12 p-2">
                      <Input label="Artist" type="text" name="artist" />
                    </div>
                    <div className="w-full lg:w-6/12 p-2">
                      <Input label="Album" type="text" name="album" />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full lg:w-1/2 p-2">
                      <Input
                        label="Release Date"
                        type="date"
                        name="releaseDate"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 p-2">
                      <Input label="Cover" type="text" name="cover" />
                    </div>
                  </div>
                  <Input label="Genres" type="text" name="genres" />
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full lg:w-1/4 p-2">
                      <Select
                        options={secondaryRatingOptions}
                        label="Degree"
                        name="rating.secondary"
                      />
                    </div>
                    <div className="w-full lg:w-3/4 p-2">
                      <Input
                        label="Rating"
                        type="number"
                        name="rating.primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-gray-400" />
            <div className="flex flex-wrap my-4">
              <div className="w-full lg:w-1/3">
                <div className="font-semibold">Songs</div>
              </div>
              <FieldArray
                name="songs"
                render={({ remove, push }) => (
                  <div className="w-full lg:w-2/3 mt-2 lg:mt-0">
                    <div className="bg-white shadow-md rounded p-4">
                      {values.songs.map((_: any, index: number) => (
                        <div
                          key={index}
                          className="flex flex-wrap items-end -mx-2"
                        >
                          <div className="w-full lg:w-8/12 p-2">
                            <Input
                              label="Song"
                              type="text"
                              name={`songs.${index}.name`}
                            />
                          </div>
                          <div className="w-5/6 lg:w-1/4 p-2">
                            <Input
                              label="Rating"
                              type="text"
                              name={`songs.${index}.rating`}
                            />
                          </div>
                          <div className="w-1/6 lg:w-1/12 p-2">
                            <button
                              type="button"
                              className="mt-2 bg-gray-300 p-2 text-sm rounded-full hover:bg-gray-400 focus:outline-none"
                              onClick={() => remove(index)}
                            >
                              <div className="flex justify-center items-center">
                                <svg
                                  className="w-4 h-4 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M9 19a1 1 0 01-2 0V9a1 1 0 012 0v10zm4 0a1 1 0 01-2 0V9a1 1 0 012 0v10zm4 0a1 1 0 01-2 0V9a1 1 0 012 0v10zm5-17v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22zm-3 4v16H5V6H3v18h18V6h-2z" />
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="flex items-center mt-6 bg-gray-300 px-3 py-1 text-sm rounded hover:bg-gray-400 focus:outline-none"
                          onClick={() => searchAlbum(values, setValues)}
                        >
                          <span className="font-semibold">Search songs</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center mt-6 bg-gray-300 px-3 py-1 text-sm rounded hover:bg-gray-400 focus:outline-none"
                          onClick={() => push({ name: '', rating: '' })}
                        >
                          <span className="font-semibold">Song</span>
                          <svg
                            className="w-4 h-4 fill-current ml-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full bg-gray-100 border-t border-gray-400 sticky bottom-0">
            <div className="container mx-auto my-4 px-2">
              <div className="flex justify-end">
                <Link
                  to="/"
                  className="bg-gray-300 px-4 py-2 font-semibold rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="ml-4 bg-gray-800 px-4 py-2 font-semibold text-white rounded-lg hover:bg-gray-900"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Insert;
