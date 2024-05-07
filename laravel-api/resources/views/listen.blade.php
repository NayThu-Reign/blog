@extends('layouts.app')

@section('content')
<div class="container">
    <div id="articles-container">
        @foreach ($articles as $article)
            <a href="{{ url("/articles/detail/$article->id") }}">
                <div>
                    <span class="h2">{{$article->title}}</span> is posted by {{$article->user->name}}
                </div>
            </a>
        @endforeach
    </div>
</div>
@endsection
