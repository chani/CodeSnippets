<?php
class RecursiveMenuEntry {

    private $id;
    private $name;
    private $productCount;
    private $children;
    
    public function __construct($id, $name, $productCount = 0) {
        $this->id = $id;
        $this->name = $name;
        $this->productCount = $productCount;
        $this->children = array();
    }
    
    public function setProductCount($productCount) {
        $this->productCount = $productCount;
    }
    
    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }
    
    public function getProductCount() {
        return $this->productCount;
    }
    
    public function getChildren() {
        return $this->children;
    }    
    
    public function addChild (RecursiveMenuEntry $entry) {
        array_push($this->children, $entry);
    }
    
    public function render () {
    	$output = '<ul>';
    	if (count($this->children) > 0) {
            foreach ($this->children as $child) {
                $output .= $child->renderRecursively();
            }
        }
        $output .= '</ul>';
        return $output;
    }
    
    private function renderRecursively () {
    	$output = '<li>' . $this->name . ' (' . $this->productCount . ')';
    	if (count($this->children) > 0) {
    	    $output .= '<ul>';
            foreach ($this->children as $child) {
                $output .= $child->renderRecursively();
            }
            $output .= '</ul>';
        }
        $output .= '</li>';
        return $output;   
    }

}
