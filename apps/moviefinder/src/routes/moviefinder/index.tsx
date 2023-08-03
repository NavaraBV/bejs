import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead, FormSubmitSuccessDetail } from '@builder.io/qwik-city';
import { Form, routeAction$ } from '@builder.io/qwik-city';
import { Card } from '../../components/card/card';
import { Movie } from '../../types/movies.type';
import { Loading } from '../../components/loading/loading';
import { movieDetails } from './movie-stub';

export const useMovieSearchAction = routeAction$(async ({ movieId }) => {
    const movie = movieDetails;
    // const request = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
    // const movie = await request.json();
    //
    // if (movie.Error) {
    //     return {};
    // }

    return { movie };
});

export default component$(() => {
    const movieSearchAction = useMovieSearchAction();
    const movieDetails = useSignal<Movie | undefined>();

    const onSubmitComplete = $(
        async ({ detail }: { detail: FormSubmitSuccessDetail<{ movie?: Movie }> }) => {
            movieDetails.value = detail.value.movie;
        },
    );

    return (
        <>
            <div class={'flex justify-center w-full'}>
                <Form
                    class={'bg-background-200 w-1/2'}
                    action={movieSearchAction}
                    onSubmitCompleted$={onSubmitComplete}
                >
                </Form>
            </div>
            <div class="flex justify-center p-4 h-3/4">
                {movieDetails.value ? (
                    <Card>
                        <div q:slot="header">
                            {movieDetails?.value?.Title} ({movieDetails.value.Year})
                        </div>
                        <div class={'flex flex-col gap-4 items-center'}>
                            <img
                                width="300"
                                height="444"
                                alt={'Movie poster'}
                                src={movieDetails?.value?.Poster}
                            />
                            <ul>
                                <li>
                                    <strong>{movieDetails?.value?.Director}</strong>
                                </li>
                                <li>{movieDetails?.value?.Plot}</li>
                            </ul>
                        </div>
                    </Card>
                ) : (
                    <Card>
                        <div class={'flex h-full justify-center items-center'}>
                            <Loading primary></Loading>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Movie Finder',
    meta: [
        {
            name: 'description',
            content: 'Qwik movie specs!',
        },
    ],
};
