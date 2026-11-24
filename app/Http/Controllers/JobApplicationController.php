<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\JobApplication;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    /**
     * Show the public job application form.
     */
    public function create(): Response
    {
        return Inertia::render('careers/apply');
    }

    /**
     * Store a newly submitted job application.
     */
    public function store(StoreJobApplicationRequest $request): RedirectResponse
    {
        $file = $request->file('cv');

        $path = $file->store('cvs');

        JobApplication::create([
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
            'cv_path' => $path,
            'cv_original_name' => $file->getClientOriginalName(),
            'motivation' => $request->string('motivation')->toString(),
        ]);

        return redirect()
            ->route('careers.apply')
            ->with('success', 'Thanks! Your application has been received.');
    }
}
