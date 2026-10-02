from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        try:
            from . import signals  # noqa
        except ImportError:
            try:
                import core.signals  # noqa
            except ImportError:
                pass


