<?php
include("RecursiveMenuEntry.class.php");

class RecursiveMenu {

    private $catalogs = array();
    private $products = array();

    private $catalogsByPID = array();
    private $productsByPID = array();

    public function __construct(PDO $db) {
        $result = $db->query("SELECT * FROM catalogs");
        while ($row = $result->fetch(PDO::FETCH_OBJ)) {
            $this->catalogs[$row->id] = $row;
            if (!isset($this->catalogsByPID[$row->pid])) {
                $this->catalogsByPID[$row->pid] = array();
            }
            array_push($this->catalogsByPID[$row->pid], $row->id);
        }
        
        $result = $db->query("SELECT * FROM products");
        while ($row = $result->fetch(PDO::FETCH_OBJ)) {
            $this->products[$row->id] = $row;
            if (!isset($this->productsByPID[$row->pid])) {
                $this->productsByPID[$row->pid] = array();
            }
            array_push($this->productsByPID[$row->pid], $row->id);
        }
    }
    
    public function assembleMenu ($rootNodeId = 0) {
        $menuEntry = new RecursiveMenuEntry($rootNodeId, "ROOT");
        $this->assembleMenuLevel($menuEntry);
        return $menuEntry;
    }
    
    private function assembleMenuLevel($parentEntry) {
    	$productCount = 0;
    	if (isset($this->productsByPID[$parentEntry->getId()])) {
    		$productCount = count($this->productsByPID[$parentEntry->getId()]);
    	}
        if (isset($this->catalogsByPID[$parentEntry->getId()]) &&
        	is_array($this->catalogsByPID[$parentEntry->getId()]) && 
        	(count($this->catalogsByPID[$parentEntry->getId()]) > 0)) {
        
            foreach ($this->catalogsByPID[$parentEntry->getId()] as $childId) {
                $childEntry = new RecursiveMenuEntry($childId, $this->catalogs[$childId]->name);
                $this->assembleMenuLevel($childEntry);
                $productCount += $childEntry->getProductCount();
                $parentEntry->addChild($childEntry);
            }
            
        }
        $parentEntry->setProductCount($productCount);
    }
}