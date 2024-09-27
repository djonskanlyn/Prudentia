from django.apps import AppConfig


class KeyMeasuresConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'key_measures'

    def ready(self):
        import key_measures.signals
