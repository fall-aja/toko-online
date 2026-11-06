<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

// API Endpoints for React Frontend
Route::prefix('api')->group(function () {
    Route::get('/init', [ApiController::class, 'getInitialData']);
    Route::post('/login', [ApiController::class, 'login']);
    Route::post('/logout', [ApiController::class, 'logout']);
    Route::post('/register', [ApiController::class, 'register']);
    Route::post('/switch-user', [ApiController::class, 'switchUser']);
    Route::get('/kategori', [ApiController::class, 'getCategories']);
    Route::get('/produk', [ApiController::class, 'getProducts']);
    Route::get('/cart', [ApiController::class, 'getCart']);
    Route::post('/cart/sync', [ApiController::class, 'syncCart']);
    Route::post('/checkout', [ApiController::class, 'checkout']);
    Route::get('/transaksi', [ApiController::class, 'getTransactions']);
    Route::patch('/orders/{orderId}/status', [ApiController::class, 'updateOrderStatus']);
    Route::post('/profile', [ApiController::class, 'updateProfile']);
});

// Main SPA entry point
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
