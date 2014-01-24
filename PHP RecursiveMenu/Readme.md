PHP RecursiveMenu
=================

This is a very simple implementation of a recursive menu. It could, for example, be
used as part of a webshop. The data model consists of menu entries (catalogs) and
products, where each product is assigned to exactly one menu entry and each menu
entry belongs to exactly one parent entry.

Features
--------

- Shows a tree of indefinite depth
- Every node is annotated with the number of items located in the subtree
      
Usage
-----

The implementation expects two tables `products` and `catalogs`, where:

- `products` contains a column `pid` that contains values of `catalogs.id`
- `catalogs` contains a column `pid` that contains values of `catalogs.id`
- `catalogs` contains a coumn `name`

Initialize the menu with a PDO instance pointing to your database:

    $menu = new RecursiveMenu($pdo);
    
Now all you need to do is assemble the menu and render it:

    echo $menu->assemble()->render();
    
To customize the output, change `RecursiveMenuEntry::render()` and `RecursiveMenuEntry::renderRecursively()`.

Example
-------

1. Import `example.sql` into your database
2. Change the database credentials in `example.php`
3. Open `example.php` via your PHP-enabled webserver
4. The output should look like this:

    - Test 1 (4)
      - Test 1.1 (2)
      - Test 1.2 (0)
    - Test 2 (0)
      - Test 2.1 (0)
