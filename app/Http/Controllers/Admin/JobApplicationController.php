<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class JobApplicationController extends Controller
{
    /**
     * List every submitted job application.
     */
    public function index(): Response
    {
        $applications = JobApplication::query()
            ->latest()
            ->paginate(15)
            ->through(fn (JobApplication $application): array => [
                'id' => $application->id,
                'name' => $application->name,
                'email' => $application->email,
                'cv_original_name' => $application->cv_original_name,
                'created_at' => $application->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Show a single job application and its motivational letter.
     */
    public function show(JobApplication $application): Response
    {
        return Inertia::render('admin/applications/show', [
            'application' => [
                'id' => $application->id,
                'name' => $application->name,
                'email' => $application->email,
                'cv_original_name' => $application->cv_original_name,
                'motivation' => $application->motivation,
                'created_at' => $application->created_at?->toDateTimeString(),
                'download_url' => route('admin.applications.download', $application),
            ],
        ]);
    }

    /**
     * Download the submitted CV.
     */
    public function download(JobApplication $application): StreamedResponse
    {
        abort_unless(Storage::exists($application->cv_path), 404);

        return Storage::download(
            $application->cv_path,
            $application->cv_original_name,
        );
    }

    /**
     * Delete the application and its submitted CV.
     */
    public function destroy(JobApplication $application): RedirectResponse
    {
        Storage::delete($application->cv_path);

        $application->delete();

        return redirect()
            ->route('admin.applications.index')
            ->with('success', 'Application deleted.');
    }
}
