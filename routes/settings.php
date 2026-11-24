<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function (){
    Route::get('settings', fn () => to_route('profile.edit'));

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');
    Route::put('settings/password', [SecurityController::class, 'updatePassword'])
        ->middleware(\Illuminate\Routing\Middleware\ThrottleRequests::class . ':6,1')
        ->name('security.update-password');

    Route::inertia('settings/appearance', 'Settings/Appearance')->name('appearance');
});