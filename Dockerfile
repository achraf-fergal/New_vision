FROM php:8.3-cli

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    && docker-php-ext-install zip \
    && pecl install mongodb-1.20.1 \
    && docker-php-ext-enable mongodb \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install --no-dev --optimize-autoloader

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=$PORT
