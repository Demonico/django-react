# -*- coding: utf-8 -*-

"""Movies views."""

from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer


class MovieListView(ListView):
    """Show all movies."""
    model = Movie
    ordering = ['released_on']


class MovieDetailView(DetailView):
    """Show the requested movie."""
    model = Movie
    pk_url_kwarg = 'id'


class MovieCreateView(CreateView):
    """Create a new movie."""
    model = Movie
    fields = '__all__'
    success_message = 'The movie created successfully'
    error_message = 'The creation has failed'

    def form_valid(self, form):
        response = super(MovieCreateView, self).form_valid(form)
        success_message = self.get_success_message(form.cleaned_data)
        if success_message:
            messages.success(self.request, success_message)
        return response

    def get_success_message(self, cleaned_data):
        return self.success_message % cleaned_data

    def form_invalid(self, form):
        response = super(MovieCreateView, self).form_invalid(form)
        error_message = self.get_error_message(form.cleaned_data)
        if error_message:
            messages.error(self.request, error_message)
        return response

    def get_error_message(self, cleaned_data):
        return self.error_message % cleaned_data


class MovieUpdateView(UpdateView):
    """Update the requested movie."""
    model = Movie
    pk_url_kwarg = 'id'
    fields = '__all__'
    success_message = 'The movie updated successfully'
    error_message = 'The update has failed'

    def form_valid(self, form):
        response = super(MovieUpdateView, self).form_valid(form)
        success_message = self.get_success_message(form.cleaned_data)
        if success_message:
            messages.success(self.request, success_message)
        return response

    def get_success_message(self, cleaned_data):
        return self.success_message % cleaned_data

    def form_invalid(self, form):
        response = super(MovieUpdateView, self).form_invalid(form)
        error_message = self.get_error_message(form.cleaned_data)
        if error_message:
            messages.error(self.request, error_message)
        return response

    def get_error_message(self, cleaned_data):
        return self.error_message % cleaned_data


class MovieDeleteView(DeleteView):
    """Delete the requested movie."""
    model = Movie
    pk_url_kwarg = 'id'
    success_url = reverse_lazy('movies:index')

    def post(self, request, *args, **kwargs):
        url = reverse_lazy('movies:index')
        try:
            Movie.objects.get(id=self.kwargs.get('id')).delete()
            messages.add_message(request, messages.SUCCESS, 'The movie deleted successfully')
            return redirect(url)
        except:
            messages.add_message(request, messages.ERROR, 'The deletion has failed.')
            return redirect(url)


class RatingCreateView(CreateView):
    model = Rating
    # fields = ['rating', 'comments']
    fields = '__all__'
    template_name = 'ratings/rating_create.html'
    pk_url_kwarg = "movie_id"


class RatingListView(ListView):
    template_name = 'ratings/rating_list.html'

    def get_queryset(self, **kwargs):
        return Rating.objects.filter(movie_id=self.kwargs.get('id'))


class MovieViewSet(ModelViewSet):
    """
    API endpoint that allows movies to be viewed or edited
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class RatingViewSet(ModelViewSet):
    """
    API endpoint that allows ratings to be viewed or edited
    """
    pass
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    # def get_queryset(self):
    #     queryset = Rating.objects.all()
    #     filtered_set = queryset.filter(movie=self.request.query_params.get(2))
    #     return filtered_set
    # def list(self, request, *args, **kwargs):
    #     queryset = Rating.objects.all()
    #     serializer = RatingSerializer(queryset, many=True)
    #     return Response(serializer.data)
    #
    #
    # def retrieve(self, request, *args, **kwargs):
    #     queryset = Rating.objects.all()
    #     rating = get_object_or_404(queryset, movie__id=request)
    #     serializer = RatingSerializer(rating)
    #     return Response(serializer.data)