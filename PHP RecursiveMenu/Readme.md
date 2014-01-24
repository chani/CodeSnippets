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

The implementation expects four arrays consisting of products, products2pid,
catalogs and catalogs2pid. Imagine the following tables:

- `products` contains a column `pid` that contains values of `catalogs.id`
- `catalogs` contains a column `pid` that contains values of `catalogs.id`
- `catalogs` contains a coumn `name`

To create thouse four arrays you might use the following code:

$result = $db->query("SELECT * FROM catalogs");
$catalogs = array();
$catalogsByPID = array();
while ($row = $result->fetch(PDO::FETCH_OBJ))
{
    $catalogs[$row->id] = $row;
    if (!isset($catalogsByPID[$row->pid]))
    {
        $catalogsByPID[$row->pid] = array();
    }
    array_push($catalogsByPID[$row->pid], $row->id);
}

$result = $db->query("SELECT * FROM products");
$products = array();
$productsByPID = array();
while ($row = $result->fetch(PDO::FETCH_OBJ))
{
    $products[$row->id] = $row;
    if (!isset($productsByPID[$row->pid]))
    {
        $productsByPID[$row->pid] = array();
    }
    array_push($productsByPID[$row->pid], $row->id);
}

Initialize the menu with those four arrays

    $menu = new RecursiveMenu($catalogs, $catalogsByPID, $products, $productsByPID);
    
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
