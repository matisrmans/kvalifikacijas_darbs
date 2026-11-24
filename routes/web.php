<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JobApplicationController as AdminJobApplicationController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MapController::class, 'index'])->name('home');

Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact', 'contact')->name('contact');

Route::get('careers/apply', [JobApplicationController::class, 'create'])->name('careers.apply');
Route::post('careers/apply', [JobApplicationController::class, 'store'])->name('careers.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::resource('locations', LocationController::class)->except(['show']);
        Route::resource('users', UserController::class)->only(['index', 'update', 'destroy']);
        Route::get('applications', [AdminJobApplicationController::class, 'index'])->name('applications.index');
        Route::get('applications/{application}', [AdminJobApplicationController::class, 'show'])->name('applications.show');
        Route::get('applications/{application}/download', [AdminJobApplicationController::class, 'download'])->name('applications.download');
        Route::delete('applications/{application}', [AdminJobApplicationController::class, 'destroy'])->name('applications.destroy');
    });

require __DIR__.'/settings.php';
