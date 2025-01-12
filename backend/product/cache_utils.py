from django_redis import get_redis_connection

def invalidate_product_cache():
    redis_conn = get_redis_connection("default")
    pattern = "products_cache*"
    keys = list(redis_conn.scan_iter(pattern))

    if keys:
        redis_conn.delete(*keys)
        print(f"Chaves deletadas: {keys}")
    else:
        print("Nenhuma chave encontrada para exclusão.")