from rest_framework import serializers
from rest_framework.views import get_view_name

from .models import Movie, Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['pk', 'rating', 'comments']


class MovieSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['pk', 'title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot', 'ratings']
