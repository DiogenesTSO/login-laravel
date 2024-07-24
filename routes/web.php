<?php

use App\Http\Controllers\loginController;
use App\Http\Controllers\principalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

    //Rotas para abrir as páginas
Route::get('/', [loginController::class, 'showLogin']);
Route::get('/register', [loginController::class, 'showRegistro']);
Route::get('/principal', [loginController::class, 'principal'])->middleware('auth');

Route::post('/register', [loginController::class, 'register']);
Route::post('/login', [loginController::class, 'login']);
