from django_redis import get_redis_connection
from django.core.cache import cache

def invalidate_product_cache():
    redis_conn = get_redis_connection("default")
    prefix = "myapp"
    detail_pattern = f"{prefix}:views.decorators.cache.cache*product-detail*"
    list_pattern = f"{prefix}:views.decorators.cache.cache*product-list*"

    keys_to_invalidate = list(redis_conn.scan_iter(detail_pattern)) + list(redis_conn.scan_iter(list_pattern))

    if keys_to_invalidate:
        redis_conn.delete(*keys_to_invalidate)
        print(f"Chaves deletadas: {keys_to_invalidate}")
    else:
        print("Nenhuma chave encontrada para exclusão.")
