# Quick Start

## 1. Install Job Editor Bundle

If you haven't already, [install Composer](https://getcomposer.org). Once you
have, you can install the bundle:

```bash
$ composer require arii/joe-bundle
```

## 2. Registering in the kernel

You have to define AriiJOEBundle on `AppKernel`

```php
// ...
$bundles[] = new Arii\JOEBundle\AriiJOEBundle();
// ...
```

## 3. Create databases tables

```sh
php app/console doctrine:schema:update --force
```
