<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\OrderShipped;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderShipmentController extends Controller
{
    /**
     * Ship the given order.
     */
    public function store(Request $request): RedirectResponse
    {
        // $order = Order::findOrFail($request->order_id);

        // // Ship the order...

        foreach (['thureinnay331@gmail.com', 'bob@example.com'] as $recipient) {
            Mail::to($recipient)->queue(new OrderShipped());
        }

        // Mail::to($request->user())->send(new OrderShipped());

        return redirect('/books');
    }
}
