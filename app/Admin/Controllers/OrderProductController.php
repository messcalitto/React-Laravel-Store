<?php

namespace App\Admin\Controllers;

use OpenAdmin\Admin\Controllers\AdminController;
use OpenAdmin\Admin\Form;
use OpenAdmin\Admin\Grid;
use OpenAdmin\Admin\Show;
use \App\Models\OrderProduct;

class OrderProductController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'OrderProduct';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new OrderProduct());
        
        // $grid->quickSearch('title', 'status');

        $grid->quickSearch(function ($model, $query) {
            $model->join('orders', 'orders.id', '=', 'order_products.order_id')
            ->where('orders.name', 'like', '%'. $query. '%')
            ->orWhere('title', 'like', '%'. $query. '%')
            ->orWhere('status', 'like', '%'. $query. '%');
        
        });

        $grid->model()->orderBy('order_products.id', 'desc');

        $grid->column('order_id', __('Order Id'));
        
        $grid->column('image', __('Image'))->display(function($pictures){
            if (is_array($pictures)) {
                return !is_null($pictures) && count($pictures)? $pictures[0] : [];
            } else {
                return $pictures;
            }
        })->image('', 100, 100);

        $grid->column('order.name', __('Name'));

        $grid->column('title', __('Title'));
        $grid->column('quantity', __('Quantity'));
        $grid->column('price', __('Price'));

        $grid->column('Total')->display(function(){
            return $this->price * $this->quantity;
        });

        $grid->column('status', __('Status'));
        
        

        

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
        $show = new Show(OrderProduct::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('order_id', __('Order id'));
        $show->field('product_id', __('Product id'));
        $show->field('user_id', __('User id'));
        $show->field('title', __('Title'));
        $show->field('quantity', __('Quantity'));
        $show->field('price', __('Price'));
        $show->field('image', __('Image'));

        $show->field('order.name', __('Name'));
        $show->field('order.email', __('Email'));
        $show->field('order.phone', __('Phone'));

        $show->field('order.address', __('Address'));
        $show->field('order.city', __('City'));
        
        $show->field('order.transaction_id', __('Transaction id'));
        $show->field('order.paid_amount', __('Paid amount'));
        $show->field('status', __('Status'));

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
        $form = new Form(new OrderProduct());

        $form->text('order_id', __('Order id'));
        $form->text('product_id', __('Product id'));
        $form->text('user_id', __('User id'));
        $form->text('title', __('Title'));
        $form->number('quantity', __('Quantity'));
        $form->decimal('price', __('Price'));
        $form->image('image', __('Image'));

        $form->text('order.name', __('Name'));
        $form->text('order.email', __('Email'));
        $form->text('order.phone', __('Phone'));

        $form->text('order.address', __('Address'));
        $form->text('order.city', __('City'));
        
        $form->text('order.transaction_id', __('Transaction id'));
        $form->text('order.paid_amount', __('Paid amount'));
        // $form->text('order.payment_status', __('Payment status'));

        $form->select('status','Status')->options(['PAID' => 'PAID', 'SENT' => 'SENT', 'PREPARING' => 'PREPARING', 'SHIPPING' => 'SHIPPING', 'DELIVERED' => 'DELIVERED', 'RETURNED' => 'RETURNED', 'CANCELED' => 'CANCELED'])->default('PAID');

        return $form;
    }
}
