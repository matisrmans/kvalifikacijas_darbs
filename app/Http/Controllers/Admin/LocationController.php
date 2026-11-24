<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LocationRequest;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    /**
     * List every location shown on the homepage map.
     */
    public function index(): Response
    {
        return Inertia::render('admin/locations/index', [
            'locations' => Location::query()
                ->orderBy('name')
                ->get(['id', 'name', 'country', 'lat', 'lng', 'description']),
        ]);
    }

    /**
     * Show the form for creating a new location.
     */
    public function create(): Response
    {
        return Inertia::render('admin/locations/form', [
            'location' => null,
        ]);
    }

    /**
     * Store a newly created location.
     */
    public function store(LocationRequest $request): RedirectResponse
    {
        Location::query()->create($request->validated());

        return redirect()
            ->route('admin.locations.index')
            ->with('success', 'Location created.');
    }

    /**
     * Show the form for editing the given location.
     */
    public function edit(Location $location): Response
    {
        return Inertia::render('admin/locations/form', [
            'location' => $location->only([
                'id',
                'name',
                'country',
                'lat',
                'lng',
                'description',
            ]),
        ]);
    }

    /**
     * Update the given location.
     */
    public function update(LocationRequest $request, Location $location): RedirectResponse
    {
        $location->update($request->validated());

        return redirect()
            ->route('admin.locations.index')
            ->with('success', 'Location updated.');
    }

    /**
     * Delete the given location.
     */
    public function destroy(Location $location): RedirectResponse
    {
        $location->delete();

        return redirect()
            ->route('admin.locations.index')
            ->with('success', 'Location deleted.');
    }
}
