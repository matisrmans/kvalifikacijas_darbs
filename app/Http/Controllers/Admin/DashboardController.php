<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\Location;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard with an overview of the site.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'applications' => JobApplication::query()->count(),
                'users' => User::query()->count(),
                'admins' => User::query()->where('is_admin', true)->count(),
                'locations' => Location::query()->count(),
            ],
            'recentApplications' => JobApplication::query()
                ->latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'created_at'])
                ->map(fn (JobApplication $application): array => [
                    'id' => $application->id,
                    'name' => $application->name,
                    'email' => $application->email,
                    'created_at' => $application->created_at?->toDateTimeString(),
                ]),
        ]);
    }
}
