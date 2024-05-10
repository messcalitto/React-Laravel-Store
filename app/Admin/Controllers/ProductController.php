<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\Product;
use \App\Models\Category;

class ProductController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Product';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Product());

        $grid->column('id', __('Id'));
        $grid->column('title', __('Title'));
        $grid->column('description', __('Description'));
        $grid->column('short_notes', __('Short notes'));
        $grid->column('price', __('Price'));
        $grid->column('discount_price', __('Discount Price'));
        $grid->column('category.name', __('Category'));
        $grid->column('image')->display(function($pictures){
            return !is_null($pictures) && count($pictures)? $pictures[0] : [];
        })->image('', 100, 100);
        
        
        // $grid->column('created_at', __('Created at'));
        // $grid->column('updated_at', __('Updated at'));

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(Product::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('title', __('Title'));
        $show->field('description', __('Description'));
        $show->field('short_notes', __('Short notes'));
        $show->field('price', __('Price'));
        
        $show->field('image', __('Images'))->image();

        $show->field('category.name', __('Category'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Product());

        $form->text('title', __('Title'))->required();
        $form->textarea('description', __('Description'));
        $form->text('short_notes', __('Short notes'));
        $form->multipleImage('image', __('Image'));
        
        $form->select('category_id', __('Category'))->options(Category::all()->pluck('name','id'))->required();

        $form->decimal('price', __('Price'))->required();
        $form->decimal('discount_price', __('Discount Price'));
        $form->number('quantity', __('Quantity'));
        return $form;
    }
}
