<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\Admin\JobApplicationController as AdminJobApplicationController;

Route::get('/', [MapController::class, 'index'])->name('dashboard');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');

Route::get('careers/apply', [JobApplicationController::class, 'create'])->name('job.create');
Route::post('careers/apply', [JobApplicationController::class, 'store'])->name('job.store');

Route::inertia('dashboard', 'dashboard')->name('dashboard')->middleware('auth');

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class)->only(['index', 'update', 'destroy']);
        Route::resource('locations', LocationController::class)->except(['show']);
        Route::get('applications', [AdminJobApplicationController::class, 'index'])->name('applications.index');
        Route::get('applications/{application}', [AdminJobApplicationController::class, 'show'])->name('applications.show');
        Route::get('applications/{application}/download', [AdminJobApplicationController::class, 'download'])->name('applications.download');
        Route::delete('applications/{application}', [AdminJobApplicationController::class, 'destroy'])->name('applications.destroy');
    });

require __DIR__ . '/settings.php';